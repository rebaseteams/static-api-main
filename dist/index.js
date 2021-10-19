"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
const express_1 = __importDefault(require("express"));
const yamljs_1 = __importDefault(require("yamljs"));
const body_parser_1 = __importDefault(require("body-parser"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const app = (0, express_1.default)();
const swaggerDocument = yamljs_1.default.load('./swaggerdoc.yaml');
const data = [{
        artists_data: [
            {
                artist_name: 'Arjit',
                artist_id: '1234',
                match_percentage: 48,
                match_attributes: {
                    venues: [
                        {
                            name: 'Sunburn',
                            match_percentage: 20,
                        },
                    ],
                    gender: 'Male',
                    genre: 'Bollywood',
                    associated_brands: [
                        {
                            name: 'Coke Studio',
                            contact: 'cokestudio.contact@coke.com',
                            website: 'coke.com',
                        },
                    ],
                },
                summary: 'Arjit is well known bollywod singer with lot of hits',
            },
        ],
    }, {
        artists_data: [
            {
                artist_name: 'Atif',
                artist_id: '1254',
                match_percentage: 30,
                match_attributes: {
                    venues: [
                        {
                            name: 'Radio Mirchi',
                            match_percentage: 60,
                        },
                    ],
                    gender: 'Male',
                    genre: 'Bollywood',
                    associated_brands: [
                        {
                            name: 'MTV Radio',
                            contact: 'MTVradio.contact@mtv.com',
                            website: 'mtv.com',
                        },
                    ],
                },
                summary: 'Atif is well known bollywod singer with lot of hits',
            },
        ],
    }, {
        artists_data: [
            {
                artist_name: 'Prateek Kullhad',
                artist_id: '1546',
                match_percentage: 70,
                match_attributes: {
                    venues: [
                        {
                            name: 'Concert',
                            match_percentage: 60,
                        },
                    ],
                    gender: 'Male',
                    genre: 'Bollywood',
                    associated_brands: [
                        {
                            name: 'VH1 India',
                            contact: 'vh1.contact@vh1.com',
                            website: 'vh1.com',
                        },
                    ],
                },
                summary: 'Prateek is well known bollywod singer with lot of hits',
            },
        ],
    }];
app.use(body_parser_1.default.json());
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
app.get('/', (req, res) => {
    res.send('HELLO!');
});
app.post('/recommender/api/getMatchData/', (req, res) => {
    const body = JSON.stringify(req.body);
    res.send(data);
});
app.listen(3000, () => {
    console.log('Server running on port 3000');
});
