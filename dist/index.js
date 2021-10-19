"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const yamljs_1 = __importDefault(require("yamljs"));
const body_parser_1 = __importDefault(require("body-parser"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swaggerDocument = yamljs_1.default.load('./swaggerdoc.yaml');
app.use(body_parser_1.default.json());
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
app.get("/", (req, res) => {
    res.send("HELLO!");
});
app.post("/recommender/api/getMatchData/", (req, res) => {
    const data = JSON.stringify(req.body);
    res.send(data);
});
app.listen(3000, () => {
    console.log("Server running on port 3000");
});
