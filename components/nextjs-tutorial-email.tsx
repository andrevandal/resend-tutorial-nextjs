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
              data report that were sent using the methods outlined in the
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
