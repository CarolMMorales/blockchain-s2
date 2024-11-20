let mongoose = require("mongoose");

let blockChainModel = require("./model");

mongoose.connect("mongodb://localhost:2701/blockChain", (err) =>{
    if(err){
        return console.log("Cannot connect to DB");
    console.log("Badatabase is Connected");
    connectionCallback();
    }
}); 

let connectionCallback = () => {};

module.exports.onConnect = (callback) => {
    connectionCallback = callback;
}