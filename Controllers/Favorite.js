import Favorite from "../Models/Favorite.js";
import User from "../Models/User.js";

//add to favorite

export const addToFavorite = async (req, res) => {
  const { id } = req.params;
  const { property } = req.body;
  try {
    const userFavorite = await Favorite.findById(id);
    if (userFavorite) {
        const propertyId = userFavorite.properties?.some(
            (item) => item == property
          );
      if (propertyId)  return res.status(400).json({ message: "property is already in favorite" });
      userFavorite.properties.push(property);
      const updatedUserFavorite = await Favorite.findByIdAndUpdate(
        id,
        userFavorite,
        { new: true }
      );
      res.status(200).json({
        success: true,
        data: updatedUserFavorite,
        message: "new property added to favorite",
      });
    } else {
      const createUserFavorite = new Favorite({
        _id: id,
        userId: id,
        properties: property,
      });
      const saveUserFavorite = await createUserFavorite.save();
      res.status(200).json({
        success: true,
        data: saveUserFavorite,
        message: "favorite is created by user",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get user fevorite

export const getUserFavorite = async (req, res) => {
  try {
    const userFavorite = await Favorite.findById(req.params.id);
    if (!userFavorite)
      return res.status(400).json({ message: "you have no favorite" });
    res.status(200).json({ success: true, data: userFavorite });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//remove property user favorite  .populate('properties')

export const removeUserFavorite = async (req, res) => {
  const { id } = req.params;
  const { property } = req.body;
  try {
    const userFavorite = await Favorite.findById(id);
    if (!userFavorite)
      return res.status(400).json({ message: "you have no favorite" });
    const propertyId = userFavorite.properties?.some(
      (item) => item == property
    );
    if (!propertyId)
      return res.status(400).json({ message: "property not found" });
    userFavorite.properties.pop(property);
    const updatedUserFavorite = await Favorite.findByIdAndUpdate(
      id,
      userFavorite,
      { new: true }
    );
    res.status(200).json({ success: true, data: updatedUserFavorite });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
