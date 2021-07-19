"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var company_1 = __importDefault(require("../models/company"));
var defaults_1 = __importDefault(require("../config/defaults"));
var logger_1 = __importDefault(require("../logger"));
var brasilio_1 = __importDefault(require("../services/brasilio"));
var createCompany = function (comp) { return __awaiter(void 0, void 0, void 0, function () {
    var company, code;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                company = new company_1.default({
                    _id: new mongoose_1.default.Types.ObjectId(),
                    cnpj: comp.cnpj,
                    razao_social: comp.razao_social,
                    uf: comp.uf,
                    qsa: comp.qsa
                });
                return [4 /*yield*/, company.save()
                        .then(function () {
                        return 200;
                    })
                        .catch(function (error) {
                        logger_1.default.info(error);
                        return 500;
                    })];
            case 1:
                code = _a.sent();
                return [2 /*return*/, code];
        }
    });
}); };
var updateCompany = function (comp, cnpj) { return __awaiter(void 0, void 0, void 0, function () {
    var code;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, company_1.default.findOneAndUpdate({ cnpj: cnpj }, comp, { new: true })
                    .then(function () {
                    return 200;
                })
                    .catch(function (error) {
                    logger_1.default.info(error);
                    return 500;
                })];
            case 1:
                code = _a.sent();
                return [2 /*return*/, code];
        }
    });
}); };
var formatData = function (comp, part) {
    part.forEach(function (elem) {
        delete elem.cnpj;
        delete elem.razao_social;
    });
    comp.qsa = part;
    return comp;
};
var consultBrasilIo = function (cnpj) { return __awaiter(void 0, void 0, void 0, function () {
    var company, partners, formatedCompany;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, brasilio_1.default.consultBrasilIo(cnpj, defaults_1.default.url_company_brasilio)];
            case 1:
                company = (_a.sent())[0];
                return [4 /*yield*/, brasilio_1.default.consultBrasilIo(cnpj, defaults_1.default.url_partners_brasilio)];
            case 2:
                partners = _a.sent();
                formatedCompany = formatData(company, partners);
                return [2 /*return*/, formatedCompany];
        }
    });
}); };
var getCompany = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var company, statusCode;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!(req.body.tipo == 'cacheado')) return [3 /*break*/, 2];
                return [4 /*yield*/, company_1.default.findOne({ cnpj: req.body.cnpj })
                        .exec()
                        .then(function (result) { return __awaiter(void 0, void 0, void 0, function () {
                        var company, statusCode;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!result) return [3 /*break*/, 1];
                                    return [2 /*return*/, res.status(200).json({
                                            empresa: result
                                        })];
                                case 1: return [4 /*yield*/, consultBrasilIo(req.body.cnpj)];
                                case 2:
                                    company = _a.sent();
                                    return [4 /*yield*/, createCompany(company)];
                                case 3:
                                    statusCode = _a.sent();
                                    if (statusCode == 200) {
                                        return [2 /*return*/, res.status(200).json({
                                                empresa: company
                                            })];
                                    }
                                    else {
                                        return [2 /*return*/, res.status(500).json({
                                                mensagem: 'Internal error'
                                            })];
                                    }
                                    _a.label = 4;
                                case 4: return [2 /*return*/];
                            }
                        });
                    }); })
                        .catch(function (error) {
                        return res.status(500).json({
                            message: error.message,
                            error: error
                        });
                    })];
            case 1:
                _a.sent();
                return [3 /*break*/, 10];
            case 2:
                if (!(req.body.tipo == 'tempo_real')) return [3 /*break*/, 9];
                return [4 /*yield*/, consultBrasilIo(req.body.cnpj)];
            case 3:
                company = _a.sent();
                statusCode = 0;
                return [4 /*yield*/, company_1.default.exists({ cnpj: req.body.cnpj })];
            case 4:
                if (!_a.sent()) return [3 /*break*/, 6];
                logger_1.default.info('Company exists');
                return [4 /*yield*/, updateCompany(company, req.body.cnpj)];
            case 5:
                statusCode = _a.sent();
                return [3 /*break*/, 8];
            case 6:
                logger_1.default.info('Company doesnt exists');
                return [4 /*yield*/, createCompany(company)];
            case 7:
                statusCode = _a.sent();
                _a.label = 8;
            case 8:
                if (statusCode == 200) {
                    return [2 /*return*/, res.status(200).json({
                            empresa: company
                        })];
                }
                else {
                    return [2 /*return*/, res.status(500).json({
                            mensagem: 'Internal error'
                        })];
                }
                return [3 /*break*/, 10];
            case 9: return [2 /*return*/, res.status(400).json({
                    mensagem: "Bad Request"
                })];
            case 10: return [2 /*return*/];
        }
    });
}); };
exports.default = {
    getCompany: getCompany
};
