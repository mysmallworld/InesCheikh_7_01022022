//Importing the Node.js HTTP package
const http = require('http');
//Importing the app.js application
const app = require('./app');

//Function that returns a valid port, whether supplied as a number or a string
const normalizePort = val => {
    const port = parseInt(val, 10);
  
    if (isNaN(port)) {
      return val;
    }
    if (port >= 0) {
      return port;
    }
    return false;
  };
//Port setting with set method of Express
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

//Function that checks for different errors and handles them appropriately
//it's saved in the server
const errorHandler = error => {
    if (error.syscall !== 'listen') {
      throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges.');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use.');
        process.exit(1);
        break;
      default:
        throw error;
    }
  };

//Takes as argument the function that will be called on each request received by the server
const server = http.createServer(app);

server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

//Port that we want to listen to, if the port is not available => port 3000 by default
server.listen(port);