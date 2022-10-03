import mongoose from 'mongoose'
const ownerSchema=new mongoose.Schema({
    name:{type:String,required:true,unique:true},
    logo:{type:String,required:true},
    address:{type:String,required:true},//main office
    phone:{type:String,required:true}
})

const Owner = mongoose.model('Owner',ownerSchema)

export default Owner