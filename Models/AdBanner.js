import mongoose from 'mongoose'
const bannerAdSchema=new mongoose.Schema({
    userId:{type:mongoose.SchemaTypes.ObjectId,ref:'User'},
    ownerId:{type:mongoose.SchemaTypes.ObjectId,ref:'Owner'},
    AgentCompanyId:{type:mongoose.SchemaTypes.ObjectId,ref:'AgentCompany'},
    image:{type:String,required:true},
    isAccepted:{type:Boolean,default:false},
    isRejected:{type:Boolean,default:false},
},{timestamps:true})

const AdBanner = mongoose.model('AdBanner',bannerAdSchema)

export default AdBanner