import Agent from "../Models/Agent.js";
import Property from "../Models/Property.js";
import SoldProperties from "../Models/SoldProperties.js";

export const dashboard = async (req, res) => {
  try {
    const agents = await Agent.find({
      companyId: req.params.companyId,
    }).count();
    const propertyForSale = await Property.find({
      companyId: req.params.companyId,
      type: "sale",isSoldOut:false,isRented:false
    }).count();
    const propertyForRent = await Property.find({
      companyId: req.params.companyId,
      type: "rent",isSoldOut:false,isRented:false
    }).count();
    const soldProperties = await Property.find({companyId: req.params.companyId,isSoldOut:true}).count();
    const rentedProperties = await Property.find({companyId: req.params.companyId,isRented:true}).count();
    const featuredProperties = await Property.find({companyId: req.params.companyId,isFeatured:true}).count();
    res.status(200).json({
      success: true,
      data: {
        totalAgent: agents,
        propertyForSale: propertyForSale,
        propertyForRent: propertyForRent,
        soldProperties: soldProperties,
        rentedProperties:rentedProperties,
        featuredProperties:featuredProperties
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const paginate = async (req, res) => {
  
  try {
    const property = await Property.find().pagination();
    res.status(200).json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//sales analysis

export const salesAnalysis=async(req,res)=>{
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
  try {
     const saleAnalysis=await Property.aggregate([
      {$match:{isRented:true,companyId: req.params.companyId,createdAt: { $gte: lastYear }}},
      {$match:{isSoldOut:true,companyId: req.params.companyId,createdAt: { $gte: lastYear }}},
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
     ])
     res.status(200).json({success:true,data:saleAnalysis});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}