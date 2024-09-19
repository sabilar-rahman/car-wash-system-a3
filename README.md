# car-wash-system-a3

[Server Live Link](https://car-washing-system-a3.vercel.app/)

## Description

This Car wash booking system project is a comprehensive booking management system that allows users to create, view, and manage their bookings. It offers real-time slot availability checks, role-based access control, and secure password management, making it ideal for managing appointments or service bookings efficiently.

## Features

### 1. **Authentication & Role-Based Access**

- Users authenticate using secure JWT tokens, and the system differentiates access based on user roles (Admin or User).

### 2. **Dynamic Role-Specific Authorization**

- Admins can manage services, slots, and bookings, while users are limited to interacting with their own bookings and available services.

### 3. **Efficient Booking Management**

- Users can seamlessly create, view, and manage bookings, with real-time availability checks to prevent overbooking.

### 4. **Service & Slot Management**

- Admins have full control over service and slot creation, deletion, and status updates, with instant visibility of slot availability for users.

### 5. **Real-Time Slot Availability Check**

- The system ensures real-time slot verification during the booking process to avoid conflicts and ensure up-to-date availability.

### 6. **Secure Password Hashing**

- User passwords are securely hashed and stored, adhering to best security practices for sensitive data protection.

## Technologies Used

- **Backend**: Node.js, Express,TypeScript
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Token)
- **Validation**: Zod
- **Password Security**: bcrypt

## Prerequisites

- [Node.js](https://nodejs.org/en/) (version 18.x or above)
- [npm](https://www.npmjs.com/) (Node package manager)
- [Express.Js](https://expressjs.com/) (Node.js framework)
- [Mongoose](https://mongoosejs.com/) (Object Data Modeling for node.js)
- [TypeScript](https://www.typescriptlang.org/) (Object Data Modeling for node.js)

## Getting Started Locally Setup.

### Installation

1. **Clone the repository:**

   ```sh
   git clone  https://github.com/sabilar-rahman/car-wash-system-a3.git

   cd your-repo-name
   ```

2. **Install dependencies:**
   ```sh
   npm install or npm i
   ```

### Configuration

1. **Environment Variables:**
   Create a `.env` file in the root of the project and add the following variables:
   ```env
   NODE_ENV= development
   PORT=5000
   DB_URL=your-database-url from mongodb
   BCRYPT_SALT_ROUNDS=12
   JWT_ACCESS_SECRET=your_jwt_access_secret
   JWT_ACCESS_EXPIRES_IN=1h
   ```

### Running the Application Locally

1. **Start the server:**

```sh
 npm run start:dev
```

## API Endpoints

### Authentication

| Method | Endpoint           | Description             |
| ------ | ------------------ | ----------------------- |
| POST   | `/api/auth/signup` | Register a new user     |
| POST   | `/api/auth/login`  | Log in an existing user |

### Bookings

| Method | Endpoint           | Description                          |
| ------ | ------------------ | ------------------------------------ |
| POST   | `/api/bookings`    | Create a new booking (User Only)     |
| GET    | `/api/my-bookings` | Retrieve bookings of the logged user |
| GET    | `/api/bookings`    | Retrieve all bookings (Admin Only)   |

### Services

| Method | Endpoint            | Description                                       |
| ------ | ------------------- | ------------------------------------------------- |
| POST   | `/api/services`     | Create a new car wash service (Admin Only)        |
| GET    | `/api/services/:id` | Retrieve details of a specific service            |
| GET    | `/api/services`     | Retrieve a list of all available services         |
| PUT    | `/api/services/:id` | Update details of a specific service (Admin Only) |
| DELETE | `/api/services/:id` | Delete a specific service (Admin Only)            |

### Slots

| Method | Endpoint                  | Description                                               |
| ------ | ------------------------- | --------------------------------------------------------- |
| POST   | `/api/services/slots`     | Create a new service slot (Admin Only)                    |
| GET    | `/api/slots/:id`          | Retrieve details of a specific service slot               |
| GET    | `/api/slots/availability` | Check availability of all service slots                   |
| GET    | `/api/slots`              | Retrieve a list of all service slots (Admin Only)         |
| PUT    | `/api/slots/:id`          | Update the status of a specific service slot (Admin Only) |
