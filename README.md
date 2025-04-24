
[![Live Demo](https://img.shields.io/badge/Live-Demo-green?style=for-the-badge)](https://week-8-capstone-project-and-presentation-k31vin.vercel.app)

# NutriConnect 

NutriConnect is a comprehensive nutrition management application designed specifically for pregnant women, providing personalized meal plans, health tracking, expert communication, and educational resources.

## 🌟 Features

### For Clients (Pregnant Women)
- **Personalized Meal Plans**: Access tailored nutrition plans based on pregnancy stage and health needs
- **Health Monitoring**: Track vital health metrics including weight, blood pressure, and blood sugar
- **Expert Communication**: Direct messaging with certified nutritionists
- **Educational Resources**: Access pregnancy nutrition articles and guides

### For Nutritionists
- **Client Management**: Oversee multiple clients and their nutritional needs
- **Custom Meal Plan Creation**: Design personalized meal plans for each client
- **Health Data Analysis**: Review client vital statistics and progress
- **Direct Communication**: Message clients to provide guidance and support

### For Administrators
- **User Management**: Oversee client and nutritionist accounts
- **Content Management**: Manage educational resources
- **Platform Monitoring**: Track system usage and performance

## 🛠️ Technical Architecture

### Frontend
- **Framework**: React with TypeScript
- **UI Components**: Shadcn UI and Tailwind CSS
- **State Management**: React Context API and React Query
- **Routing**: React Router Dom
- **Data Visualization**: Recharts

### Backend
- **Server**: Express.js
- **API**: RESTful endpoints for all major features
- **Authentication**: JWT-based authentication

## 📊 Data Models

### Users
- Clients (pregnant women)
- Nutritionists
- Administrators

### Meal Plans
- Daily meal schedules
- Nutritional information
- Dietary restrictions

### Vitals Tracking
- Weight
- Blood pressure
- Blood sugar
- Water intake

### Messaging
- Direct communication between clients and nutritionists

### Resources
- Educational articles
- Nutritional guides

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```sh
git clone https://github.com/yourusername/nutriconnect.git
cd nutriconnect
```

2. Install frontend dependencies
```sh
# In the root directory
npm install
```

3. Install backend dependencies
```sh
# Navigate to the backend directory
cd backend
npm install
```

4. Set up environment variables
```sh
# In the backend directory, copy the example .env
cp .env.example .env
```

5. Start the backend server
```sh
# In the backend directory
npm run dev
```

6. Start the frontend development server
```sh
# In the root directory
npm run dev
```

7. Access the application at http://localhost:5173

## 📝 API Documentation

### Authentication Endpoints
- `POST /api/users/register`: Register a new user
- `POST /api/users/login`: Login a user

### User Endpoints
- `GET /api/users`: Get all users
- `GET /api/users/:id`: Get user by ID

### Meal Plan Endpoints
- `GET /api/meal-plans`: Get all meal plans
- `GET /api/meal-plans/user/:userId`: Get user's meal plans
- `GET /api/meal-plans/:id`: Get meal plan by ID
- `POST /api/meal-plans`: Create meal plan
- `PUT /api/meal-plans/:id`: Update meal plan
- `DELETE /api/meal-plans/:id`: Delete meal plan

### Vitals Endpoints
- `GET /api/vitals`: Get all vitals
- `GET /api/vitals/user/:userId`: Get vitals by user ID
- `GET /api/vitals/history/:userId`: Get vitals history
- `POST /api/vitals`: Add vitals

### Resource Endpoints
- `GET /api/resources`: Get all resources
- `GET /api/resources/category/:category`: Get resources by category
- `GET /api/resources/:id`: Get resource by ID

### Messaging Endpoints
- `GET /api/messages`: Get all messages
- `GET /api/messages/user/:userId`: Get messages by user
- `POST /api/messages`: Send message

## 🔒 Authentication

NutriConnect uses JWT (JSON Web Tokens) for authentication. When a user logs in, the server returns a token that should be included in the Authorization header for all subsequent requests.

Example:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 🛣️ Roadmap

- **Integration with wearable devices** for automatic vital tracking
- **Offline mode** for accessing meal plans without internet
- **Multi-language support** for broader accessibility
- **Mobile application** development

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- [Shadcn UI](https://ui.shadcn.com/) for the UI components
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [React Query](https://tanstack.com/query) for data fetching
- [Recharts](https://recharts.org/) for data visualization
