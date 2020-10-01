class GagHandler{
    constructor(){
        this.gags = []
    }

    addGag(name){
        this.gags.push(name)
    }

    addLike(name,gagId){
        let gag = this.getGag(gagId)
        gag.likes.push(name)
    }

    addUnlike(name,gagId){
        let gag = this.getGag(gagId)
        gag.unlikes.push(name)
    }

    getLikesCount(gagId){
        return this.getGag(gagId).likes.length
    }

    getUnLikesCount(gagId){
        return this.getGag(gagId).unlikes.length
    }

    isUserInLikes(name,gagId){
        let gag = this.getGag(gagId)
        return gag.likes.some((username) => {
            return username == name
        })
    }

    isUserInUnLikes(name,gagId){
        let gag = this.getGag(gagId)
        return gag.unlikes.some((username) => {
            return username == name
        })
    }

    removeLike(name,gagId){}

    removeUnLike(name,gagId){}



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
