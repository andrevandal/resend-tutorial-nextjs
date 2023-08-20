# Is it better to send emails from a subdomain or the root domain?

Discover why sending emails from a subdomain can be better than using a root domain.
We recommend sending emails from a subdomain (`notifications.acme.com`) instead of your root/apex domain (`acme.com`).

There are two main goals you should achieve with your domain setup:

- Reputation Isolation
- Sending Purpose Transparency

## Reputation Isolation

Things happen. Maybe someone decides to DDOS your signup page and you get stuck sending tens of thousands of bounced verification emails to burner addresses. Or maybe a cold outreach campaign gets out of hand and your sending gets pegged as spam.

Whatever it is, you want to be consistently hedging your reputation. One way to do this is by not using your root domain. This allows you to quarantine a compromised subdomain if needed. If your root domain ends up with a jeopardized reputation, it can be a long road to recovery.

## ​Sending Purpose Transparency

All of us want all of our emails to go right to the top of the priority folder of the inbox, but the reality is, not all of our email should. A password reset email should have higher priority than a monthly product update. Inbox providers like Outlook and Gmail are constantly trying to triage incoming mail to put only the most important stuff in that priority spot, and move the rest towards Promotional or even Spam.

By segmenting your sending purposes by subdomain, you are giving Inbox Providers clear indication of how they should place your emails, which will build trust and confidence.
