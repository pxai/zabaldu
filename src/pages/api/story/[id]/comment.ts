import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import prisma from '../../../../lib/prisma';
import {validateComment} from '../schema';

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
        const content = String(req.body.content);
        const permalink = '';

        const result = await prisma.comment.create({
            data: {
                content, permalink,
                story: { connect: { id: storyId } },
                owner: { connect: { email: String(session?.user?.email) } },
            },
        })
        console.log("API: ", result)
        return res.json(result)

  }
}