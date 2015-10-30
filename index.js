'use strict';

var AWS = require('aws-sdk'),
  Promise = require('es6-promise').Promise

function isService(k) {
  return AWS[k].__super__ === AWS.Service
}

function publicFunctionNamesOf(obj) {
  var proto = Object.getPrototypeOf(obj)
  return Object.keys(proto)
    .filter(function(fnname) {
      return typeof proto[fnname] === 'function'
    })
}

function cb(resolve, reject) {
  return function(err, data) {
    if (err) {
      reject(err)
    } else {
      resolve(data)
    }
  }
}

module.exports = Object.keys(AWS)
  .filter(isService)
  .reduce(function(services, k) {
    services[k] = function(svcParams) {
      var instance = new AWS[k](svcParams)

      return publicFunctionNamesOf(instance).reduce(function(obj, fnname) {
        obj[fnname] = function(params) {
          return new Promise(function(resolve, reject) {
            instance[fnname](params, cb(resolve, reject))
          })
        }
        return obj
      }, {})
    }
    services.config = AWS.config
    return services
  }, {})
