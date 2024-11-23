import { awsS3Client } from "@/aws";
import { client } from "@/prisma/seed";
import { PutObjectCommand } from "@aws-sdk/client-s3";

export async function POST(req:Request) {
    const formData=await req.formData();
    console.log(formData);
    const file = formData.get('file');
    const name = file instanceof File ? file.name : '';
    const userEmail = formData.get('userEmail');
    console.log(userEmail, name, file)
    let data;
    if(file instanceof File) {
        data = await file.arrayBuffer();
    }
    
    const uploadData = new PutObjectCommand({
        Bucket: process.env.S3_BUCKET_NAME ?? '',
        Body: data ? Buffer.from(data) : undefined,
        ACL: 'public-read',
        ContentType: file instanceof File ? file.type : undefined,
        Key: name,
    });

    const returnResponse = await awsS3Client.send(uploadData);
    if (returnResponse) {
        await client.user.update({
            where: {
                email: userEmail as string,
            },
            data: {
                generations: {
                    push: name as string,
                }
            }
        });
    }
    return new Response(JSON.stringify({ 
        message: 'file uploaded',
        fileName: file instanceof File ? file.name : undefined,
        response: returnResponse 
    }), { status: 200 });
}