# 🌐 Deployment

The frontend app is deployed to an [AWS S3 bucket](https://aws.amazon.com/s3/) that is served using [Cloudfront](https://aws.amazon.com/cloudfront/) and [Route 53](https://aws.amazon.com/route53/).

Signed SSL certificates for the domain are provided by [AWS ACM](https://aws.amazon.com/certificate-manager/).

_To get started with deploying your app following this configuration, you can try giving the links below a read._

## Useful links:

- [Configuring a static website on Amazon S3](https://docs.aws.amazon.com/AmazonS3/latest/userguide/HostingWebsiteOnS3Setup.html)
- [Using a custom domain](https://docs.aws.amazon.com/AmazonS3/latest/userguide/website-hosting-custom-domain-walkthrough.html)
- [Speeding up with Amazon Cloudfront](https://docs.aws.amazon.com/AmazonS3/latest/userguide/website-hosting-cloudfront-walkthrough.html)
