import { awsS3Client, tClient } from "@/aws";
import {GetObjectCommand} from "@aws-sdk/client-s3";
import {GetTranscriptionJobCommand, StartTranscriptionJobCommand} from "@aws-sdk/client-transcribe";

const CreateJob = (filename: string) => {
    return new StartTranscriptionJobCommand({
        TranscriptionJobName: filename ?? '',
        OutputBucketName: process.env.S3_BUCKET_NAME ?? '',
        OutputKey: filename + '.transcription',
        IdentifyLanguage: true,
        Media: {
            MediaFileUri: 's3://' + process.env.S3_BUCKET_NAME + '/' + filename,
        },
    });
}

const GetJobStatus = async (ctx: GetTranscriptionJobCommand) => {
    return await tClient.send(ctx);
}

const GetJob = async (filename: string) => {
    let tJob=null;
    try {
        const jobStatusCommand = new GetTranscriptionJobCommand({
            TranscriptionJobName: filename
        });
        tJob = await GetJobStatus(jobStatusCommand);
    } catch (error) {}
    return tJob
}

const GetTextTimeStamps = async (body: any) => {
    const chunks: any[] = [];
    return new Promise((resolve, reject) => {
        body.on('data', (chunk: any) => chunks.push(Buffer.from(chunk)));
        body.on('end', () => resolve(Buffer.concat(chunks).toString('utf-8')));
        body.on('error', reject);
    });
}

const GetTranscriptionFile = async (filename: string) => {
    const tFileName = filename + '.transcription';
    const getObjectCommand = new GetObjectCommand({
        Bucket: process.env.S3_BUCKET_NAME ?? '',
        Key: tFileName
    });
    let tFile=null;
    try {
        tFile= await awsS3Client.send(getObjectCommand);
    } catch (error) {}
    if(tFile) {
        const subtitleBody = tFile?.Body;
        const result = await GetTextTimeStamps(subtitleBody);
        return JSON.parse(
            result as string
        )
    }
}

export async function GET(req: Request) {
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.searchParams);
    const filename = searchParams.get('filename');
    if (filename === null) {
        return Response.json({ error: 'Filename is required' }, { status: 400 });
    }

    // get transcription
    const transcription=await GetTranscriptionFile(filename);
    console.log(transcription);
    if(transcription) {
        return Response.json({
            status: 'FETCHED',
            transcription,
        })
    }

    // check for job existence
    const existingJob = await GetJob(filename);
    if(existingJob) {
        return Response.json({
            jobName: existingJob.TranscriptionJob?.TranscriptionJobName,
            status: existingJob.TranscriptionJob?.TranscriptionJobStatus
        })
    }

    // create a new Transcription job
    const transcriptionCommand = CreateJob(filename);

    const result = await tClient.send(transcriptionCommand);
  
    return Response.json(result);
  }