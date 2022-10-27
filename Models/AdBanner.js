import mongoose from 'mongoose'
const bannerAdSchema=new mongoose.Schema({
    user:{type:mongoose.SchemaTypes.ObjectId,ref:'User',default:null},
    owner:{type:mongoose.SchemaTypes.ObjectId,ref:'Owner',default:null},
    AgentCompany:{type:String,default:null},
    image:{type:String,required:true},
    name:{type:String,default:null},
    isAccepted:{type:Boolean,default:false},
    isRejected:{type:Boolean,default:false},
},{timestamps:true})

const AdBanner = mongoose.model('AdBanner',bannerAdSchema)

export default AdBanner