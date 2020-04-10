import './bootstrap';
import 'module-alias/register';

import { server } from './App';

const port = process.env.PORT;

// eslint-disable-next-line no-console
server.listen(port, () => console.log(`\n⚡️Server started at port: ${port}`));
