# StoryBook

A web application that allows users to create and share public/private stories. Built with Node.js, Express, MongoDB and Google OAuth.

## Features

- Google OAuth Authentication
- Public/Private Stories
- Dashboard with story management
- Rich text editor for story creation/editing
- Mobile responsive design using Materialize CSS
- User profile images
- Story reading time stamps

## Technologies Used

- Node.js/Express
- MongoDB/Mongoose
- Handlebars Templates
- Passport Google OAuth2.0
- Express Sessions
- Materialize CSS
- CKEditor
- Moment.js

## Prerequisites

- Node.js installed
- MongoDB Atlas account
- Google OAuth credentials

## Setup

1. Clone the repository

```sh
git clone https://github.com/yourusername/StoryBook.git
cd StoryBook
```

2. Install dependencies

```sh
npm install
```

3. Create config.env in config folder with:

```
PORT = 3000
MONGO_URI = your_mongodb_uri
GOOGLE_CLIENT_ID = your_google_client_id
GOOGLE_CLIENT_SECRET = your_google_client_secret
```

4. Run the application

```sh
# Development mode
npm run dev

# Production mode
npm start
```

## Project Structure

- `config/` - Configuration files
- `helpers/` - Handlebars helper functions
- `middleware/` - Authentication middleware
- `models/` - MongoDB models
- `public/` - Static files
- `routes/` - Application routes
- `views/` - Handlebars templates

## Available Scripts

- `npm start` - Runs in production mode
- `npm run dev` - Runs in development mode with nodemon

## Author

Aravind Reddy

## License

ISC
