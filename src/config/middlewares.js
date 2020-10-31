const bodyParser = require('body-parser');
const cors = require('cors');

module.exports = app => {
    
    app.options('*', cors())
    //app.use(cors());
    app.use(bodyParser.json());
}