import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT;
const server = express();

server.get('/', (req, res) => {
  return res.send('OK');
});

// eslint-disable-next-line no-console
server.listen(port, () => console.log(`\n⚡️Server started at port: ${port}`));
