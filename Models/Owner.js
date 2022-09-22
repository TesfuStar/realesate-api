import mongoose from 'mongoose'
import { v4 as uuidv4 } from 'uuid';
const ownerSchema=new mongoose.Schema({
    companyId:{type:String, default:uuidv4()},
    name:{type:String,required:true,unique:true},
    logo:{type:String,required:true},
    address:{type:String,required:true},//main office
    phoneNo:{type:String,required:true}
})

const Owner = mongoose.model('Owner',ownerSchema)

export default Owner