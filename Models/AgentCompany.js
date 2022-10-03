import mongoose from 'mongoose'
import { v4 as uuidv4 } from 'uuid';
const agentCompanySchema=new mongoose.Schema({
    companyId:{type:String, default:uuidv4()},
    name:{type:String,required:true,unique:true},
    logo:{type:String,required:true},
    address:{type:String,required:true},//main office
    phone:{type:String,required:true}
})

const AgentCompany = mongoose.model('AgentCompany',agentCompanySchema)

export default AgentCompany