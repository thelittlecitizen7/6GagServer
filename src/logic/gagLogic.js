class GagHandler{
    constructor(){
        this.gags = []
    }

    addGag(name){
        this.gags.push(name)
    }

    getAllGags(){
        return this.gags
    }

    isGagExist(id){
        return this.gags.some( gag => gag.id === id)
    }

    getGag(id){
        var foundGag = this.gags.find((gag) => {
            if (gag.id == id){
                return gag;
            }
        })
        if (foundGag === undefined || foundGag === null) {

            return null;
        }
        return foundGag

    }
}

module.exports = {GagHandler};
