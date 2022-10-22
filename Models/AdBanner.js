import mongoose from 'mongoose'
const bannerAdSchema=new mongoose.Schema({
    user:{type:mongoose.SchemaTypes.ObjectId,ref:'User'},
    owner:{type:mongoose.SchemaTypes.ObjectId,ref:'Owner'},
    AgentCompany:{type:String},
    image:{type:String,required:true},
    name:{type:String},
    isAccepted:{type:Boolean,default:false},
    isRejected:{type:Boolean,default:false},
},{timestamps:true})

const AdBanner = mongoose.model('AdBanner',bannerAdSchema)

export default AdBanner