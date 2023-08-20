# How do I add an unsubscribe link to my emails?

Learn how to give email recipients the ability to unsubscribe without searching for the unsubscribe link.
Resend currently doesn’t manage contact list. If you manage your own list, you can add a List-Unsubscribe: `https://example.com/unsubscribe` header when sending emails using the Resend API.

```js
import { Resend } from 'resend';

const resend = new Resend('re_123456789');

await resend.emails.send({
  from: 'Acme <onboarding@resend.dev>',
  to: ['delivered@resend.dev'],
  subject: 'hello world',
  text: 'it works!',
  headers: {
    'List-Unsubscribe': '<https://example.com/unsubscribe>',
  },
});
```
