import http from 'http';
import httpStatus from 'http-status-codes';
const port = 3000;
const app = http.createServer( ( request, response ) => {
 console.log( 'Received an incoming request!' );
 response.writeHead( httpStatus.OK, {
 'Content-Type': 'text/html'
 } );
 let responseMessage = '<h1>Hello Node, TypeScript speaking! test2</h1>';
 response.write( responseMessage );
 response.end();
 console.log( `Sent a response : ${responseMessage}` );
 } );
app.listen( port );
console.log( `The server has started and is listening on port number: ${port}` );
