import { client } from "@/prisma/seed";

export async function POST(req: Request) {
    const { email } = await req.json();
    const gens = await client.user.findFirst({
        where: {
            email: email,
        }
    });
    return new Response(JSON.stringify(gens?.generations), { status: 200 });
}