import mongoose  from 'mongoose'
import paginate from 'mongoose-paginate-v2';

const AddressSchema = new mongoose.Schema({
      city:{type:String,required:true},
      location:{type:String,required:true},
      latitude:{type:Number,required:true},
      longtude:{type:Number,required:true}

})

const PropertyAdSchema = new mongoose.Schema({
    companyId:{ type: String, required: true },
    name:{type:String,required:true},
    images:{type:[String],required:true,},
    price:{type:Number,required:true},
    description:{type:String,required:true},//text description for the property 
    type:{type:String,required:true}, //rent or sale
    details:{
        area:{type:Number,required:true},//in square
        bedroom:{type:Number,required:true},
        bathroom:{type:Number,required:true},
        yearbuilt:{type:Number,required:true},
        floor:{type:Number},
    
    },
    views:{type:Number,default:0},
    owner:{type:mongoose.SchemaTypes.ObjectId,required:true,ref:'Owner'},//realestate owner companyId
    agents:{type:mongoose.SchemaTypes.ObjectId,ref:'Agent'},
    address:AddressSchema,
    amenities:{type:[String],default:[]},
    isFeatured:{type:Boolean,default:false},
    isAccepted:{type:Boolean,default:false},
    isRejected:{type:Boolean,default:false},

},{timestamps:true})

PropertyAdSchema.plugin(paginate)
const PropertyAd = mongoose.model('PropertyAd',PropertyAdSchema)


export default PropertyAd