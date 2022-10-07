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
    const soldProperties = await SoldProperties.find({
      companyId: req.params.companyId,
    }).count();
    res.status(200).json({
      success: true,
      data: {
        totalAgent: agents,
        propertyForSale: propertyForSale,
        propertyForRent: propertyForRent,
        soldProperties: soldProperties,
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
