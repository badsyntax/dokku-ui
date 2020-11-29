/* eslint-disable @typescript-eslint/no-var-requires */
const http = require('http');
let options = {
  socketPath: '/var/run/docker.sock',
  path: `/containers/ced37f5c3493/stats`,
  method: 'GET',
};
let clientRequest = http.request(options, (res) => {
  res.setEncoding('utf8');
  let rawData = '';
  res.on('data', (chunk) => {
    rawData += chunk;
    console.log('data', chunk);
  });
  res.on('end', () => {
    const parsedData = JSON.parse(rawData);
    console.log(parsedData);
  });
});
clientRequest.on('error', (e) => {
  console.log(e);
});
clientRequest.end();
