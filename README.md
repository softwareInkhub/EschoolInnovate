# escool.ai Platform

A comprehensive entrepreneurial ecosystem platform empowering Indian innovators through technology-driven learning, project discovery, and collaboration.

## Features

- **Project Marketplace**: Find and join innovative projects or list your own startup ideas
- **Learning Hub**: Access courses from various schools (tech, business, etc.)
- **School Partnership Program**: Educational institutions can join as platform partners
- **User Authentication**: Secure login and registration system 
- **Interactive UI**: Modern, responsive design optimized for all devices
- **Flexible Storage System**: DynamoDB for production with automatic fallback to in-memory storage for development
- **Robust Architecture**: Storage factory pattern for seamless database switching

## Tech Stack

- **Frontend**: React.js with Wouter for routing, TailwindCSS for styling
- **Backend**: Express.js server
- **Database**: 
  - Primary: AWS DynamoDB for production environments
  - Fallback: In-memory storage for development/testing
- **Authentication**: Passport.js with session-based auth
- **State Management**: React Query for server state
- **Design Pattern**: Storage Factory Pattern for flexible data persistence
- **Animations**: Framer Motion, React Parallax Tilt

## Deployment Requirements

### AWS Configuration

The application uses AWS DynamoDB in production environments with the following environment variables:

- `AWS_ACCESS_KEY_ID`: Your AWS access key
- `AWS_SECRET_ACCESS_KEY`: Your AWS secret access key
- `AWS_REGION`: AWS region (defaults to 'us-east-1' if not specified)

> **Note**: These variables are **optional for development environments**. If AWS credentials are not provided, the application will automatically use in-memory storage instead of DynamoDB.

### Server Requirements

- Node.js 18.x or higher
- npm or yarn

## Deployment Instructions

### EC2 Deployment

1. **Clone the repository**:
   ```
   git clone https://github.com/yourusername/escool-ai.git
   cd escool-ai
   ```

2. **Install dependencies**:
   ```
   npm install
   ```

3. **Set environment variables**:
   
   Create a `.env` file in the root directory with the following environment variables:
   
   ```
   # For production (using DynamoDB)
   AWS_ACCESS_KEY_ID=your_access_key_id
   AWS_SECRET_ACCESS_KEY=your_secret_access_key
   AWS_REGION=your_preferred_region  # defaults to us-east-1 if not set
   
   # Recommended for session security in production
   SESSION_SECRET=random_string_for_session_security
   NODE_ENV=production  # enables secure cookies
   ```

   Alternatively, set them directly in your EC2 instance:
   
   ```
   # For production (using DynamoDB)
   export AWS_ACCESS_KEY_ID=your_access_key_id
   export AWS_SECRET_ACCESS_KEY=your_secret_access_key
   export AWS_REGION=your_preferred_region  # defaults to us-east-1 if not set
   
   # Recommended for production environments
   export SESSION_SECRET=random_string_for_session_security
   export NODE_ENV=production  # enables secure cookies
   ```
   
   > **Note**: For local development, you don't need to set AWS credentials at all. The application will automatically use in-memory storage, which is ideal for development and testing.

4. **Build the application**:
   ```
   npm run build
   ```

5. **Start the server**:
   ```
   npm start
   ```

6. **Configure firewall (if needed)**:
   - Make sure port 5000 is open in your EC2 security group

### Additional Deployment Notes

- **EC2 IAM Roles**: If deploying to EC2, you can configure an IAM role for the instance instead of providing explicit credentials
  
- **Database Testing**: Before deploying to production, test the database connection with:
  ```
  npm run check-db-connection
  ```

- **Database Initialization**: The application automatically creates required DynamoDB tables if they don't exist

- **AWS Credentials Configuration**: 
  - The application will automatically detect if AWS credentials are provided
  - If no credentials are found, it will use the AWS SDK default credential provider chain
  - This allows it to work with EC2 instance IAM roles or local AWS profiles

- **IAM Policy Requirements**: Your AWS user needs the following permissions:
  - `dynamodb:CreateTable`
  - `dynamodb:PutItem`
  - `dynamodb:GetItem`
  - `dynamodb:UpdateItem`
  - `dynamodb:DeleteItem`
  - `dynamodb:Query`
  - `dynamodb:Scan`
  - `dynamodb:ListTables`

## Development

### Local Development Setup

To run the application in development mode:

```
npm run dev
```

This starts the development server with hot reloading at http://localhost:5000.

### Storage Architecture

The application uses a Storage Factory Pattern which provides several benefits:

1. **Environment Flexibility**: The application automatically detects the environment and selects the appropriate storage implementation:
   - In production (with AWS credentials): Uses DynamoDB for reliable, scalable storage
   - In development (without AWS credentials): Falls back to in-memory storage

2. **Interface-Driven Design**: All storage operations are defined through a common `IStorage` interface. This ensures:
   - Consistent behavior regardless of storage implementation
   - Easy substitution of storage implementations
   - No code changes needed when switching between environments

3. **Automatic Connection Management**:
   - Tests the connection to DynamoDB at startup
   - Logs detailed error information when connection fails
   - Gracefully falls back to in-memory storage without application failure

4. **Simplified Local Development**:
   - No need to set up AWS credentials for local development
   - No dependency on external services during development
   - Faster development cycles with in-memory storage

## Maintenance

### Database Structure

The application uses the following DynamoDB tables:

- `escool_users`: User information and authentication details
- `escool_projects`: Project/startup listings
- `escool_roles`: Roles available in projects
- `escool_team_members`: Members associated with projects
- `escool_applications`: Applications to join projects
- `escool_schools`: Educational institution information
- `escool_courses`: Course offerings from schools
- `escool_modules`: Course modules
- `escool_lessons`: Individual lessons within modules
- `escool_instructors`: Information about course instructors
- `escool_sessions`: Session management for authentication

## License

[Include your license information here]