export async function POST(req:Request) {
    const formData=await req.formData();
    const file = formData.get('file');
    const data = (file instanceof File)?file.arrayBuffer():null;
    // S3Client
    console.log(file);
    return new Response(JSON.stringify({ message: 'file uploaded' }), { status: 200 });
}