const User = require("../models/userModel.js");
const hashPassword = require("../helpers/password.js");
const tokenGenerate = require("../helpers/genrateToken.js");
const {user_schema} = require('../helpers/validation.js')
module.exports.createUser = async(req,res)=> {
    try{
        await user_schema.validateAsync(req.body);
        let bcryptedPassword = await hashPassword.bcryptPassword(req.body.Password);
        const { Name, Email, Address, Longitude, Latitude, Status } = req.body;
        const user = await User.create({
            name: Name,
            email: Email,
            password: bcryptedPassword,
            address: Address,
            longitude: Longitude,
            latitude: Latitude,
            location: {
            type: 'Point',
            coordinates: [Latitude, Longitude]
            },
            status: Status
       });
          let {access_token}= await tokenGenerate.generatedToken({email:user.email});
          return res.status(200).json({
            status_code: 200,
            message:"User Created Succesfully",
            data: {
              name:user.name,
               email: user.email,
               address:user.address,
               latitude:user.latitude,
               longitude:user.longitude,
               status:user.status,
               register_at:user.createdAt,
               token:access_token,
            },
          });
    }catch(error){
        if (error.name === "MongoServerError" || error.keyValue) {
            return res.status(403).json({
              message: "User already exist"
            })         
          }
          return res.status(500).json({
            message: error.message,
          });
    }
}
