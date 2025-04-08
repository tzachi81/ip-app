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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var dns_1 = require("dns");
var os_1 = require("os");
var dotenv_1 = require("dotenv");
var schema_1 = require("./model/db/schema");
var client_1 = require("./model/db/client");
dotenv_1.default.config();
var app = (0, express_1.default)();
var PORT = 3000;
app.use(express_1.default.json());
var dbClient = (0, client_1.clientConnection)();
// Get internal and public IP addresses
app.get('/api/ip', function (req, res) {
    var ifaces = os_1.default.networkInterfaces();
    var internalIP = Object.values(ifaces)
        .flat()
        .find(function (iface) { return (iface === null || iface === void 0 ? void 0 : iface.family) === 'IPv4' && !iface.internal; });
    var publicIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    res.json({
        internalIP: internalIP ? internalIP.address : 'Not found',
        publicIP: publicIP,
    });
});
// Resolve domain and save to DB
app.post('/api/domain', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var domain;
    return __generator(this, function (_a) {
        domain = req.body.domain;
        dns_1.default.lookup(domain, function (err, address) { return __awaiter(void 0, void 0, void 0, function () {
            var newDomain;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (err) {
                            return [2 /*return*/, res.status(400).json({ error: 'Domain not found' })];
                        }
                        newDomain = new schema_1.default({ domain: domain, ip: address });
                        return [4 /*yield*/, newDomain.save()];
                    case 1:
                        _a.sent();
                        res.json({ domain: domain, ip: address });
                        return [2 /*return*/];
                }
            });
        }); });
        return [2 /*return*/];
    });
}); });
// Get domain history
app.get('/api/domains', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var domains;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, schema_1.default.find()];
            case 1:
                domains = _a.sent();
                res.json(domains);
                return [2 /*return*/];
        }
    });
}); });
app.listen(PORT, function () {
    console.log("Server is running on http://localhost:".concat(PORT));
});
