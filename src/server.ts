/* eslint-disable no-console */
import { Server } from 'http';
import app from './app';
import config from './config';

// handle uncaught exception error if any developer take mistake, work it synchronous
process.on('uncaughtException', error => {
  console.log(error);
  process.exit(1);
});

// assign server into server variable
let server: Server;

const startServer = async () => {
  try {
    // server listening
    server = app.listen(config.port, () => {
      console.log(
        `Blog is Running on ${config.port}`
      );
    });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }

  // though which we can handle async and synchronous api error
  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        console.log(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
};

startServer();

process.on('SIGTERM', () => {
  console.log('Signal termination is received');
  if (server) {
    server.close();
  }
});
