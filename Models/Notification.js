import mongoose from 'mongoose'
const notificationSchema=new mongoose.Schema({
    companyId:{type:String,required:true},
    message:{type:String,required:true,unique:true},
    
    
})

const Notification = mongoose.model('Notification',notificationSchema)

export default Notification