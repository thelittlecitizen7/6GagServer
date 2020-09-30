const uuid = require('uuidv4');

class Gag{
    constructor(title , text,img){
        this.id = uuid.uuid();
        this.title = title;
        this.text = text
        this.img = img
    }
}

module.exports = {Gag}
