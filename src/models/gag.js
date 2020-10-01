const uuid = require('uuidv4');

class Gag{
    constructor(title , text,name,img){
        this.id = uuid.uuid();
        this.title = title;
        this.text = text;
        this.name = name;
        this.img = img;
        this.likes = []
        this.unlikes = []
    }
}

module.exports = {Gag}
