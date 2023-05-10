const { userIdModels, updateUserModels } = require("../models/userModels");
const cloudinary = require("../config/cloudinaryConfig");


const userController = {
    userPayloadController: async (req, res) => {
        let id = req.payload.id;
    
        try {
          let result = await userIdModels(id);
    
          res.status(200).json({
            message: "User",
            data: result.rows,
          });
        } catch (error) {
          res.status(400).json({
            message: "User not found"
          });
        }
    },
    
    userUpdateController: async (req, res) => {
        let id = req.payload.id;
    

        try {
            let checking = await userIdModels(id);
            let current = checking.rows[0];               

            let data = {};
            data.email = req.body.email || current.email;
            data.password = req.body.password || current.password;
            data.name = req.body.name || current.name;
            data.phone = req.body.phone || current.phone;
            data.address = req.body.address || current.address;
            data.city = req.body.city || current.city;
            data.country = req.body.country || current.country;
            data.postal_code = req.body.postal_code || current.postal_code;

            if(req.file){
                const imageUrl = await cloudinary.uploader.upload(req.file.path, {folder: "user_angkasa" });
                data.photo = imageUrl.secure_url
            }else{
                data.photo = current.photo
            }
            
    
          if (checking.rows[0].id !== id) {
            res.status(404).json({
              message: "Failed to load user",
            });
          } else {
            await updateUserModels(data, id);
            res.status(200).json({
              message: "User has been updated",
              data
            });
          }
        } catch (error) {
          res.status(401).json({
            message: "Failed to update user",
            error: error.message,
          });
        }
      },
}

module.exports = userController