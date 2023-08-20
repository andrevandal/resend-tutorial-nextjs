# What if my domain is not verifying?

Learn what steps to take when your domain doesn't seem to verifying.
Verifying a domain involves a few steps:

1. Add your domain to Resend
1. Start verifying your Domain
1. Add the records to your DNS provider
1. Wait for DNS propagation
1. When this process is completed correctly, your domain will probably verify within 15 minutes of you adding the DNS records.

So what if your domain isn’t verifying?

If your are having any conflict issues with the MX records, checkout this guide.

## Confirm your DNS records are correct

Usually when a domain doesn’t verify, it is because the DNS records were not added correctly.

When you add a record to your DNS provider, it will propagate it to a public registry. This allows our system to confirm the correct records are present to prove you own the domain. This also means you can ping your registry to see what we are seeing.

You’ll notice that you needed to add records for subdomains (bounces.yourdomain.com and resend._domainkey.yourdomain.com). We can then ping those domains to check for which records are present.

### Check your records in the browser

Tools like `easydmarc.com` allow you to check your DNS records in the browser.

Check `bounces.yourdomain.com`
Check `resend._domainkey.yourdomain.com`

Go to these URL’s and replace `yourdomain.com` with the domain you added in Resend.

You are looking to see the same values that you see in Resend.

### Check your records in the terminal

Checking your DNS records in the terminal is just as easy. You can use the `nslookup` command and a record type flag to get the same information.

Replace `yourdomain.com` with whatever you added as the domain in Resend:

Check your DKIM TXT record:

`nslookup -type=TXT resend._domainkey.yourdomain.com`

Check your SPF TXT record:

`nslookup -type=TXT bounces.yourdomain.com`

Check your SPF MX record:

`nslookup -type=MX bounces.yourdomain.com`

You are looking to see the same values that you see in Resend.

### ​Confirm it hasn’t been 72 hours

If 72 hours have passed and the domain isn’t verified, the verification will fail and you will receive an email from Resend.

To restart the verification, delete your domain and recreate it.

All record values will be the same except for `resend._domainkey.yourdomain.com`. This value will change each time you create a new domain.
