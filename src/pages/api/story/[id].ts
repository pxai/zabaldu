import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const id = String(req.query.id)

  if (req.method === 'GET') {
      const result =  await prisma.story.findUnique({
        where: { id },
        include: {
          comments: {
            include: {
              owner: {
                select: { email: true }
              }
            },
          },
        },
      });
      console.log("Dake Ramón: ", result)
      return res.json(result)
  }
}