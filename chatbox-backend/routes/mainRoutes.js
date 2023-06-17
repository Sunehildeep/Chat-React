var express = require('express');
var router = express.Router();
var controller = require('../controller/conversationController');
var authController = require('../controller/authenticationController');

// Get conversations
router.get('/conversations/:id', controller.getConversationsList);
router.get('/getAllUsers', controller.getAllUsers);
router.get('/getConversationHistory/:id', controller.getConversationHistory);
router.post('/postMessage', controller.postMessage);
router.post('/startConvo', controller.startConvo);
router.post('/updateMessage', controller.updateMessage);

// Authentication
router.post('/login', authController.login);
router.post('/register', authController.register);

module.exports = router;
