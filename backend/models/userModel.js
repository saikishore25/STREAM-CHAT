import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema({

    fullName:{

        type:String,
        required:true
    },

    email:{

        type:String,
        required: true,
        unique:true
    },

    password:{

        type:String,
        required: true,
        minlength:8
    },

    bio:{

        type:String,
        default:""
    },

    profilePic:{

        type:String,
        default:""
    },

    nativLanguage:{

        type:String,
        default:""
    },
    
    learningLanguage:{

        type:String,
        defaul:""
    },

    location:{

        type:String,
        defaul:""
    },

    isOnProfileSetup:{

        type:Boolean,
        defaul:false
    },

    friends:[

        {   

            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ]

}, {timestamps:true})

const userModel = mongoose.model("User",userSchema)

export default userModel