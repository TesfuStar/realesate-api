import Favorite from "../Models/Favorite.js";
import User from "../Models/User.js";


//add to favorite

export const addToFavorite=async(req,res)=>{
    const {id} =req.params
    const {property}=req.body
    const {favoriteId} = req.body
 try {
    const userFavorite = await Favorite.findById(favoriteId);
    if(userFavorite){
        userFavorite.properties.push(property)
        const updatedUserFavorite =await Favorite.findByIdAndUpdate(favoriteId,userFavorite,{new:true})
        res.status(200).json({success:true,data:updatedUserFavorite,message:"new property added to favorite"})
    }else{
         const createUserFavorite = new Favorite({userId:req.params.id,properties:req.body.property})
          const saveUserFavorite = await createUserFavorite.save()
          res.status(200).json({success:true,data:saveUserFavorite,message:"favorite is created by user"})
    }
} catch (error) {
     res.status(500).json({ message: error.message });
    
 }
}


//get user gevorite 

export const getUserFavorite=async(req,res)=>{
    try {
        const userFavorite = await Favorite.findOne({userId:req.params.id}).populate('properties')
        if(!userFavorite) return res.status(400).json({message:'you have no favorite'})
         res.status(200).json({success:true,data:userFavorite})
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}