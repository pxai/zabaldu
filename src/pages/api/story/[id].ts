import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import sanitizeHtml from 'sanitize-html';
import {validateStory} from './schema';
import prisma from '../../../lib/prisma';
import { UserProps } from 'prisma/types';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const id = String(req.query.id)
  const session = await getSession({ req });
  const user = session?.user as UserProps;

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
          storyVotes: true
        },
      });
      console.log("Dale Ramón: ", result)
      return res.json(result)
  }


  if (req.method === 'DELETE') {
    const result = await prisma.story.update({
      where: {
        id_and_ownerId: {id, ownerId: user.id}
      },
        data: {
           status: 'ARCHIVED'
        },
    });
    console.log("Elimina story: ", result)
    return res.json(result)
}

  if (req.method === 'PUT' && session?.user?.email) {
    console.log("API> HERE we are: ", session?.user?.email, req.body)
      try {
        const valid = await validateStory(req.body);
      } catch (error) {
        console.log("Result of validation with error: ", error )
        return res.status(500).send(error)
      }

      // creating a new todo.
      const title = sanitizeHtml(String(req.body.title));
      const content = sanitizeHtml(String(req.body.content));
      const permalink = title.toLowerCase();
      const link = sanitizeHtml(String(req.body.link));
      const tags = sanitizeHtml(String(req.body.tags));

      const result = await prisma.story.update({
        where: {
          id_and_ownerId: {id, ownerId: user.id}
        },
          data: {
              title, content, permalink, link, tags,
              updatedAt: new Date().toISOString(),
          },
      });

      console.log("Updated story: ", result)
      return res.json(result)
  }
}