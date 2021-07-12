"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = __importDefault(require("express"));
var companies_1 = __importDefault(require("../controllers/companies"));
var router = express_1.default.Router();
router.get('/api/companies', companies_1.default.getCompany);
module.exports = router;
