var express = require('express');
var router = express.Router();
const usersController = require("../controllers/usersController");
const uploadfile = require("../middlewares/uploadFile");



/* GET users listing. */

 //router.get('/getAllUsers',usersController.getAllUsers ); //get all 

router.post('/addClient',usersController.addClient ); 
router.post('/addUserWithImage',uploadfile.single("image_user"),usersController.addUserWithImage );//add client

//router.post('/addAdmin',userController.addAdmin ); //add admin


//router.get('/getUserById/:id',usersController.getUserById ); //get all 


router.put('/updatePassword',usersController.updatePassword); //update password
router.delete('/deleteMyAccount/:id',usersController.deleteMyAccount ); //delete ACCOUNT
module.exports = router;
