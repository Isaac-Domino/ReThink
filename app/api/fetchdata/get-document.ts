
import { NextApiRequest, NextApiResponse } from 'next';
import { getXataClient } from '../../../src/xata';
import { auth } from '@clerk/nextjs/server'



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId } = auth();
  const xata = getXataClient();

  if (!userId) {
    return res.status(400).json({ error: 'Missing userId' });
  }

  try {
    const document = await xata.db.document.filter('user_id', userId).getFirst();
    res.status(200).json(document);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch document' });
  }
}