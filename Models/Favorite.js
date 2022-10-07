import mongoose from 'mongoose'
const favoriteSchema=new mongoose.Schema({
    userId:{type:String,required:true},
    properties:[{type:mongoose.SchemaTypes.ObjectId,ref:'Property'}],
    
    
},{timestamps:true})

const Favorite = mongoose.model('Favorite',favoriteSchema)

export default Favorite