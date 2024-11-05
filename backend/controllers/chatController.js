const { GoogleGenerativeAI } = require('@google/generative-ai');
const Chat = require('../models/Chat');
//var num = 1;
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
//console.log(process.env.API_KEY);
//console.log("Chat trigger");

const generateChatTitle = async (message) => {
  //console.log(message);
  try {
    if (!message) {
      throw new Error("Message is undefined or empty");
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const chatSession = model.startChat({
      history: [
        {
          role: 'user',
          parts: [{ text: "give title for message in one line (in any case give only title of oneline nothing else) - what is java."}], // Ensure message is a string
        },
        {
          role: 'model',
          parts: [{ text: "Lets learn Java"}], // Ensure message is a string
        },
        {
          role: 'user',
          parts: [{ text: "give title for message in one line(in any case give only title of oneline nothing else)- Hello"}], // Ensure message is a string
        },
        {
          role: 'model',
          parts: [{ text: "Hello"}], // Ensure message is a string
        },
        {
          role: 'user',
          parts: [{ text: "give title for message in one line(in any case give only title of oneline nothing else)- tell me story of dragaon."}], // Ensure message is a string
        },
        {
          role: 'model',
          parts: [{ text: "Dragon story"}], // Ensure message is a string
        },
        {
          role: 'user',
          parts: [{ text: "give title for message in one line(in any case give only title of oneline nothing else)-"+ message}], // Ensure message is a string
        },
      ],
      generationConfig: {
        maxOutputTokens: 6, // Keep the title short
      },
    });

    const result = await chatSession.sendMessage("give title for message in one line" +message);
    const response = await result.response;

    if (!response || !response.text) {
      throw new Error("Failed to get a valid response from AI");
    }

    const title = response.text();
    //console.log("Title -> " + title);

    return title;
  } catch (err) {
    console.error('Failed to generate chat title:', err.message);
    return message ? message.toString().substring(0, 20) : "Untitled"; // Fallback to a trimmed version if AI fails
  }
};

exports.getChatHistory = async (req, res) => {
  console.log("getChatHistory");
  try {
    const chat = await Chat.findOne({ user: req.user.id }).populate('user', ['name']);
    if (!chat) {
      return res.status(404).json({ msg: 'No chat history found' });
    }
    res.json(chat);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.addMessage = async (req, res) => {
  const { message, chatId } = req.body;
  //console.log("hello msg: " + num++);
  try {
    let chat;

    if (!chatId) {
      // No chatId provided, generate title with AI and create a new chat
      const title = await generateChatTitle(message)|| "New Chat";
      console.log("hello mtf: " + title);
      chat = new Chat({
        user: req.user.id,
        title,
        messages: [{ sender: 'user', message }],
      });
      await chat.save();
    } else {
      // Find the chat document by chatId
      chat = await Chat.findOne({ _id: chatId, user: req.user.id });

      if (!chat) {
        return res.status(404).json({ msg: 'Chat not found' });
      }

      // Add the user message to the chat
      chat.messages.push({ sender: 'user', message });
    }

    // Generate AI response
    const chatHistory = chat.messages.map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'model',
      parts: [{ text: msg.message }],
    }));

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const chatSession = model.startChat({
      history: [...chatHistory, {
        role: 'user',
        parts: [{ text: message }],
      }],
      generationConfig: {
        maxOutputTokens: 7000,
      },
    });

    const result = await chatSession.sendMessage(message);
    const response = await result.response;
    const botMessage = await response.text();

    // Add AI response to the chat
    chat.messages.push({ sender: 'model', message: botMessage });

    // Save the updated chat document
    await chat.save();

    res.json(chat);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

/* Delete a chat
exports.deleteChat = async (req, res) => {
  try {
    console.log( "all chat deleted");
    await Chat.deleteMany({ user: req.user.id }); // Delete all chats
    res.json({ message: 'All chats deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};*/

// Delete a specific chat by ID
exports.deleteChatById = async (req, res) => {
  try {
    //console.log("invoked");
    const chatId = req.params.chatId;
    const result = await Chat.findByIdAndDelete(chatId);
    if (!result) {
      return res.status(404).json({ message: 'Chat not found' });
    }
    res.json({ message: 'Chat deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Create a new chat
exports.createChat = async (req, res) => {
  var { title } = req.body;
  title = await generateChatTitle(title) || "New Chat";
  console.log(title);

  try {
    const newChat = new Chat({
      user: req.user.id,
      title,
      messages: [],
    });

    const chat = await newChat.save();
    res.status(201).json(chat);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get all chats for a user
exports.getAllChats = async (req, res) => {
  try {
    const chats = await Chat.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(chats);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get a specific chat by ID
exports.getChatById = async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.chatId);
    if (!chat) {
      return res.status(404).json({ msg: 'Chat not found' });
    }

    // Ensure the chat belongs to the logged-in user
    if (chat.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    res.json(chat);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
