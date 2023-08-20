import { Tailwind } from "@react-email/tailwind";
import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Preview,
  Text,
} from "@react-email/components";
import * as React from "react";

interface EmailProps {
  recipientName: string;
}

const TutorialEmail = ({ recipientName = "there" }: EmailProps) => (
  <Html>
    <Head />
    <Preview>
      Learn how to send emails with attachments using Resend and Next.js!
    </Preview>

    <Tailwind>
      <Body>
        <Container className="mx-auto p-6">
          <Text className="text-lg leading-6">Hi {recipientName},</Text>
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
            href="https://github.com/your-repo"
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
);

export default TutorialEmail;
