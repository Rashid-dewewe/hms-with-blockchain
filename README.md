# Health Management System (HMS) - Blockchain Project

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)

This project is a Health Management System (HMS) built using React for the frontend and Node.js for the backend, with blockchain integration for secure and decentralized data management. The project leverages `ethers` and `web3` libraries to interact with the blockchain.

## Table of Contents

- [Project Structure](#project-structure)
  - [Frontend](#frontend)
  - [Backend](#backend)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
  - [Building for Production](#building-for-production)
  - [Linting](#linting)
  - [Previewing the Production Build](#previewing-the-production-build)
- [Project Details](#project-details)
  - [Technologies Used](#technologies-used)
  - [File Descriptions](#file-descriptions)
  - [Blockchain Integration](#blockchain-integration)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)
- [Contact](#contact)

## Project Structure

### Frontend

## Project Structure
```sh
.gitignore 
eslint.config.js
index.html
package.json
public/ 
README.md 
src/ 
    App.css
    App.jsx 
    assets/ 
    components/ 
    index.css 
    main.jsx 
vite.config.js
```

#### BACKEND

## For this walkthrough, we'll assume you're using Node.js with Express.

*** A typical Node.js backend project structure might look like this:
```sh
backend/
├── src/
│   ├── controllers/        # Contains logic for handling routes
│   │   ├── authController.js
│   ├── routes/             # Defines API routes
│   │   ├── authRoutes.js
│   ├── models/             # Defines database models (e.g., User)
│   │   ├── userModel.js
│   ├── services/           # Contains business logic (optional)
│   │   ├── authService.js
│   ├── utils/              # Utility functions (e.g., password hashing)
│   │   ├── bcryptUtils.js
│   ├── config/             # Configuration files (e.g., database connection)
│   │   ├── db.js
│   ├── app.js              # Main application file
│   ├── server.js           # Entry point for the server
├── package.json            # Node.js dependencies and scripts
├── .env                    # Environment variables
```
## Getting Started

### Prerequisites

- Node.js 18.18.0
- npm or yarn
- ganache
- Express
- mongodB or mongoDB Compass

### Installation

1. Clone the repository:

```sh
git clone https://github.com/Rashid-dewewe/hms-with-blockchain.git
cd hms-with-blockchain
```

2. install Dependencies
```sh
npm install
```
# or
```sh
yarn install
```
### Running the Application
To start the development server:
```sh
npm run dev
```
# or
```sh
yarn dev
```

The application will be available at http://localhost:3000

### Building for Production
To build the application for production:
```sh
npm run build
```
# or
```sh
yarn build
```
The production-ready files will be in the dist directory.

### Linting
To lint the codebase:
```sh
npm run lint
```
# or
```sh
yarn lint
```
### Previewing the Production Build
To preview the production build:
```sh
npm run preview
```
# or
```sh
yarn preview
```
### Technologies Used

- **React**: For building the user interface.
- **Vite**: For fast development and build tooling.
- **Ethers.js**: For interacting with the Ethereum blockchain.
- **Web3.js**: For additional blockchain interactions.
- **React Router**: For client-side routing.
- **Bootstrap**: For fast and better styling.

### File Descriptions

- **App.jsx**: Main application component.
- **main.jsx**: Entry point for the React application.
- **index.css**: Global CSS styles.


### Blockchain Integration
The project uses ethers and web3 libraries to interact with the blockchain. Ensure you have a blockchain node or provider (e.g., Infura, Alchemy) set up to connect to the Ethereum network.

### Backend and Blockchain Integration

1. Set Up the Backend
a. Choose a Backend Framework
Node.js with Express: A popular choice for building RESTful APIs.

b. Initialize the Project
Create a new directory for your backend.
Initialize a new Node.js project:
```sh
     npm init -y 
```
Install necessary dependencies:
```sh
npm install express body-parser mongoose cors 
```

c. Set Up MongoDB for Data Storage
MongoDB Atlas: A cloud-based MongoDB service.
Local MongoDB: Install MongoDB locally.
i. Connect to MongoDB
Install Mongoose:

```sh
cd backend
npm install mongoose
```
d. Set Up Express Server
start up the server

```sh
cd backend
cd src
node server.js
```

4. Integrate Blockchain

a. Choose a Blockchain Platform

Ethereum: A popular choice for smart contracts.
Hyperledger Fabric: A permissioned blockchain framework.

For this walkthrough, we'll assume you're using Ethereum.

b. Set Up Web3.js
Install Web3.js:
```sh
 npm install web3 
```
c. Compile and deploy Smart Contracts
Write smart contracts in Solidity for managing patient records and interactions.
Compile and deploy the smart contracts using tools like Truffle or Hardhat.
```sh
cd blockchain
truffle compile
truffle migrate --network development
```

5. Secure the Application
JWT Authentication: Use JSON Web Tokens for secure authentication.
Environment Variables: Store sensitive information like API keys and database connection strings in environment variables.

6. Test the Application
Use tools like Postman to test your API endpoints.
Write unit tests for your backend logic.

7. Deploy the Application
Deploy your backend to a cloud service like Heroku, AWS, or Azure.
Deploy your frontend to a static site hosting service like Netlify or Vercel.

This walkthrough provides a high-level overview of the steps involved in setting up the backend and integrating blockchain into your HMS project.
Each step can be expanded with more detailed instructions and code examples as needed.

### Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

### License

This project is licensed under the MIT License. See the LICENSE file for details.

### Acknowledgements

- [Vite](https://vitejs.dev/)
- [React](https://reactjs.org/)
- [Ethers.js](https://docs.ethers.io/v5/)
- [Web3.js](https://web3js.readthedocs.io/)

## Contact
For any questions or inquiries, please contact [shantiabdulrashid@gmail.com].
