import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import prisma from '../../../../lib/prisma';

const VOTE_LIMIT_TO_PUBLISH_STORY = process.env.VOTE_LIMIT_TO_PUBLISH_STORY || 2;

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const session = await getSession({ req });
    const storyId = String(req.query.id)
    console.log("This is the real API shit")

    if (req.method === 'POST' && session?.user?.email && session.user) {
      console.log("API> HERE we are: ", session?.user?.email, req.body)

        const alreadyVoted = await prisma.storyVote.findMany({
          where: { owner: session.user, storyId },
        });

        console.log("Already votes? ", alreadyVoted.length, alreadyVoted)
  
        if (alreadyVoted.length > 0) {
          return res.status(500).send('You already voted!')
        }

        const result = await prisma.storyVote.create({
            data: {
                story: { connect: { id: storyId } },
                owner: { connect: { email: String(session?.user?.email) } },
            },
        })

        await checkTotalVotes (storyId, res);
        await res.revalidate(`/queued`);
        return res.json(result)
  }
}

async function checkTotalVotes (storyId: string, res: NextApiResponse) {
        const result = await prisma.storyVote.aggregate({
            _count: {
              storyId: true,
            },
            where: {
                storyId: storyId 
            },
        });
        console.log("Enought votes: ", result._count.storyId)
        if (result._count.storyId > VOTE_LIMIT_TO_PUBLISH_STORY) {
          const story = await prisma.story.update({
            where: { id: storyId },
            data: { status: 'PUBLISHED' },
          });
          console.log("Update story to PUBLISHED!!", story);
          await res.revalidate(`/`);
        }
}