const revoraFormModel = require("./revoraFormModel");
const revoraDal = new Object();

revoraDal.createdata = async(body) => {
    try {
        const data = new revoraFormModel(body);
        const result = await data.save();
        return result;
    } catch(error) {
        console.log(error);
        throw error; 
    }
}



module.exports = revoraDal;