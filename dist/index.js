"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable linebreak-style */
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const cors_1 = __importDefault(require("cors"));
// eslint-disable-next-line no-unused-vars
const swagger_json_1 = __importDefault(require("./swagger/swagger.json"));
const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
};
const app = (0, express_1.default)();
app.use((0, cors_1.default)(corsOptions));
const data = {
    artists_data: [
        {
            artist_name: 'Arjit',
            artist_id: '1234',
            match_percentage: 48,
            match_attributes: {
                venues: [
                    {
                        name: 'Samsung',
                        match_percentage: 60,
                    },
                    {
                        name: 'Sunburn',
                        match_percentage: 20,
                    },
                ],
                gender: 'Male',
                genre: 'Bollywood',
                age: '18-25',
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
                age: '18-25',
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
                age: '18-25',
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
        {
            artist_name: 'Neha Kakkar',
            artist_id: '1546',
            match_percentage: 70,
            match_attributes: {
                venues: [
                    {
                        name: 'SaReGaMa',
                        match_percentage: 40,
                    },
                ],
                gender: 'Female',
                genre: 'Bollywood',
                age: '26-35',
                associated_brands: [
                    {
                        name: 'Vh1',
                        contact: 'vh1.contact@vh1.com',
                        website: 'vh1.com',
                    },
                ],
            },
            summary: 'Neha is well known bollywod singer with lot of hits',
        },
        {
            artist_name: 'Akon',
            artist_id: '1546',
            match_percentage: 70,
            match_attributes: {
                venues: [
                    {
                        name: 'SaReGaMa',
                        match_percentage: 40,
                    },
                ],
                gender: 'Female',
                genre: 'Bollywood',
                age: '26-35',
                associated_brands: [
                    {
                        name: 'Vh1',
                        contact: 'vh1.contact@vh1.com',
                        website: 'vh1.com',
                    },
                ],
            },
            summary: 'Neha is well known bollywod singer with lot of hits',
        },
    ],
};
app.use(body_parser_1.default.json());
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));
app.get('/', (req, res) => {
    res.send('HELLO!');
});
app.post('/recommender/api/getMatchData/', (req, res) => {
    // eslint-disable-next-line no-unused-vars
    const body = JSON.stringify(req.body);
    res.send(data);
});
app.listen(3000, () => {
    console.log('Server running on port 3000');
});
