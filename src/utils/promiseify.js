function promiseify (method) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      method.call(
        this,
        ...args,
        (err, result) => {
          if (err) return reject(err)
          return resolve(result)
        }
      )
    })
  }
}

module.exports = promiseify;

