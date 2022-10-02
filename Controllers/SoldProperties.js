import SoldProperties from "../Models/SoldProperties.js";
import Property from "../Models/Property.js";

//add property sold or rented

export const addToSoldProperties = async (req, res) => {
  try {
    const property = await Property.findByIdAndUpdate(
      req.params.id,
      {
        isSoldOut: true,
      },
      { new: true }
    );
    const addedSoldProperty = new SoldProperties({companyId:property.companyId,property:property._id})
    const savedProperty = await addedSoldProperty.save()
    res.status(200).json({ success: true, soldProperty: savedProperty,updatedProperty: property });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get company sold properties

export const getCompanySoldProperties = async (req, res) => {
  try {
    const soldProperties = await SoldProperties.find({
      companyId: req.params.companyId,
      isSoldOut: true,
    }).sort({ createdAt: -1 }).populate('property')
    res.status(200).json({ success: true, data: soldProperties });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get company rented properties
export const getCompanyRentedProperties = async (req, res) => {
  try {
    const rentedProperties = await SoldProperties.find({
      companyId: req.params.companyId,isRented:true
    }).sort({ createdAt: -1 }).populate('property')
    res.status(200).json({ success: true, data: rentedProperties });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCompanyRentedProperties = async (req, res) => {
    try {
      await SoldProperties.findByIdAndDelete(req.params.id)
      res.status(200).json({ success: true,message:"property successfully deleted"});
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  