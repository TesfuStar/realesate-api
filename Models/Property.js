import mongoose  from 'mongoose'


const AddressSchema = new mongoose.Schema({
      city:{type:String,required:true},
      location:{type:String,required:true},
      latitude:{type:Number,required:true},
      longtude:{type:Number,required:true}

})

const PropertySchema = new mongoose.Schema({
    name:{type:String,required:true},
    images:{type:[String],required:true,},
    price:{type:Number,required:true},
    description:{type:String,required:true},//text descriptionfor the property 
    type:{type:String,required:true}, //rent or sale
    details:{
        area:{type:Number,required:true},//in square
        bedroom:{type:Number,required:true},
        bathroom:{type:Number,required:true},
        yearbuilt:{type:Number,required:true},
        floor:{type:Number},
    
    },
    views:{type:Number,default:0},
    owner:{type:mongoose.SchemaTypes.ObjectId,required:true,ref:'Owner'},//realstate owner companyId
    agents:[{type:mongoose.SchemaTypes.ObjectId,ref:'Agent'}],
    address:AddressSchema
    

},{timestamps:true})


const Property = mongoose.model('Property',PropertySchema)


export default Property