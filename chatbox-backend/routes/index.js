var express = require('express');
var router = express.Router();
var controller = require('../controller/conversation');
var authController = require('../controller/authentication');

// Get conversations
router.get('/conversations/:id', controller.getConversationsList);
router.get('/getAllUsers', controller.getAllUsers);
router.get('/getConversationHistory/:id', controller.getConversationHistory);
router.post('/postMessage', controller.postMessage);

// Authentication
router.post('/login', authController.login);
router.post('/register', authController.register);

module.exports = router;
