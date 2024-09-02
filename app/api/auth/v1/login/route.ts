import { client } from "@/prisma/seed";
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
    const { email, password } = await req.json();
    try {
        const user = await client.user.findFirst({
            where: {
                email: email,
            }
        });
        if(!user) {
            throw new Error('User not found');
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if(!passwordMatch) {
            throw new Error('Invalid password');
        }
        return new Response(JSON.stringify({ message: 'User logged in successfully' }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ message: error }), { status: 400 });
    }
}