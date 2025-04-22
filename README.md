# escool.ai Platform

A comprehensive entrepreneurial ecosystem platform empowering Indian innovators through technology-driven learning, project discovery, and collaboration.

## Features

- **Project Marketplace**: Find and join innovative projects or list your own startup ideas
- **Learning Hub**: Access courses from various schools (tech, business, etc.)
- **School Partnership Program**: Educational institutions can join as platform partners
- **User Authentication**: Secure login and registration system 
- **Interactive UI**: Modern, responsive design optimized for all devices
- **DynamoDB Integration**: Reliable AWS-powered data storage

## Tech Stack

- **Frontend**: React.js with Wouter for routing, TailwindCSS for styling
- **Backend**: Express.js server
- **Database**: AWS DynamoDB
- **Authentication**: Passport.js with session-based auth
- **State Management**: React Query for server state
- **Animations**: Framer Motion, React Parallax Tilt

## Deployment Requirements

### AWS Configuration

The application uses AWS DynamoDB and requires the following environment variables:

- `AWS_ACCESS_KEY_ID`: Your AWS access key
- `AWS_SECRET_ACCESS_KEY`: Your AWS secret access key
- `AWS_REGION`: AWS region (defaults to 'us-east-1' if not specified)

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
   
   Create a `.env` file in the root directory with the following:
   
   ```
   AWS_ACCESS_KEY_ID=your_access_key_id
   AWS_SECRET_ACCESS_KEY=your_secret_access_key
   AWS_REGION=your_preferred_region
   SESSION_SECRET=random_string_for_session_security
   ```

   Alternatively, set them directly in your EC2 instance:
   
   ```
   export AWS_ACCESS_KEY_ID=your_access_key_id
   export AWS_SECRET_ACCESS_KEY=your_secret_access_key
   export AWS_REGION=your_preferred_region
   export SESSION_SECRET=random_string_for_session_security
   ```

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

### Common Deployment Issues

- **Region Missing Error**: If you encounter a "region is missing" error, ensure you've set the `AWS_REGION` environment variable. The application now defaults to 'us-east-1' if not specified.
  
- **AWS Credentials**: Ensure your AWS credentials have permissions to create and access DynamoDB tables.

- **IAM Policy Requirements**: Your AWS user needs the following permissions:
  - `dynamodb:CreateTable`
  - `dynamodb:PutItem`
  - `dynamodb:GetItem`
  - `dynamodb:UpdateItem`
  - `dynamodb:DeleteItem`
  - `dynamodb:Query`
  - `dynamodb:Scan`

## Development

To run the application in development mode:

```
npm run dev
```

This starts the development server with hot reloading at http://localhost:5000.

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