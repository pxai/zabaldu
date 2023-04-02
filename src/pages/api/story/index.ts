import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';
import {validateStory} from './schema';
import sanitizeHtml from 'sanitize-html';
import moment from 'moment';
const MINUTES_TO_ALLOW_NEW_STORY = process.env.MINUTES_TO_ALLOW_NEW_STORY || 30;

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

    if (req.method === 'POST' && session?.user?.email) {
      console.log("API> HERE we are: ", session?.user?.email, req.body)
        try {
          const valid = await validateStory(req.body);
        } catch (error) {
          console.log("Result of validation with error: ", error )
          return res.status(500).send(error)
        }

        const user = await prisma.user.findUnique({
          where: { email: String(session?.user?.email) }
        });

        const latest = await prisma.story.findFirst({orderBy: [
            {
              createdAt: 'desc',
            },
          ],
          where: { ownerId: user?.id  },
        })

        if (latest && isTooRecent(latest?.createdAt)) {
          console.log("Too recent ", user, latest)
          return res.status(500).send('Too recent story, wait ' + MINUTES_TO_ALLOW_NEW_STORY)
        }

        // creating a new todo.
        const title = sanitizeHtml(String(req.body.title));
        const content = sanitizeHtml(String(req.body.content));
        const permalink = title.toLowerCase();
        const link = sanitizeHtml(String(req.body.link));
        const tags = sanitizeHtml(String(req.body.tags));

        const result = await prisma.story.create({
            data: {
                title, content, permalink, link, tags,
                owner: { connect: { email: String(session?.user?.email) } },
            },
        })

        return res.json(result)
  }
}

function isTooRecent (createdAt: Date) {
  const now = moment(new Date());
  const end = moment(createdAt); 
  const duration = moment.duration(now.diff(end));
  const minutes = duration.asMinutes();

  return minutes < MINUTES_TO_ALLOW_NEW_STORY;
}
