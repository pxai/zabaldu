import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import prisma from '../../../../lib/prisma';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const session = await getSession({ req });
    console.log("This is the real API shit")

    if (req.method === 'POST' && session?.user?.email && session.user) {
      console.log("API> HERE we are: ", session?.user?.email, req.body)

        const alreadyVoted = await prisma.storyVote.findMany({
          where: { owner: session.user },
        });

        console.log("Already votes? ", alreadyVoted.length, alreadyVoted)
  
        if (alreadyVoted.length > 0) {
          return res.status(500).send('You already voted!')
        }

        // creating a new todo.
        const storyId = String(req.query.id)

        const result = await prisma.storyVote.create({
            data: {
                story: { connect: { id: storyId } },
                owner: { connect: { email: String(session?.user?.email) } },
            },
        })

        return res.json(result)
  }
}