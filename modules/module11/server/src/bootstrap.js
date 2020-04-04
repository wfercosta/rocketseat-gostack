import dotvenv from 'dotenv';

dotvenv.config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});
