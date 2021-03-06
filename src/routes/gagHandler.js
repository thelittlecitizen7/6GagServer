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
            var base64data = undefined
            if (req.files.length > 0){
                let bianryData = req.files[0].buffer;
                var base64data = Buffer.from(bianryData, 'binary').toString('base64');
            }
            
            var text = req.body.text
            var title = req.body.title
            var name = req.body.name

            let gag = new Gag(title,text,name,base64data)
            handler.addGag(gag)
            res.status(200).json(handler.getGag(gag.id));
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: `cannot insert username with err ${err}` });
        }
    });
    
    router.put('/api/like', (req, res) => {
        try 
        {
            var name = req.body.name
            var isLike = req.body.isLike
            var gagId = req.body.id

            
            if (isLike){
                if (handler.isUserInLikes(name,gagId) || handler.isUserInUnLikes(name,gagId)){
                    res.status(409).json({"error":"user already voted"});
                    
                }
                else{
                    handler.addLike(name,gagId)
                    res.status(200).json({"likes":handler.getGag(gagId)});
                }
            }
            else{
                if (handler.isUserInUnLikes(name,gagId) || handler.isUserInLikes(name,gagId) ){
                    res.status(409).json({"error":"user already voted"});
                    
                }
                else{
                    handler.addUnlike(name,gagId)
                    res.status(200).json({"unlikes":handler.getUnLikesCount(gagId)});
                    
                }
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: `cannot insert username with err ${err}` });
        }
    });
    
    return router;
}
module.exports = gags;
