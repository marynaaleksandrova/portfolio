static-app-template
===================

Template for static webapp/website. Include grunt tasks for jade, js, stylus and deploy to S3.

For deployment to S3 create grunt-aws.json file:
```
{
  "key": "your-s3-key",
  "secret": "your-s3-secret",
  "bucket": "bucket-name"
}
```
Check this [link](https://transloadit.com/docs/how-to-set-up-an-amazon-s3-bucket) on how to find your security credentials.
