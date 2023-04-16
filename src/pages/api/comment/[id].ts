import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { UserProps } from 'prisma/types';
import prisma from '../../../lib/prisma';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const id = String(req.query.id)
  const session = await getSession({ req });
  const user = session?.user as UserProps;

  if (req.method === 'DELETE') {
      const result =  await prisma.comment.delete({
        where: {
          id_and_ownerId: {
            id: String(id),
            ownerId: String(user?.id),
          }
        }
      });

      return res.json(result)
  }


  if (req.method === 'PUT') {
  const content = String(req.body.content);
  const storyId = String(req.body.content);

  const comment = await prisma.comment.update({
      where: {
          id_and_ownerId: {
              id: String(id),
              ownerId: String(user?.id),
          }
      },
      data: { 
          content, 
          updatedAt: new Date().toISOString()
      },
  })
  await res.unstable_revalidate(`/eu/story/${storyId}`)
  await res.unstable_revalidate(`/en/story/${storyId}`)
  await res.unstable_revalidate(`/es/story/${storyId}`)
  return res.json(comment)
}
}