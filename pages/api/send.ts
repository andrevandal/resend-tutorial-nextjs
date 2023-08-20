import { readFile } from 'node:fs/promises'
import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';
import TutorialEmail from '../../components/nextjs-tutorial-email';
import { customAlphabet } from 'nanoid'
const resend = new Resend(process.env.RESEND_API_KEY);

const ATTACHMENTS_LIST = [
  {
    filename: 'invoice.pdf',
    filepath: '../../attachments/invoice.pdf',
  },
  {
    filename: 'users.csv',
    filepath: '../../attachments/users.csv',
  }
];

const createHeaders = () => {
  const generateUuid = customAlphabet(
    '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz',
    12,
  )
  return {
    'X-Entity-Ref-ID': generateUuid(),
  }
};

const createAttachments = async (attachmentsList: { filename: string, filepath: string }[]) => {
  async function getAttachmentContent(path: string) {
    const fileUrl = new URL(path, import.meta.url);
    return readFile(fileUrl);
  }
  
  async function loadAttachments(attachments: { filename: string, filepath: string }[]) {
    return Promise.allSettled(attachments.map(a => getAttachmentContent(a.filepath)));
  }
  
  const isFulfilled = <T,>(p: PromiseSettledResult<T>): p is PromiseFulfilledResult<T> => p.status === 'fulfilled';
  const isRejected = <T,>(p: PromiseSettledResult<T>): p is PromiseRejectedResult => p.status === 'rejected';

  const attachmentsLoadResult = await loadAttachments(attachmentsList);

  if (attachmentsLoadResult.some(isRejected)) {
    const attachmentErrors = attachmentsLoadResult
      .filter(isRejected)
      .map(p => p.reason)
      .join(', ');
    throw new Error(`Error loading attachments: ${attachmentErrors}`);
  }

  return attachmentsList.map((el, index) => ({
    filename: el.filename,
    content: attachmentsLoadResult.filter(isFulfilled)[index].value,
  }));
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method !== 'POST') {
      return res.status(400).json({ error: 'Method not allowed' });
    }

    const { name: firstName } = req.body as { name: string };

    const attachments = await createAttachments(ATTACHMENTS_LIST);
    const headers = createHeaders();
    const template = TutorialEmail({ firstName });

    const data = {
      from: 'André Vandal <andre@example.andrevandal.dev>',
      to: ['delivered@resend.dev'],
      subject: template.subject,
      react: template.react,
      attachments: attachments,
      headers: headers,
    };
    
    const email = await resend.emails.send(data);

    res.status(200).json(email);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};