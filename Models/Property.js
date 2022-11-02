import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";

const AddressSchema = new mongoose.Schema({
  city: { type: String, required: true },
  location: { type: String, required: true },
  loc:  { type: [Number], required: true },
});
AddressSchema.index({loc:'2dsphere'})
const PropertySchema = new mongoose.Schema(
  {
    companyId: { type: String, required: true },
    name: { type: String, required: true },
    images: { type: [String], required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true }, //text description for the property
    paymentDescription: { type: String, required: true },
    type: { type: String, required: true }, //rent or sale
    details: {
      area: { type: Number, required: true }, //in square
      bedroom: { type: Number, required: true },
      bathroom: { type: Number, required: true },
      yearbuilt: { type: Number, required: true },
      floor: { type: Number },
    },
    views: { type: Number, default: 0 },
    owner: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: "Owner",
    }, //realestate owner companyId
    agents: { type: mongoose.SchemaTypes.ObjectId, ref: "Agent" },
    address: AddressSchema,
    amenities: { type: [String], default: [] },
    isFeatured: { type: Boolean, default: false },
    isRented: { type: Boolean, default: false },
    isFurnished: { type: Boolean, default: false },
    isRequestedForAd : { type: Boolean, default: false },
    isSoldOut: { type: Boolean, default: false },
    isHided: { type: Boolean, default: false },
  },
  { timestamps: true }
);

PropertySchema.plugin(paginate);
const Property = mongoose.model("Property", PropertySchema);
//payment agreement description

export default Property;
