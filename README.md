# Resend: How to go from zero to sending an email with attachments in Next

> From zero to sending an email with attachments in Next

## Objective

We aim to guide you through the process of sending an email with attachments using Resend in Next.js.

## Table of Contents

- [Resend: How to go from zero to sending an email with attachments in Next](#resend-how-to-go-from-zero-to-sending-an-email-with-attachments-in-next)
  - [Objective](#objective)
  - [Table of Contents](#table-of-contents)
  - [Setting up your Resend account](#setting-up-your-resend-account)
    - [Add your domain to Resend](#add-your-domain-to-resend)
    - [Start verifying your Domain](#start-verifying-your-domain)
    - [Wait for DNS propagation](#wait-for-dns-propagation)
    - [API key](#api-key)
  - [Integrating Resend with Next.js](#integrating-resend-with-nextjs)
    - [Create your first with React Email](#create-your-first-with-react-email)
      - [About React Email](#about-react-email)
      - [Create a new email template](#create-a-new-email-template)
    - [Sending you the first email in Next with attachments](#sending-you-the-first-email-in-next-with-attachments)
      - [Creating the API endpoint](#creating-the-api-endpoint)
      - [Handling attachments](#handling-attachments)
      - [Bonus: Preventing Gmail thread grouping](#bonus-preventing-gmail-thread-grouping)
  - [Conclusion](#conclusion)

## Setting up your Resend account

For this tutorial, you will need a Resend account. If you don't have one, you can [sign up for free](https://resend.com/signup).

### Add your domain to Resend

![Resend - Add Domain Page](/images/screenshots/00-add-domain.png "Resend - Add Domain Page")

Access your [domains page](https://resend.com/domains) and click on the `Add domain` button.

![Resend - Add Domain Modal](/images/screenshots/01-add-domain-modal.png "Resend - Add Domain Modal")

Inside the modal, there are two fields: `Domain` and `Region`.

In the `Domain`, add the domain you want to send emails from. It's recommended by [Resend](https://resend.com/docs/knowledge-base/is-it-better-to-send-emails-from-a-subdomain-or-the-root-domain) to use a subdomain related to the purpose of emails (e.g. `notifications.example.com`).

In this tutorial, we will use `example.andrevandal.dev`.

About Region, you must select the closest region to your users. As Resend uses AWS infrastructure, you can choose `us-east-1` (N. Virginia), `sa-east-1` (São Paulo), `eu-west-1` (Ireland). In this tutorial, we will use `us-east-1`.

Recapping, in this step, you will add `example.andrevandal.dev` as a domain and `us-east-1` as a region.

After filling in the fields, click on `Add domain`.

![Resend - Waiting Domain Verification](/images/screenshots/02-wating-domain-verification.png "Resend - Waiting Domain Verification")

### Start verifying your Domain

After adding your domain, you will be redirected to the domain page. You will see that the domain status is `Not Started`, there's a button to `Verify DNS Recods` and a `DNS records` section with the records you need to add to your DNS provider.

As I'm using Cloudflare as my DNS Provider, Resend recognizes it and shows a shortcut to the Cloudflare dashboard next to the region.

But, if you are using another DNS provider, don't worry, it's pretty simple to add the records to your DNS provider and they all look alike.

Inside Cloudflare, I've added the MX record and two TXT records that Resend provided me.

![Add DNS Records](/images/screenshots/03-add-dns-records.png "Cloudfalre - Add DNS Records")

### Wait for DNS propagation

Once you add the records to your DNS provider, you must allow the DNS propagation waiting time. This process can last up to 72 hours, but typically requires less than 15 minutes.

If you're using Cloudflare like me, the propagation is almost instant.

The check the global propagation status, you can use [dnschecker.org](https://dnschecker.org/).

![dnschecker.org of example.andrevandal.dev](/images/screenshots/04-dns-propagation.png "dnschecker.org of example.andrevandal.dev")

Keep in mind that you need to look for the MX and TXT records that you added. For example, as in this tutorial, I'm using the `example.andrevandal.dev` domain, I will look for a `MX` record in `bounces.example.andrevandal.dev`.

But if you're facing issues with domain verification, check these Resend knowledge base posts: [What if my domain is not verifying?](https://resend.com/docs/knowledge-base/what-if-my-domain-is-not-verifying) and [How do I avoid conflicts with my MX records?](https://resend.com/docs/knowledge-base/how-do-i-avoid-conflicting-with-my-mx-records).

![Resend - Domain Verified](/images/screenshots/05-domain-verified.png "Resend - Domain Verified")

Now that your domain is verified, you can start sending emails. But first, you need to create an API key.

### API key

Access [API key](https://resend.com/api-keys) page and click on `Create API key`.

![Resend - Add API key](/images/screenshots/06-add-api-key.png "Resend - Add API key")

Inside the modal, there are three fields: `Name`, `Permission`, and `Domain`.

![Resend - Add API key Modal](/images/screenshots/07-add-api-key-modal.png "Resend - Add API key Modal")

In the `Name`, add a name for your API key. In this tutorial, we will use `Next.js Tutorial`.

In the `Permission`, for this tutorial, we will use `Full access`. This will allow you to send emails and manage your account. If you want to limit the access of this API key you can select `Sending access`. I must recommend limiting the access of your API keys to the minimum required. So, if the API key is compromised, the damage will be limited. So, in production use cases, you should use `Sending access`.

In the `Domain`, as I'm using the free account, I can only select `All domains`. But, if you have a paid account, you can select the domains that this API key will have access to and limit the damage if it's compromised.

After filling in the fields, click on `Add`.

![Resend - View API key](/images/screenshots/08-view-api-key.png "Resend - View API key")

Now, you will see your API key. You can only see this key once. Store it safely. You will need it in the next steps.

![Resend - After add API key](/images/screenshots/09-after-add-api-key.png "Resend - After add API key")

## Integrating Resend with Next.js

For this tutorial, a Next.js repository provided by Resend will be used. You can clone it [here](https://github.com/resendlabs/resend-nextjs-pages-router-example).

Inside you're project repository, create a `.env.local` file and add the variable `RESEND_API_KEY` with the value of your API key. Next.js will automatically load the variables inside `.env.local` file in the local environment. Keep in mind to add this environment variable in your production environment.

### Create your first with React Email

The repository provided by Resend already has an example of a simple welcome email in `components/email-template.tsx`.

But we will create a new email template for this tutorial.

#### About React Email

[React Email](https://react.email/) is a set of standard components to help you build amazing emails without having to deal with the mess of creating table-based layouts and maintaining archaic markup.

To design your email, you will use the [components](https://react.email/docs/introduction) provided by React Email. Check out some e-mail examples [here](https://react.email/examples).

#### Create a new email template

To have access to the React Email components, you need to install the `@react-email/components` package.

```bash
yarn add @react-email/components // or npm install @react-email/components
```

As I love Tailwind and we will use it to style our email, we need to set it up. If you don't know how to do it, check out the [Tailwind documentation](https://tailwindcss.com/docs/guides/nextjs).

So, let's create your first email template. Create the file `components/nextjs-tutorial-email.tsx`.

Inside my templates, I like to keep the email subject close to the email template to allow the use of the template props to customize the subject. So the structure of the component will be:

```tsx
export default (props) => ({
  subject: ``,
  react: ()
});
```

As we're using typescript, we need to add the types for the props. In this case, we just need the `firstName` prop. So add the following code to the top of the file:

```tsx
interface EmailProps {
  firstName: string;
}
```

Now, we can start building our email. Let's start with the `subject`. As we will use the `firstName` prop, we will add it to the subject.

```tsx
export default ({ firstName = "there" }: EmailProps) => ({
  subject: `Hi ${firstName} - Learn how to send emails with attachments using Resend and Next.js!`,
  react: ()
});
```

For this template, I've chosen some React Email components, but you can use any component you want. Check out the [React Email documentation](https://react.email/docs/introduction) to see all the components available.

Import the components you will use:

```tsx
import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Preview,
  Text,
  Tailwind,
  Font,
} from "@react-email/components";
```

Now, let's add the `react` function. This function will return the React Email components that will be used to build the email.

We start first with the `<Html></Html>`, inside it we will add the `<Head></Head>` and `<Body></Body>` components.

```tsx
<Html>
  <Head></Head>
  <Body></Body>
</Html>
```

It's like normal HTML, isn't it?

Inside the `<Head></Head>` component, we will add the `<Font></Font>` component. This component will allow us to use the `Roboto` font in our email. To use it, we need to add the `Roboto` font to our project using it as a web font.

```tsx
<Font
  fontFamily="Roboto"
  fallbackFontFamily="Verdana"
  webFont={{
    url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
    format: "woff2",
  }}
  fontWeight={400}
  fontStyle="normal"
/>
```

Now, we can add the `<title></title>` component to the `<Head></Head>` component.

```tsx
<title>
  Learn how to send emails with attachments using Resend and Next.js!
</title>
```

As the email is an HTML, it's nice to have the title. Also, we can add the `<Preview></Preview>` component to the `<Html></Html>` component. This component will allow us to add a preview text to the email.

```tsx
<Preview>
  Learn how to send emails with attachments using Resend and Next.js!
</Preview>
```

By now, you will have something like:

```tsx
<Html>
  <Head>
    <Font
      fontFamily="Roboto"
      fallbackFontFamily="Verdana"
      webFont={{
        url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
        format: "woff2",
      }}
      fontWeight={400}
      fontStyle="normal"
    />
    <title>
      Learn how to send emails with attachments using Resend and Next.js!
    </title>
  </Head>
  <Preview>
    Learn how to send emails with attachments using Resend and Next.js!
  </Preview>
  <Body></Body>
</Html>
```

Now, we can add the `<Tailwind></Tailwind>` component wrapping the `<Body></Body>` component. This component will allow us to use Tailwind classes to style our email.

```tsx
<Tailwind>
  <Body></Body>
</Tailwind>
```

Cool, isn't it?

Now, we can start adding the components to the `<Body></Body>` component.

Let's start with the `<Container></Container>` component. This component will allow us to add a container to our email. It's recommended to use it to wrap all the content of the email.

```tsx
<Tailwind>
  <Body>
    <Container className="mx-auto p-6"></Container>
  </Body>
</Tailwind>
```

Inside the `<Container></Container>` component, we will add the `<Text></Text>` component. This component will allow us to add text to our email. The first text will be the greeting. As we will use the `firstName` prop, we will add it to the greeting.

```tsx
<Text className="text-lg leading-6">Hi {firstName},</Text>
```

After the greeting, we will add some more text.

```tsx
<Text className="text-lg leading-6 mt-4">
  We've created a comprehensive tutorial on how to send emails with
  attachments using Resend and Next.js. This tutorial covers
  everything from setting up a Next.js project to sending an email
  with attachments like PDF invoices and CSV data reports.
</Text>
<Text className="text-lg leading-6 mt-4">
  Attached to this email, you'll find a sample PDF invoice and CSV
  data reports that were sent using the methods outlined in the
  tutorial.
</Text>
```

Now, we can add the `<Button></Button>` component. This component will allow us to add a button to our email. In this case, we will add a button to link to the tutorial repository.

```tsx
<Button
  href="https://github.com/andrevandal/resend-tutorial-nextjs"
  className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-md"
>
  Check out the Tutorial Repository
</Button>
```

It's awesome to have Tailwind classes to style our email, isn't it?

After the button, we will add the final text.

```tsx
<Text className="text-lg leading-6 mt-6">
  Best,
  <br />
  André Vandal
</Text>
```

And the template it's done! You will have something like:

![Email Template Component](/images/screenshots/10-email-template-component.png "Email Template Component")

```tsx
import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Preview,
  Text,
  Tailwind,
  Font,
} from "@react-email/components";

interface EmailProps {
  firstName: string;
}

export default ({ firstName = "there" }: EmailProps) => ({
  subject: `Hi ${firstName} - Learn how to send emails with attachments using Resend and Next.js!`,
  react: (
    <Html>
      <Head>
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          webFont={{
            url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
        <title>
          Learn how to send emails with attachments using Resend and Next.js!
        </title>
      </Head>
      <Preview>
        Learn how to send emails with attachments using Resend and Next.js!
      </Preview>
      <Tailwind>
        <Body>
          <Container className="mx-auto p-6">
            <Text className="text-lg leading-6">Hi {firstName},</Text>
            <Text className="text-lg leading-6 mt-4">
              We've created a comprehensive tutorial on how to send emails with
              attachments using Resend and Next.js. This tutorial covers
              everything from setting up a Next.js project to sending an email
              with attachments like PDF invoices and CSV data reports.
            </Text>
            <Text className="text-lg leading-6 mt-4">
              Attached to this email, you'll find a sample PDF invoice and CSV
              data reports that were sent using the methods outlined in the
              tutorial.
            </Text>
            <Button
              href="https://github.com/andrevandal/resend-tutorial-nextjs"
              className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-md"
            >
              Check out the Tutorial Repository
            </Button>
            <Text className="text-lg leading-6 mt-6">
              Best,
              <br />
              André Vandal
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
});
```

### Sending you the first email in Next with attachments

Now that we have our email template, we can start sending emails.

To send emails, we will use the `resend` package. So, let's install it.

```bash
yarn add resend // or npm install resend
```

Also, keep in mind that the attachments are limited to **40mb** per email.

#### Creating the API endpoint

Let's create an API endpoint to send the email. Create the file `pages/api/send.ts`.

This endpoint should be able to:

- Receive `firstName` from the request body to populate the email template
- Load the attachments
- Send the email
- Return the email ID

In the `pages/api/send.ts` file, add the following code:

```tsx
import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';
import TutorialEmail from '../../components/nextjs-tutorial-email';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method !== 'POST') {
      return res.status(400).json({ error: 'Method not allowed' });
    }

    const { name: firstName } = req.body as { name: string };

    const template = TutorialEmail({ firstName });

    const data = {
      from: 'André Vandal <andre@example.andrevandal.dev>',
      to: ['delivered@resend.dev'],
      subject: template.subject,
      react: template.react
    };
    
    const email = await resend.emails.send(data);

    res.status(200).json(email);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
```

As you can see, we're using the `RESEND_API_KEY` environment variable to create the `resend` instance.
We're also importing the `TutorialEmail` component to be used in this email.

In the default export, we're creating an async function that will receive the `req` and `res` as parameters.

First, we use the `fail-first` approach to check if the request method is `POST`. If not, we return a `400` status code with an error message.

After, we get the `firstName` from the request body and use it to populate the email template.

Then, we create the `data` object that will be used to send the email. In this case, we're using the `from`, `to`, `subject`, and `react` fields. The `from` field is the email address that will be used to send the email. The `to` field is the email address that will receive the email. The `subject` field is the subject of the email. And the `react` field is the [React Email](https://react.email/) template.

After that, we use the `resend` instance to send the email. The `resend.emails.send` method will return the email ID. That will be used to find the email in the **Resend dashboard**.

Finally, we return the email ID with a `200` status code. And it's done!

If you're using VS Code, you can send the request by clicking on the `Send Request` button.

After that, check the **Resend dashboard**. You will see the email there.

!["Successful email in Resend"](/images/screenshots/11-successful-email-in-resend.png "Successful email in Resend")

#### Handling attachments

You can receive the file as an URL through the request body, download the file and use it as an attachment. Or you can receive the file as a base64 string through the request body, decode it and use it as an attachment. In this tutorial, we will use a local file as an attachment.

In this project repository, there's an `attachments` folder with two files: `invoice.pdf` and `report.csv`. We will use them as attachments.

To load these files, we can import `readFile` from `fs/promises`. Like:

```tsx
import { readFile } from 'node:fs/promises'
```

Also, I defined an `ATTACHMENTS_LIST` constant with the attachments paths

```tsx
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
```

Now, we can add the attachments to the `data` object.

```tsx
  const attachments = await createAttachments(ATTACHMENTS_LIST);
  const template = TutorialEmail({ firstName });

  const data = {
    from: 'André Vandal <andre@example.andrevandal.dev>',
    to: ['delivered@resend.dev'],
    subject: template.subject,
    react: template.react,
    attachments: attachments
  };
```

As you can see, we're using the `createAttachments` function to create the attachments based on the `ATTACHMENTS_LIST` constant. Let's create it.

In this function, we're using the `getAttachmentContent` function to read the file content from the file path.
Then, we're using the `loadAttachments` function to load all the attachments to memory (so take care).
After that, we're using the `Promise.allSettled` to wait for all the attachments to be loaded.
Then, we're checking if all the attachments were loaded. If not, we throw an error. If yes, we return the attachments.
As we're using TypeScript, we need to use some **type guards** to check if the promises were fulfilled or rejected.

```tsx
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
```

So, now we have the attachments in the `data` object. Our code will look like this:

```tsx
import { readFile } from 'node:fs/promises'
import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';
import TutorialEmail from '../../components/nextjs-tutorial-email';
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
    const template = TutorialEmail({ firstName });

    const data = {
      from: 'André Vandal <andre@example.andrevandal.dev>',
      to: ['deregudegu@gmail.com'],
      subject: template.subject,
      react: template.react,
      attachments: attachments
    };
    
    const email = await resend.emails.send(data);

    res.status(200).json(email);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
```

!["Successful email in Gmail"](/images/screenshots/11-successful-email-in-gmail.png "Successful email in Gmail")

And it's done! You've sent your first email with attachments using Resend and Next.js!

#### Bonus: Preventing Gmail thread grouping

To avoid Gmail grouping multiple emails with the same subject into a single thread, add a unique ID to the subject.

In this case, we will use the `nanoid` package to generate the unique ID.

```bash
yarn add nanoid // or npm install nanoid
```

Then, we can import the `customAlphabet` of `nanoid` it in the `pages/api/send.ts` file.

```tsx
import { customAlphabet } from 'nanoid'
```

As we'll need to send this information to Resend through headers, I've created a `createHeaders` function to generate the headers inside the `pages/api/send.ts` file too.

```tsx
const createHeaders = () => {
  const generateUuid = customAlphabet(
    '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz',
    12,
  )
  return {
    'X-Entity-Ref-ID': generateUuid(),
  }
};
```

To generate the unique ID, we're using the `customAlphabet` function of `nanoid`. We're using a custom alphabet and a length of 12 characters. Why NanoId? Check out this [article](https://planetscale.com/blog/why-we-chose-nanoids-for-planetscales-api).

After that, we can add the headers to the `data` object.

```tsx
const headers = createHeaders();
const attachments = await createAttachments(ATTACHMENTS_LIST);
const template = TutorialEmail({ firstName });

const data = {
  from: 'André Vandal <andre@example.andrevandal.dev>',
  to: ['deregudegu@gmail.com'],
  subject: template.subject,
  react: template.react,
  attachments: attachments,
  headers: headers,
};
```

And it's done! Now, you can send multiple emails with the same subject and they will not be grouped in the same thread.

## Conclusion

Through this tutorial, you've understood how to craft an email template with React Email, send emails with attachments using Resend, and bypass Gmail thread grouping.

If you have any questions, feel free to reach out to me on [Twitter](https://twitter.com/andrevandal) or [LinkedIn](https://www.linkedin.com/in/andrevandal/).

If you want to learn more about Resend, check out the [documentation](https://resend.com/docs) and [knowledge base](https://resend.com/docs/knowledge-base).

Looking forward to guiding you in the next tutorial!
