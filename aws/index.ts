import { S3Client } from "@aws-sdk/client-s3";
import { TranscribeClient } from "@aws-sdk/client-transcribe";

export const awsS3Client = new S3Client({
    region: 'us-east-1',
    credentials: {
        accessKeyId: process.env.AWS_S3_ACCESS_KEY ?? '',
        secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY ?? '',
    }
});

export const tClient = new TranscribeClient({
    region: 'us-east-1',
    credentials: {
        accessKeyId: process.env.AWS_S3_ACCESS_KEY ?? '',
        secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY ?? '',
    }
});