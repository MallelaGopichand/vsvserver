const express = require('express');
const request = require('request');
const app = express();

const WORDPRESS_API_URL = 'https://vsv.appstacklabs.com/wp-json/wc/v3';
const CONSUMER_KEY = 'ck_4303dff231569aed7f96ed1029c93747c2dc1cb4';
const CONSUMER_SECRET = 'cs_0c7c29fb3234643f082d1effa2d0c29ae1192f9b';

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Authorization');
    next();
});

app.use('/api', (req, res) => {
    const url = `${WORDPRESS_API_URL}${req.url}&consumer_key=${CONSUMER_KEY}&consumer_secret=${CONSUMER_SECRET}`;
    req.pipe(request(url)).pipe(res);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Proxy server is running on http://localhost:${port}`);
});
