const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {
  getChatHistory,
  addMessage,
  //deleteChat,
  deleteChatById,
  getAllChats,
  createChat,
  getChatById
} = require('../controllers/chatController');

// Routes
router.get('/', auth, getAllChats); // Get all chats
router.post('/', auth, createChat); // Create new chat
router.get('/:chatId', auth, getChatById); // Get chat by ID
router.get('/history', auth, getChatHistory); // Get chat history
router.post('/addMessage', auth, addMessage); // Add message
//router.delete('/deleteAll', auth, deleteChat); // Delete all chats
router.delete('/deleteById/:chatId', auth, deleteChatById); // Delete chat by ID

module.exports = router;
