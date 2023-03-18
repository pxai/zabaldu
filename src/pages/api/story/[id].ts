import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const id = String(req.query.id)

  if (req.method === 'GET') {
      const result =  await prisma.story.findUnique({
        where: { id },
        include: {
          comments: true
        },
      });

      return res.json(result)
  }
}