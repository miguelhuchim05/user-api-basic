const config = require('./../config/app');
const { format, createLogger, transports } = require('winston');

const enumerateErrorFormat = format((info) => {
  if (info instanceof Error) {
    Object.assign(info, { message: info.stack });
  }
  return info;
});

const logger = createLogger({
  level: config.server.node_env === 'development' ? 'debug' : 'info',
  transports: [
    new transports.Console({
      format: format.combine(
        enumerateErrorFormat(),
        config.server.node_env === 'development' ? format.colorize() : format.uncolorize(),
        format.splat(),
        format.label({ label: config.server.node_env }),
        format.printf(({ level, label, message }) => `[${label}] ${level}: ${message}`)
      ),
      stderrLevels: ['error', 'warn'],
      handleExceptions: false,
      colorize: false,
      json: true,
    }),
  ],
  exitOnError: false,
});

module.exports = logger;
