#!/bin/bash

# make file executable
set -e

instructions ()
{
  echo "*********************************************"
  echo "Run this script as an npm task              *"
  echo "$ npm run deploy <env>                      *"
  echo "env: eg. stage, prod                        *"
  echo "for example: $ npm run deploy stage         *"
  echo "*********************************************"
}

BUCKET="glycoradar.glycomics.ku.dk"

if [ $# -eq 0 ]; then
  instructions
  exit 1
fi

DIST="dist"
TMP="tmp"

echo "remove tmp directory created previously"
rm -rf $TMP

# mv all the files needed to run the app to a `tmp` directory
echo "create a tmp directory and copy all the files there"
rsync -avz --include 'static/*.js' --include 'static/**/*.js' --exclude '*.js' --exclude '*.map'  dist tmp

# omit all .gz file extensions
echo "Omit the .gz file extension"
for x in $(find tmp -name \*.gz -path '*/js/*' -or -path '*/css/*'); do
  mv $x $(echo "$x" | sed 's/\.gz$//')
done

# clean the bucket
echo "Clean the bucket from previous vomit"
aws s3 rm s3://$BUCKET --recursive

# sync to the S3 bucket
# aws-cli is needed
echo "Copying files over to S3"
aws s3 sync ./$TMP/$DIST s3://$BUCKET --acl public-read

# set the metadata to notify s3 that we're using gzip
echo "Set 'Content-Encoding:gzip' on affected files"
aws s3 cp s3://$BUCKET/js s3://$BUCKET/js --recursive --exclude 'manifest*' --metadata-directive REPLACE --content-encoding 'gzip' --acl public-read

echo "🚀 🚀 🚀 🚀 🚀 "