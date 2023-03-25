import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';

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

    if (req.method === 'POST') {
      console.log("API> HERE we are: ", req.body)
      // creating a new todo.
      const title = String(req.body.title);
      const content = String(req.body.content);
      const permalink = title.toLowerCase();
      const link = String(req.body.url);
      const tags = String(req.body.tags);

      const result = await prisma.story.create({
          data: {
              title, content, permalink, link, tags,
              owner: { connect: { email: String(session?.user?.email) } },
          },
      })
      console.log("API: ", result)
      return res.json(result)
  }
}