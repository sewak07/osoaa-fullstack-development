import express from 'express';
import { getPublicSettings, updateBusinessSettings } from '../controllers/settings.controller.js';
import { protect, adminOnly } from '../middleware/auth.middleware.js';
import { upload } from '../middleware/upload.middleware.js';

const router = express.Router();

router.get('/public', getPublicSettings);
router.put('/', protect, adminOnly, upload.single('logo'), updateBusinessSettings);

export default router;
