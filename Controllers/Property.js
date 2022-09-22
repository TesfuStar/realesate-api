import Property from "../Models/Property.js";

//create all property

export const createProperty = async (req, res) => {
  const newProperty = new Property(req.body);
  try {
    const savedProperty = await newProperty.save();
    res.status(201).json(savedProperty);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get all property

export const getAllProperty = async (req, res) => {
  try {
    const allProperties= await Property.paginate();
    
      // results.data = await Property.find().populate("agents").limit(limit).skip(startIndex).exec();
    res.status(200).json(allProperties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// get single property
export const getSingleProperty = async (req, res) => {
    try {
      const property = await Property.findById(req.params.id).populate("agents")
      res.status(200).json(property);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


  //delete property

  export const deleteProperty= async (req, res) => {
    try {
      await Property.findByIdAndDelete(req.params.id)
      res.status(200).json("owner deleted succssfully");
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  //update property
  export const updateProperty= async (req, res) => {
    try {
      const property = await Property.findByIdAndUpdate(req.params.id,{
        $set:req.body
    },{new:true})
      res.status(200).json(property);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


  //filtered properties
  
export const getPropertiesByFilter=async(req,res)=>{
  const {minprice,maxprice,bathroom,bedroom,minarea,maxarea,type,city,owner}=req.query
   try {
     const property =await Property.find(
       {
        price:{$gte:minprice | 100,$lte:maxprice || 20000000},
       "details.bedroom":{$gte:bedroom | 1},
       "details.bathroom":{$gte:bathroom | 1},
       "details.area":{$gte:minarea | 100, $lte:maxarea || 10000},
        type:type ? {$in:[type]} : {$in:['sale','rent']},
        owner:owner ? {$eq:owner} : {$exists:true},
        "address.city":city ? {$in:[city]} : {$exists:true},
       
     },
   
       
       )
     res.status(200).json(property)
     
   } catch (error) {
     res.status(500).json({message:error.message})
   }
 
 }



 //get property sell or rent
 export const  getByPropertyType =async(req,res)=>{
  const qPropertyType=req.query.type
  let properties;
    const queryText = new RegExp(qPropertyType,'i')
  try {
    properties = await Property.find({ type:{
      $in:[queryText]
  }
    }).populate("agents");
    res.status(200).json(properties)
  } catch (error) {
    res.status(500).json({message:error.message})
  }
}

//get all properties or by realstate owner

export const getPropertyByOwner=async(req,res)=>{
  try {
      const properties = await Property.find({owner:req.params.id})
      res.status(200).json(properties)
    
  } catch (error) {
    res.status(500).json({message:error.message})
  }
}

// export const getAllProperty = async (req, res) => {
//   try {
//     const allProperties= await Property.find();
//       const page = parseInt(req.query.page)
//       const limit = 4
//       const startIndex = (page - 1) * limit
//       const endIndex = page * limit;
//       const results={}
//       if(endIndex < allProperties.length){
//         results.next = {
//           page:page + 1,
//           limit:limit
//         }
//       }
//       if(startIndex > 0){
//         results.previous = {
//           page:page - 1,
//           limit:limit
//         }
//       }
//       results.data = await Property.find().populate("agents").limit(limit).skip(startIndex).exec();
//     res.status(200).json(results);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };