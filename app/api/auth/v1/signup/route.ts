import { client } from "@/prisma/seed";
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
    const { name, email, username, password } = await req.json();
    try {
        const user = await client.user.findFirst({
            where: {
                email: email,
            }
        });
        if(user) {
            throw new Error('User already exists');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const emailToken = await bcrypt.hash(email, 10);
        await client.user.create({
            data: {
                name: name,
                email: email,
                username: username,
                password: hashedPassword,
                verifyEmailToken: emailToken,
                verifyEmailTokenExpiry: new Date(Date.now() + 1000 * 60 * 60 * 24),
            }
        });
        return new Response(JSON.stringify({ message: 'User created successfully' }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ message: error }), { status: 400 });
    }
}