import express from 'express';
import controller from '../controllers/companies'

const router = express.Router();

router.get('/api/companies', controller.getCompany);

export = router;