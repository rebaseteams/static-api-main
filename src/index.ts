import express, { json } from "express";
const app = express();
import YAML from 'yamljs';
import bodyParser from "body-parser";
import swaggerUi from 'swagger-ui-express';
const swaggerDocument = YAML.load('./swaggerdoc.yaml');


app.use(bodyParser.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get("/", (req, res)=>{
    res.send("HELLO!")
})
app.post("/recommender/api/getMatchData/", (req, res)=>{
const data = JSON.stringify(req.body)
res.send(data)
})
app.listen(3000, () => {
 console.log("Server running on port 3000");
});
