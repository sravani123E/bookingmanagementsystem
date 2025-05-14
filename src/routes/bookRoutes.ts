import { Router } from 'express';
import multer from 'multer';
import * as bookController from '../controllers/bookController';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get('/', bookController.getAllBooks);
router.get('/:id', bookController.getBookById);
router.post('/', bookController.createBook);
router.put('/:id', bookController.updateBook);
router.delete('/:id', bookController.deleteBook);
router.post('/import', upload.single('file'), bookController.importBooks);

export default router;