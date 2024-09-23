# Let’s Insight

**Tech Stack**: ReactJS, CSS, Redux, GSAP, NodeJS, OAuth, JWT, MongoDB, ChartJS, Zod, BcryptJS

## Table of Contents
- [Project Description](#project-description)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)

## Project Description
**Let’s Insight** is a full-stack application that allows users to visualize their data using interactive charts. The platform leverages Chart.js to offer real-time data visualization and analysis, enhancing user interaction with data. 

The application is built with modern technologies like **ReactJS**, **NodeJS**, and **MongoDB**, and provides secure user authentication through **Google OAuth**. JWT-based session management and **BcryptJS** for password encryption ensure that user data is protected. 

## Features
- **User Authentication**: Seamless sign-in with **Google OAuth**.
- **Data Visualization**: Interactive charts using **Chart.js**.
- **Secure Data Storage**: Stores user data securely in **MongoDB**.
- **JWT-Based Sessions**: Secure token-based session management.
- **Real-time Animations**: Smooth, dynamic page transitions and animations powered by **GSAP**.
- **Form Validation**: Input validation using **Zod**.
  
## Tech Stack

### Frontend:
- **ReactJS**: Component-based UI library for building user interfaces.
- **Redux**: State management for handling complex data flows.
- **GSAP**: For smooth animations and transitions.
- **CSS**: Styling for responsive design and layout.
- **ChartJS**: Used for creating dynamic, responsive charts.

### Backend:
- **NodeJS**: Server-side environment for running the application.
- **ExpressJS**: Web framework for handling routes and API requests.
- **MongoDB**: NoSQL database for efficient data storage.
- **OAuth**: Google OAuth for authentication.
- **JWT**: Token-based authentication for secure session management.
- **BcryptJS**: For hashing and securing passwords.

### Other Libraries:
- **Zod**: Schema validation for form inputs.
- **BcryptJS**: For password hashing.

## Installation

### Prerequisites:
- **Node.js** and **npm** installed on your system.
- **MongoDB** instance or cluster set up.

### Steps:
1. Clone the repository:
   ```bash
   git https://github.com/rkishanCodes/Lets-Insight.git
   cd Lets-Insight
   ```

2. Install dependencies for both frontend and backend:
   ```bash
   cd frontend
   npm install

   cd ../backend
   npm install
   ```

3. Create a `.env` file in the `backend` directory with the following environment variables:
   ```bash
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   ```

4. Start the backend server:
   ```bash
   cd backend
   npm start
   ```

5. Start the frontend:
   ```bash
   cd frontend
   npm run dev
   ```


## Usage
1. **Sign In**: Log in using your Google account via OAuth.
2. **Visualize Data**: Upload your data to generate charts in real-time.
3. **Interactivity**: Use the interactive controls to explore various data visualization options.



## Contributing
1. Fork the repository.
2. Create a new branch with your feature or bug fix:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Added feature X"
   ```
4. Push to your branch:
   ```bash
   git push origin feature-name
   ```
5. Create a pull request.




