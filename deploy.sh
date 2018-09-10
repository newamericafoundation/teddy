#!/bin/bash
if [ $1 = "data_viz_project_template" ]; then
  echo "You need to specify your project name in package.json"
  exit 1
else 
  echo "Your project directory: $1"
fi
for file in ./public/*
do
  if [[ $file = *bundle.*.js ]]; then
    rm "./public/bundle.js"
    mv $file "./public/bundle.js"
    aws s3 cp "./public/bundle.js" s3://datadotnewamerica/$1/bundle.js
  elif [[ $file = *bundle.*.js.gz ]]; then
    mkdir ./public/archive ./public/dist
    cp $file ./public/archive/
    aws s3 cp $file s3://datadotnewamerica/$1/archive/ --content-type "text/javascript" --content-encoding "gzip"
    rm "./public/dist/bundle.js.gz"
    mv $file ./public/dist/bundle.js.gz
    aws s3 cp ./public/dist/bundle.js.gz s3://datadotnewamerica/$1/dist/bundle.js.gz --content-type "text/javascript" --content-encoding "gzip"
    elif [[ $file = *index.html* ]]; then
      aws s3 cp $file s3://datadotnewamerica/$1/index.html
  fi
done