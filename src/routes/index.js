const express = require('express');
const gags = require('./gagHandler')


var allRoutes = () => {
    
    var router = express.Router()
    router.use('/',gags())
    return router;
}

module.exports = allRoutes;
