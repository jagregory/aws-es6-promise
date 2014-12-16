# AWS Promise

A small wrapper around the AWS SDK to use ES6 Promises instead of callbacks.

## Installation

```
npm install aws-promise
```

## Usage

```js
var AWSPromise = require('aws-es6-promise')

var ec2 = new AWSPromise.EC2()

ec2.describeInstances({ params })
  .then(function(data) {
    console.log(data)
  })
```
