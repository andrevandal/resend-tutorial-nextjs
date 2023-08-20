# How do I avoid conflicts with my MX records?

Learn how to avoid conflicts with your existing MX records when setting up a Resend domain.
​

## What is an MX record?

MX (Mail Exchanger) records specify where incoming mail should be delivered on behalf of a domain. Every MX value has a unique priority (also known as preference) value. The lower the number, the higher the priority.

Resend requires that you setup an MX record on bounces.yourdomain.com to establish a return-path for bounce/complaint reports from Inbox Providers. We set this return path in the email headers of every email you send through Resend.
​

## Won’t this conflict with my existing Inbox Provider?

Let’s look at an example. Say you’re using G Suite for your email. You’ll have an MX record that looks something like this:

`resend.com     MX    1 alt3.aspmx.l.google.com.`

The records specifies that incoming mail to any address on the `@resend.com` domain should be delivered to the google servers.

Now, let’s say you want to use Resend to send emails from `@yourdomain.com`. You’ll need to add an MX record for `bounces.yourdomain.com` that looks something like this:

`bounces.resend.com    MX    10 feedback-smtp.us-east-1.amazonses.com`

Two things to note here:

- The MX record is for bounces.yourdomain.com, not yourdomain.com. MX records only impact the subdomain they are associated to, so the Resend MX record will not affect your existing records on the root domain.
- The priority value is 10. Though we suggest a priority of 10, this can be changed to lower or higher as needed to avoid conflicts.
​

## Solving common conflicts

### Conflicts with existing records

If you already have a MX record set for bounces.yourdomain.com, you will need to remove it before adding the Resend MX record.

If you need to keep the existing record, you can add a subdomain to your domain (e.g. sub.yourdomain.com) which will move the Resend MX location to bounces.sub.yourdomain.com.

### Conflicts with existing priority

Each MX should have a unique priority value. We suggest using 10 for your MX record on `bounces.yourdomain.com`, but you can use a higher number if 10 is already in use.
