import { Router } from 'express';
import multer from 'multer';

import { fileUpload } from '@configurations/application';
import { FileController } from '@controllers';

const routes = new Router();
const upload = multer(fileUpload);

routes.post('/', upload.single('file'), FileController.store);

export default routes;
