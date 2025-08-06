# Skill Connect - Backend API

A Node.js backend service for a skill-sharing platform that connects users with experts across various domains. Users can book services from experts, manage bookings, and leave reviews.

## 🚀 Features

- **User Authentication & Authorization**
  - JWT-based authentication
  - Role-based access (User/Expert)
  - Secure token management

- **Service Management**
  - Create and manage service listings
  - Service booking system
  - Status tracking (Pending, In-Progress, Completed, Cancelled)

- **Expert-User Interaction**
  - Expert can accept/decline service requests
  - Users can book services from experts
  - Real-time status updates

- **Review & Rating System**
  - Users can leave reviews for completed services
  - 5-star rating system
  - Expert review management

- **Comprehensive Logging**
  - Service history tracking
  - User activity logs
  - Expert dashboard analytics

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: [Your database - MongoDB/PostgreSQL/MySQL]
- **Authentication**: JWT (JSON Web Tokens)
- **API Client**: Axios
- **Environment**: dotenv

## 📋 Prerequisites

Before running this application, make sure you have:

- Node.js (v14 or higher)
- npm or yarn
- [Your database system]
- Git

## ⚡ Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/Abiral-Karmacharya/Skill-Connect-Node.git
   cd Skill-Connect-Node
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   ```
   Configure your environment variables:
   ```env
   PORT=8000
   DB_CONNECTION_STRING=your_database_url
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRES_IN=7d
   ```

4. **Database Setup**
   ```bash
   # Run your database migrations/setup scripts
   npm run db:setup
   ```

5. **Start the server**
   ```bash
   # Development
   npm run dev

   # Production
   npm start
   ```

The server will start on `http://localhost:8000`

## 📚 API Endpoints

### Authentication
```
POST /auth/register    - Register new user/expert
POST /auth/login       - User login
POST /auth/logout      - User logout
```

### User Management
```
GET  /user/profile     - Get user profile
PUT  /user/profile     - Update user profile
GET  /user/getlogs     - Get user service logs
```

### Service Management
```
POST /services/create           - Create new service
GET  /services                  - Get all services
GET  /services/:id              - Get service by ID
PUT  /services/:id              - Update service
DELETE /services/:id            - Delete service
```

### Booking & Status Management
```
PUT  /user/acceptservice/:id    - Expert accepts service
PUT  /user/declineservice/:id   - Expert declines service
PUT  /user/completeservice/:id  - Mark service as completed
```

### Reviews
```
POST /user/submitreview         - Submit service review
GET  /user/getreviews/:id       - Get reviews for service
```

## 🏗️ Project Structure

```
Skill-Connect-Node/
├── src/
│   ├── controllers/         # Route controllers
│   ├── models/             # Database models
│   ├── routes/             # API routes
│   ├── middleware/         # Custom middleware
│   ├── utils/              # Utility functions
│   └── config/             # Configuration files
├── tests/                  # Test files
├── docs/                   # Documentation
├── .env.example           # Environment variables template
├── package.json           # Project dependencies
└── server.js             # Entry point
```

## 🔐 Authentication Flow

1. **Registration**: Users register as either 'user' or 'expert'
2. **Login**: Receive JWT token upon successful authentication
3. **Protected Routes**: Include `Authorization: Bearer <token>` in headers
4. **Role-based Access**: Different permissions for users and experts

## 📱 User Roles & Permissions

### Users
- Browse and book services
- View booking history
- Leave reviews for completed services
- Cancel pending bookings

### Experts
- Create and manage service listings
- Accept/decline service requests
- Mark services as completed
- View received reviews

## 🔧 Configuration

### Environment Variables
```env
# Server Configuration
PORT=8000
NODE_ENV=development

# Database
DB_CONNECTION_STRING=your_database_connection_string

# JWT Configuration
JWT_SECRET=your_super_secure_jwt_secret
JWT_EXPIRES_IN=7d

# Other configurations
CORS_ORIGIN=http://localhost:3000
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

## 📦 Deployment

### Using PM2 (Production)
```bash
# Install PM2 globally
npm install -g pm2

# Start the application
pm2 start server.js --name "skill-connect-api"

# Monitor
pm2 monit
```

### Using Docker
```bash
# Build image
docker build -t skill-connect-api .

# Run container
docker run -p 8000:8000 -d skill-connect-api
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 API Documentation

For detailed API documentation with request/response examples, visit:
- [Postman Collection](link-to-postman-collection)
- [API Docs](link-to-api-docs)

## 🐛 Known Issues

- [List any known issues or limitations]

## 🔄 Changelog

### v1.0.0
- Initial release
- User authentication system
- Service booking functionality
- Review system
- Expert dashboard

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Abiral Karmacharya**
- GitHub: [@Abiral-Karmacharya](https://github.com/Abiral-Karmacharya)
- Email: [your-email@example.com]

## 🙏 Acknowledgments

- Thanks to all contributors who helped build this platform
- Special thanks to the Node.js and Express.js communities
- [Any other acknowledgments]

---

⭐ If you found this project helpful, please give it a star on GitHub!
