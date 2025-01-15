# IntelliChat 1.0

IntelliChat is an AI-powered chat application designed to provide a seamless and intelligent conversational experience. The application allows users to register, log in, and engage in natural conversations, with features that facilitate content creation, brainstorming, language translation, and learning support.

## Features

- **User Authentication**: Secure login and registration with JWT-based authentication.
- **Chat Functionality**: Engage in real-time conversations.
- **Natural Language Processing**: Leverage AI for natural conversations.
- **Content Creation**: Generate high-quality content.
- **Question and Answer**: Get accurate responses to queries.
- **Brainstorming**: Foster creativity and idea generation.
- **Language Translation**: Translate text accurately.
- **Learning Support**: Educational assistance and tutoring.
- **User-Friendly Interface**: Intuitive and easy to navigate.

## How to Use

### Login
1. Open the IntelliChat application.
2. Enter your registered email and password.
3. Click the `Login` button.
4. If the credentials are correct, you will be redirected to the chat interface.

### Register
1. Open the IntelliChat application.
2. Click the `Switch to Register` button if you are on the login page.
3. Enter your name, email, and password.
4. Click the `Register` button.
5. Upon successful registration, you will be redirected to the chat interface.

### Chat
1. Once logged in, navigate to the chat interface.
2. Type your message in the input field.
3. Press `Enter` or click the send button to engage in the conversation.

## Technology Stack

### Frontend
- **React**: For building the user interface.
- **Axios**: For making HTTP requests.
- **CSS**: For styling the application, with support for dark and light modes.

### Backend
- **Node.js**: Server-side JavaScript runtime.
- **Express.js**: Web framework for Node.js.
- **Mongoose**: ODM for MongoDB.
- **JWT (JSON Web Tokens)**: For secure user authentication.

### Database
- **MongoDB**: NoSQL database for storing user data and chat history.

## Setup Instructions

### Prerequisites
- **Node.js**: Make sure Node.js is installed on your machine.
- **MongoDB**: Ensure MongoDB is installed and running.

###  Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/ankit2four/IntelliChat.git
   ```
2. after cloning the repository create directory in your computer:
   ```bash
   ../intellichat/
   ```
3. setup react app and node.js server:
   ```bash
   cd intellichat
   npx create-react-app frontend
   mkdir backend
   cd backend
   npm init -y
   npm install express
   ```
4. Your directory should look like this containing some setup file:
   ```bash
    intellichat/
   ├── backend/
   │
   ├── frontend/
   
5. copy all files from backend to your backend directory and frontend to your frontend directory.
6. Install all the dependancies with below command:
   ```bash
   npm install <package_ name>
   ```
7. Create a .env file in the backend directory with the following content:
   ```bash
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   GEMINI_API_KEY=your_gemini_api_key
   ```
8. Setup mongodb and paste your url/string of db to .env file.
9. run your frontend and backend by following command:
   ```bash
   cd frontend
   npm start
   ```
   ```bash
   cd backend
   node server.js
   ```
Note - In frontend all api is fetched on local host. if you are trying to deploy chnage the IP of api.
## Developer Info
  - **Name** - Ankit Singh
  - **Linkedin** - [Ankit Singh](https://www.linkedin.com/in/ankit-singh-638733243/)
  - **Mail** - mail2ankit1234@gmail.com
  - [**Resume**](https://github.com/ankit2four/IntelliChat/blob/main/frontend/src/cvAnkit1.pdf)
   
