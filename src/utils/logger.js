const logger = console.log

module.exports = {
  formatLogger (namespace, val) {
    logger(`--------------- ${namespace} ---------------`)
    logger(val)
  },
  logger
}