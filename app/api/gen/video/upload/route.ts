import { awsS3Client } from "@/aws";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import uniqid from 'uniqid'

export async function POST(req:Request) {
    const formData=await req.formData();
    const file = formData.get('file');
    // const data = (file instanceof File)?file.arrayBuffer():null;
    let data;
    if(file instanceof File) {
        data = await file.arrayBuffer();
    }
    const id = uniqid();
    const extension = file instanceof File ? file.name.split('.').slice(-1)[0] : '.mp4';
    const newFile = id + '.' + extension;
    // S3Client
    
    const uploadData = new PutObjectCommand({
        Bucket: process.env.S3_BUCKET_NAME ?? '',
        Body: data ? Buffer.from(data) : undefined,
        ACL: 'public-read',
        ContentType: file instanceof File ? file.type : undefined,
        Key: newFile
    });

    const returnResponse = await awsS3Client.send(uploadData);
    console.log(file);
    return new Response(JSON.stringify({ 
        message: 'file uploaded',
        fileName: newFile,
        response: returnResponse 
    }), { status: 200 });
}