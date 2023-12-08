const User = require("../models/userModel.js");
module.exports.changeUserStatus = async(req,res) =>{
    try{
        await User.updateMany(
            {},
            [{
              $set: {
                status: {
                  $cond: {
                    if: { $eq: ['$status', 'active'] },
                    then: 'inactive',
                    else: 'active'
                  }
                }
              }
            }]
          );
         return res.status(200).json({
          status_code: 200,
          message:"User status changed successfully"
          })
    }catch(err){
        return res.status(400).json({
            message:err.message
         })
    }
}