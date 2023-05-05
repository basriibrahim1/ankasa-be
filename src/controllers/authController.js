const {registerUserModels, userEmailModels, userIdModels, verifyUserModels} = require('../models/userModels')
const {v4:uuidv4} = require("uuid");
const argon2 = require("argon2");
const generateToken = require("../helpers/generateToken");
const email = require("../middleware/emailAuth");

const authController = {
    registerUserController: async(req, res) => {
        
        try {
            !req.body.email && res.status(400).json({message: 'Email must be inputed'})
            !req.body.name && res.status(400).json({message: 'Name must be inputed'})
            !req.body.password && res.status(400).json({message: 'Password must be inputed'})
    
            let otp = Math.floor(100000 + Math.random() * 900000);
    
            let {rows:[users]} = await userEmailModels(req.body.email);
    
            users && res.status(400).json({message: "Email has been used, please register with another email"});
    
            let id = uuidv4();
    
            let data = {
                id,
                email: req.body.email,
                name: req.body.name,
                password: await argon2.hash(req.body.password),
                otp,
            };
    
            let register = await registerUserModels(data);
    
            !register && res.status(400).json({message: "You need to Register first"});

            let url = `http://${process.env.BASE_URL}:${process.env.PORT}/auth/${id}/${otp}`;
            let sendEmail = email(req.body.email, otp, url, req.body.name);

            sendEmail === "Email not sent" && res.status(400).json({message: "Email failed to send"})
            
            return res.status(200).json({
                message: "Register Success, Please check your email"
            });
            
        } catch (error) {
            return res.status(200).json({
                message: "Register Failed"
            });
        }
    },

    loginUserController: async(req, res) => {
        try {
            !req.body.email && res.status(400).json({message: 'Email must be inputed'})
            !req.body.password && res.status(400).json({message: 'Password must be inputed'})

            let {rows:[users]} = await userEmailModels(req.body.email);

            !users && res.status(400).json({message: "Invalid Email Address"});

            users.verif === null &&  res.status(400).json({ message: "Please verify your account"});

            let verifyPassword = await argon2.verify(users.password, req.body.password);

            !verifyPassword && res.status(400).json({message: "Invalid Password"});
       

            if(verifyPassword){
                const accessToken = generateToken(users);
                users.token = accessToken;
                delete users.created_at;
                delete users.password;
                delete users.otp;
                delete users.verif;
                return res.status(200).json({
                    message: "Login success", 
                    data: users
                });
            }
        } catch (error) {
            return res.status(404).json({
                message: "Login failed"
            });
        }
    },

    otp: async(req,res) => {
        let userId = req.params.id;
        let otpUser = req.params.code;

        !userId || !otpUser && res.status(400).json({message: "Incorrect OTP"});
        
        
        let {rows:[users]} = await userIdModels(userId);

        !users && res.status(400).json({message: "Users not found"});
        

        if(users.otp === otpUser){
            let verif = await verifyUserModels(userId);
            verif ? res.status(200).json({message: "Verified"}) :  res.status(400).json({message: "Something went wrong"})
            
        } else {
            return res.status(400).json({
                message: "Wrong OTP Code"
            });
        }
    }

}


module.exports = authController