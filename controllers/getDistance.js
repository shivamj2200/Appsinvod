const User = require("../models/userModel.js");

module.exports.getDistance = async(req,res)=>{
    try{
        // const userLatitude = req.user.latitude;
        // const userLongitude = req.user.longitude;
        const userLatitude = req.body.Destination_Latitude;
        const userLongitude = req.body.Destination_Longitude;
        // const userLatitude = req.params.Destination_Latitude;
        // const userLongitude = req.params.Destination_Longitude;
        const userDistance = await User.aggregate([
            {
                $geoNear: {
                    near: {
                      type: 'Point',
                      coordinates: [
                        parseFloat(userLongitude),
                        parseFloat(userLatitude),
                      ],
                    },
                    distanceField: 'distance',
                    spherical: true,
                  },
            },
            {
                $match: {
                    _id: req.user.id, 
                },
            },
            {
                $project: {
                    _id:0,
                    distance: {
                        $concat: [
                          { $toString: { $trunc: { $divide: ["$distance", 1000] } } },
                          " km"
                        ]
                      }
                },
            },
        ]);
        if(!userDistance.length){
            return res.status(404).json({
                status_code: 404,
                message:"User Not Found",
            })
        }
        return res.status(200).json({
            status_code: 200,
            message:"Get the Distance successfully",
            distance:userDistance[0].distance
        })
    }catch(err){
        return res.status(400).json({
            message:err.message
         })
    }
}
// const User = require("../models/userModel.js");

// module.exports.getDistance = async (req, res) => {
//   try {
//     const userLatitude = req.body.Latitude;
//     const userLongitude = req.body.Longitude;

//     const userDistance = await User.aggregate([
//       {
//         $geoNear: {
//           near: {
//             type: 'Point',
//             coordinates: [parseFloat(userLongitude), parseFloat(userLatitude)],
//           },
//           distanceField: 'distance',
//           spherical: true,
//         },
//       },
//       {
//         $match: {
//           _id: req.user.id,
//         },
//       },
//       {
//         $project: {
//           _id: 0,
//           distance: {
//             $concat: [
//               { $toString: { $trunc: { $divide: ['$distance', 1000] } } },
//               ' km',
//             ],
//           },
//         },
//       },
//     ]);

//     if (!userDistance.length) {
//       return res.status(404).json({
//         status_code: 404,
//         message: 'User Not Found',
//       });
//     }

//     return res.status(200).json({
//       status_code: 200,
//       message: 'Get the Distance successfully',
//       distance: userDistance[0].distance,
//     });
//   } catch (err) {
//     return res.status(400).json({
//       message: err.message,
//     });
//   }
// };
