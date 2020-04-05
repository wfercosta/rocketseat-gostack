import './bootstrap';
import 'module-alias/register';

import { server } from './app';

const port = process.env.PORT;

// eslint-disable-next-line no-console
server.listen(port, () => console.log(`\n⚡️Server started at port: ${port}`));
