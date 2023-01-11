import log4js from 'log4js';

log4js.configure({
  appenders: {
    lConsole: { type: 'console' },
    lWarnFile: {
      type: 'file',
      filename: process.cwd() + '/src/logs/warn.log',
    },
    lErrorFile: {
      type: 'file',
      filename: process.cwd() + '/src/logs/error.log',
    },
  },
  categories: {
    default: { appenders: ['lConsole'], level: 'info' },
    dev: { appenders: ['lConsole', 'lWarnFile'], level: 'warn' },
    prod: { appenders: ['lWarnFile', 'lErrorFile'], level: 'error' },
  },
});

const selectLog =  process.env.NODE_ENV === "production" ? "prod" : "dev";

const logger = log4js.getLogger(selectLog);

export default logger;