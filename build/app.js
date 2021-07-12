"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var defaults_1 = __importDefault(require("./config/defaults"));
var logger_1 = __importDefault(require("./logger"));
var connect_1 = __importDefault(require("./db/connect"));
var routes_1 = __importDefault(require("./routes/routes"));
var port = defaults_1.default.port;
var host = ''; //config.host
var app = express_1.default();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
/** Routes */
app.use('/v1', routes_1.default);
app.listen(port, host, function () {
    logger_1.default.info("Server listening at http://" + host + ":" + port);
    //Connect to Database
    connect_1.default();
});
