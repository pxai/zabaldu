import { User } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import prisma from '../../../../lib/prisma';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const session = await getSession({ req });
    const commentId: string = String(req.query.id)
    const value = [-1, 1].includes(req.body.value) ? parseInt(req.body.value) : 1;

    const ownerId: string = ((session?.user) as User).id

    if (req.method === 'POST' && session?.user?.email && session.user) {

        const removal = await prisma.$queryRaw`delete FROM public."CommentVote" WHERE "ownerId" = ${ownerId} and "commentId"= ${commentId}`
        const result = await prisma.commentVote.create({
           data: { commentId, ownerId, value } 
        });

        const votes = await getTotalVotes(commentId)

        return res.json({result: votes})
  }
}

async function getTotalVotes (commentId: string) {
  const result = await prisma.commentVote.aggregate({
      _sum: {
        value: true,
      },
      where: {
        commentId 
      },
  });
  return result._sum.value;
}
