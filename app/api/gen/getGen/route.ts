import { client } from "@/prisma/seed";

export async function POST(req: Request) {
    // console.log(req.());
    const { email } = await req.json();
    console.log(email);
    const gens = await client.user.findFirst({
        where: {
            email: email,
        }
    });
    return new Response(JSON.stringify(gens?.generations), { status: 200 });
}