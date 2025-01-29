# Personal Network Web Application Template

## Project Status
 **Work in Progress: Project Template / Boilerplate** 

This project is a work-in-progress social media web application template. It provides a foundational structure and basic functionality for a personal network application.

## Current Features (Implemented)
- User Authentication
  - Register
  - Login
  - Logout
- Profile Management
  - View user profile
  - Update profile information
  - Upload profile picture
- Post Functionality
  - Create posts
  - Like posts
  - Comment on posts
- Media Storage
  - Upload images and videos to Firebase
  - Store and retrieve media content

## Planned Features (Not Yet Implemented)
- Friend/Connection System
  - Send friend requests
  - Accept/Reject friend requests
  - Manage friend lists
- Advanced Interaction Features
  - Direct messaging
  - User search functionality
  - Follow/Unfollow mechanism
- Enhanced Profile Features
  - More detailed profile customization
  - Privacy settings

## Project Purpose
This project serves as a template and learning resource for developers looking to build a full-stack social media application using modern web technologies. It provides a solid starting point with basic social networking features that can be extended and customized.

## Technologies Used
### Frontend
- React (v18.3.1)
- React Router (v6.25.1)
- Redux Toolkit (v2.2.6)
- Tailwind CSS
- Material-UI
- Axios
- Firebase Authentication and Storage

### Backend
- Node.js
- Express.js (v4.19.2)
- MongoDB (Mongoose v8.5.1)
- CORS
- dotenv

## Prerequisites
- Node.js (v16+ recommended)
- npm or yarn
- MongoDB Atlas account
- Firebase project

## Installation

### Clone the Repository
```bash
git clone https://github.com/alper-demir/personal-network-with-firebase.git
cd personal-network-with-firebase
```

### Setup Backend
```bash
cd server
npm install
```

Create a `.env` file in the `server` directory with the following variables:
```
PORT=3000
MONGO=your_mongodb_connection_string
DB_USERNAME=your_db_username
DB_PASSWORD=your_db_password
```

### Setup Frontend
```bash
cd ../client
npm install
```

Create a `.env` file in the `client` directory with your Firebase configuration:
```
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
# Add other Firebase config variables
```

## Running the Application

### Start Backend
```bash
cd server
npm start
```

### Start Frontend
```bash
cd client
npm run dev
```

## Contributing
Contributions are welcome! This project is an excellent opportunity for developers to:
- Add new features
- Improve existing functionality
- Learn full-stack development practices

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License
This project is open-source and available under the ISC License.

## Contact
Alper Demir
Project Link: [https://github.com/alper-demir/personal-network-with-firebase](https://github.com/alper-demir/personal-network-with-firebase)

## Disclaimer
This is a template project and should be considered a starting point for building a social network application. Many advanced features are yet to be implemented.
