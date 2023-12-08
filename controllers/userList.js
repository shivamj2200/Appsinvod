const User =  require('../models/userModel');

module.exports.userList = async(req,res) =>{
    try {
    
    let weekDays = req.params.weekdays.split(',').map((data)=>parseInt(data)+1)
    if (weekDays.some(value => value < 1 || value > 7)) {
        throw new Error("Entered value can not be less than 0 or more than 6");
      }
    let userData = await User.aggregate([
        {
          $group: {
            _id: { dayOfWeek: { $dayOfWeek: "$createdAt" } },
            users: {
              $push: {
                name: "$name",
                email: "$email"
              }
            }
          }
        },
        {
            $match: {
              "_id.dayOfWeek": { $in: weekDays } 
            }
        },
        {
          $project: {
            day: {
              $switch: {
                branches: [
                  { case: { $eq: ["$_id.dayOfWeek", 1] }, then: "sunday" },
                  { case: { $eq: ["$_id.dayOfWeek", 2] }, then: "monday" },
                  { case: { $eq: ["$_id.dayOfWeek", 3] }, then: "tuesday" },
                  { case: { $eq: ["$_id.dayOfWeek", 4] }, then: "wednesday"},
                  { case: { $eq: ["$_id.dayOfWeek", 5] }, then: "thursday"},
                  { case: { $eq: ["$_id.dayOfWeek", 6] }, then: "friday"},
                  { case: { $eq: ["$_id.dayOfWeek", 7] }, then: "saturday"}

                ],
                default: "unknown"
              }
            },
            users: 1,
            _id: 0
          }
        },
        {
          $group: {
            _id: "$day",
            users: { $push: "$users" }
          }
        }
      ]);
    if(!userData.length){
        return res.status(200).json({
            status_code: 200,
            message:"Data not found for providing day/s",
            data:userData
          })
    }
    let result = {};
    userData.forEach((data)=>{
        result[`${data._id}`] = data.users[0]
    })
    return res.status(200).json({
        status_code: 200,
        message:"Get user list successfully",
        data:result
    })
      
    } catch (error) {
        
        return res.status(400).json({
           message:error.message
        })
    }
}