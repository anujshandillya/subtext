import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
    if (req.method === 'POST') {
        console.log(req.body);
        res.status(200).json({ message: 'got the form data' });
    }
}