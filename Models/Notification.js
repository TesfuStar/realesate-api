import mongoose from 'mongoose'
const notificationSchema=new mongoose.Schema({
    userId:{type:String},
    companyId:{type:String},
    title:{type:String},
    message:{type:String},
    readAt:{type:Date,default:null}
    
},{timestamps:true})

const Notification = mongoose.model('Notification',notificationSchema)

export default Notification