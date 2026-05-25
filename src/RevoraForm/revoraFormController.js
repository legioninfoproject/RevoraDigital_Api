const revoraDal = require("./revoraFormDal");
const mailHelper = require("../helper/mailHelper")
const revoraController = new Object();

revoraController.createdata = async(req,res)=>{
    try {
        let body = req.body;
          console.log("Body:", body);
        const result = await revoraDal.createdata (body);
          if (!result){
            return {status : false , message : "Something went wrong"};
          }
          if(body.type==="contact"){
            let payload ={
                Name : body.Name,
                Email : body.Email,
                phone : body.Mobile,
                organizationName : body.organizationName,
                subject : body.subject,
                message : body.message,
            }
            let result = await mailHelper.revoraMail("jinosona123@gmail.com","","Revora Digital",payload);
            if(!result.success){
                return {status : false , message : "Something went wrong"};
            }
              return {status : true , message : "Success", data : result};
          }
          if(body.type==="help"){
            let payload ={
                firstName : body.firstName,
                lastName : body.lastName,
                organizationName : body.organizationName,
                Email : body.Email,
                LandLine : body.LandLine,
                Mobile : body.Mobile,
                country : body.country,
                city : body.city,
                help : body.help,
                message : body.message,
                subject : body.subject
            }
            let result = await mailHelper.revoraMail("jinosona123@gmail.com","","Revora Digital",payload);
            console.log(result);
            if(!result.success){
                return {status : false , message : "Something went wrong"};
            }
              return {status : true , message : "Success", data : result};
          }

    }catch(error){
       return {status : false , message : error.message};
    }
}




module.exports = revoraController;

