import { awsS3Client, tClient } from "@/aws";
import {GetObjectCommand} from "@aws-sdk/client-s3";
import {GetTranscriptionJobCommand, StartTranscriptionJobCommand} from "@aws-sdk/client-transcribe";

export async function GET(req: Request) {
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.searchParams);
    const filename = searchParams.get('filename');
    if (filename === null) {
        return Response.json({ error: 'Filename is required' }, { status: 400 });
    }

    const transcriptionCommand = new StartTranscriptionJobCommand({
        TranscriptionJobName: filename ?? '',
        OutputBucketName: process.env.S3_BUCKET_NAME ?? '',
        OutputKey: filename + '.transcription',
        IdentifyLanguage: true,
        Media: {
            MediaFileUri: 's3://' + process.env.S3_BUCKET_NAME + '/' + filename,
        },
    });

    const result = await tClient.send(transcriptionCommand);
  
    return Response.json(result);
  }