const express = require('express');
const gagHandler = require('../logic/gagLogic');
const gag = require('../models/gag');
const { Gag } = require('../models/gag');


var multer  = require('multer');
// var uploads = multer({dest: 'uploads/'});
var storage = multer.memoryStorage()
var uploads = multer({ storage: storage })

var router = express.Router()
let handler = new gagHandler.GagHandler();
var gags = () => {

    router.get('/api/gags',  (req, res) => {
        try {
            let users = handler.getAllGags()
                
            res.status(200).json({"gags" : users});
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'failed get all users' });
        }
    });

    router.get('/api/gag/:id',  (req, res) => {
        try {
            var id = req.params.id
            let user = handler.getGag(id)
            if (user === undefined || user === null) {
                res.status(404).json({ "error":` user with ${id} is not exit in system`});    
            }
                
            res.status(200).json(user);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'failed on get specific username' });
        }
    });
    
    router.post('/api/gag',  (req, res) => {
        try {
            var text = req.body.text
            var title = req.body.title

            let gag = new Gag(title,text,"images")
            handler.addGag(gag)
            res.status(200).json(handler.getGag(gag.id));
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: `cannot insert username with err ${err}` });
        }
    });

    router.post('/api/upload',uploads.any(), (req, res) => {
        try 
        {
            let bianryData = req.files[0].buffer;
            var base64data = Buffer.from(bianryData, 'binary').toString('base64');
            
            var text = req.body.text
            var title = req.body.title

            let gag = new Gag(title,text,base64data)
            handler.addGag(gag)
            res.status(200).json(handler.getGag(gag.id));
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: `cannot insert username with err ${err}` });
        }
    });

    return router;
}
module.exports = gags;
