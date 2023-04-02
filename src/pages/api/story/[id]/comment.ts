import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import prisma from '../../../../lib/prisma';
import {validateComment} from '../schema';
import sanitizeHtml from 'sanitize-html';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const session = await getSession({ req });
    console.log("This is the real API shit")


    if (req.method === 'POST' && session?.user?.email) {
      console.log("API> HERE we are: ", session?.user?.email, req.body)

        try {
          const valid = await validateComment(req.body);
        } catch (error) {
          console.log("Result of validation with error: ", error )
          return res.status(500).send(error)
        }

        // creating a new todo.
        const storyId = String(req.query.id)
        const content = sanitizeHtml(String(req.body.content));
        const permalink = '';

        const result = await prisma.comment.create({
            data: {
                content, permalink,
                story: { connect: { id: storyId } },
                owner: { connect: { email: String(session?.user?.email) } },
            },
        })

        const comment =  await prisma.comment.findUnique({
          where: { id: result.id },
          include: {
            owner: true,
            commentVotes: true
          },
        });
        console.log("API: ", comment)
        return res.json(comment)

  }
}