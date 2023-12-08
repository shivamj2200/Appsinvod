const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    location: {
        type: {
            type: String,
            default: 'Point',
        },
        coordinates: {
            type: [Number], 
        },
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },
  },
  {
    timestamps: true,
  }
);

userSchema.index({ location: '2dsphere' });

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;