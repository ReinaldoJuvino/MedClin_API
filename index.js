const app = require('express')();  
const consign = require('consign');
const db = require('./src/config/db');
const dotenv = require('dotenv');

dotenv.config();

app.db = db;

consign()
    .include('./src/config/passport.js')
    .then('./src/config/middlewares.js')
    .then('./src/api/validation.js')
    .then('./src/api')
    .then('./src/config/routes.js')
    .into(app);

app.listen(process.env.PORT || 3000, () => console.log('Server running'));
