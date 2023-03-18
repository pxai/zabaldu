import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const session = await getSession({ req });
    console.log("This is the real API shit")
    if (req.method === 'GET') {
        const result = await prisma.story.findMany({
            include: {
              comments: true, 
            },
          }) 

        return res.json(result)
    }
}