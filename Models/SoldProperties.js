import mongoose from 'mongoose'

const soldPropertiesSchema=new mongoose.Schema({
    companyId:{type:String,required:true},
    property:{type:mongoose.SchemaTypes.ObjectId,ref:'Property'}

},{timestamps:true})

const SoldProperties = mongoose.model('SoldProperties',soldPropertiesSchema)

export default SoldProperties