import mongoose from 'mongoose'
const notificationSchema=new mongoose.Schema({
    companyId:{type:String,required:true},
    title:{type:String,required:true},
    message:{type:String,required:true},
    readAt:{type:Date,default:null}
    
},{timestamps:true})

const Notification = mongoose.model('Notification',notificationSchema)

export default Notification