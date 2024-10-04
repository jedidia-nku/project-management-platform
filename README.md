# Project Management Platform - Proof of Concept (POC)

## Overview

This project is a **Project Management Platform** designed to manage user accounts, organizations, and projects efficiently. It serves as a proof of concept (POC) to demonstrate how various functionalities such as user management, role-based access control, and activity tracking can be implemented in a project management context.

## Features

- **User Accounts:** Users can sign up and belong to multiple organizations.
- **Organizations:** An organization admin can create and manage organizations, and add users to them.
- **Role-Based Access Control:** Different roles such as Admin, Editor, Viewer, and Data-Entry can be assigned to users.
- **Project Management:** Users can create, update, and delete projects within the organizations they belong to.
- **Activity Tracking:** Logs who created, updated, or modified a project, along with the date, time, and role of the user at that moment.

## Technology Stack

- **Frontend:**
  - React.js
  - TypeScript

- **Backend:**
  - Node.js
  - Express.js

- **Database:**
  - MongoDB

## Getting Started

Follow the instructions below to set up and run the project on your local machine.

### Prerequisites

- Node.js (version 14 or later)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/project-management-platform.git
    cd project-management-platform
    ```

2. Install dependencies for both the frontend and backend:

    ```bash
    # Install backend dependencies
    cd backend
    npm install
    
    # Install frontend dependencies
    cd ../frontend
    npm install
    ```

3. Create a `.env` file in the `backend` directory with the following content:

    ```plaintext
    MONGO_URI=<your_mongo_database_uri>
    PORT=5000
    JWT_SECRET=<your_jwt_secret_key>
    ```

### Running the Application

1. Start the backend server:

    ```bash
    cd backend
    npm start
    ```

2. Start the frontend development server:

    ```bash
    cd ../frontend
    npm start
    ```

3. Open your browser and navigate to `http://localhost:3000` to view the application.

### Project Structure

```plaintext
project-management-platform/
├── backend/               # Backend code (Node.js + Express)
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── controllers/       # Business logic
│   ├── middlewares/       # Middleware functions
│   └── server.js          # Entry point for the backend server
├── frontend/              # Frontend code (React.js + TypeScript)
│   ├── src/
│   │   ├── components/    # Reusable React components
│   │   ├── layouts/       # Application pages
│   │   ├── pages/         # API calls and services
│   │   ├── App.tsx        # Main App component
│   │   └── index.css      # CSS of the Application
│   │   └── main.tsx 
└── README.md              # Project documentation
```

## Future Enhancements

- Implement more advanced permission handling.
- Integrate notifications and alerts for project activities.
- Add support for additional project management features such as task assignments and deadlines.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with detailed information about the changes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any questions or feedback, feel free to reach out:

- Email: [jedidia.nk@gmail.com](mailto:jedidia.nk@gmail.com)
- LinkedIn: [Nkunzumwami Jedidia](https://www.linkedin.com/in/nkunzumwami-jedidia-a35b56258)


