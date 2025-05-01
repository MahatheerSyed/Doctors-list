# Apollo 247 Clone - Doctor Listing Application

This is a clone of the Apollo 247 doctor listing page, built with Next.js, MongoDB, and Tailwind CSS.

## Table of Contents

- [Setup and Installation](#setup-and-installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Data Flow](#data-flow)
- [API Endpoints](#api-endpoints)
- [Error Handling](#error-handling)
- [Project Structure](#project-structure)
- [Troubleshooting](#troubleshooting)

## Setup and Installation

1. **Clone the repository**

\`\`\`bash
git clone <repository-url>
cd apollo247-clone
\`\`\`

2. **Install dependencies**

\`\`\`bash
npm install
\`\`\`

3. **Set up MongoDB**

You need a MongoDB database to store the doctor data. You can:
- Use MongoDB Atlas (cloud-hosted)
- Run MongoDB locally

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

\`\`\`
MONGODB_URI=your_mongodb_connection_string
MONGODB_DB=apollo-clone
\`\`\`

Example:
\`\`\`
MONGODB_URI=mongodb+srv://username:password@cluster0.mongodb.net/
MONGODB_DB=apollo-clone
\`\`\`

## Running the Application

1. **Development mode**

\`\`\`bash
npm run dev
\`\`\`

2. **Production build**

\`\`\`bash
npm run build
npm start
\`\`\`

3. **Access the application**

Open your browser and navigate to `http://localhost:3000`

## Data Flow

### 1. Database Initialization

The application uses MongoDB to store doctor data. Here's how data flows:

1. **Database Connection**:
   - The `lib/mongodb.ts` file handles the connection to MongoDB
   - It uses environment variables for the connection string and database name
   - If environment variables are missing, it falls back to default values for development

2. **Seeding the Database**:
   - Visit `/api/seed` in your browser to populate the database with sample doctor data
   - The seed API will add 10 sample doctors to the database
   - If the database already has data, it will only reseed if forced

### 2. Data Fetching

1. **API Request Flow**:
   - The frontend sends requests to `/api/doctors` with query parameters
   - The backend connects to MongoDB and retrieves the data
   - If the database connection fails, the application serves mock data

2. **Frontend Data Handling**:
   - The `doctor-listing.tsx` component fetches and displays the data
   - It handles loading states, errors, and empty results
   - It displays a notification when using mock data

## API Endpoints

### 1. `/api/doctors`

**Purpose**: Fetch doctors with filtering and pagination

**Query Parameters**:
- `page`: Page number (default: 1)
- `limit`: Number of results per page (default: 10)
- `gender`: Filter by gender (male/female)
- `experience`: Filter by years of experience (0-5, 5-10, 10+)
- `availability`: Filter by availability (today, tomorrow, weekend)
- `sortBy`: Sort results (relevance, experience, rating, fee_low, fee_high)
- `locality`: Filter by location
- `search`: Search term for doctor name, qualification, or location

**Response**:
\`\`\`json
{
  "doctors": [...],
  "currentPage": 1,
  "totalPages": 5,
  "totalDoctors": 50,
  "success": true
}
\`\`\`

### 2. `/api/seed`

**Purpose**: Populate the database with sample doctor data

**Response**:
\`\`\`json
{
  "message": "10 doctors successfully added to the database",
  "success": true,
  "count": 10
}
\`\`\`

### 3. `/api/test-db`

**Purpose**: Test the database connection

**Response**:
\`\`\`json
{
  "message": "Database connection successful",
  "success": true
}
\`\`\`

## Error Handling

The application includes robust error handling:

1. **Database Connection Errors**:
   - If the MongoDB connection fails, the application falls back to mock data
   - A yellow notification banner appears to inform users they're viewing demo data

2. **API Error Handling**:
   - All API endpoints include try/catch blocks
   - Errors are logged to the console and returned with appropriate status codes
   - The frontend displays user-friendly error messages

3. **Fallback Mechanisms**:
   - Mock data is provided when the database is unavailable
   - Default values are used for missing environment variables

## Project Structure

\`\`\`
apollo247-clone/
├── app/                  # Next.js App Router
│   ├── api/              # API routes
│   │   ├── doctors/      # Doctor listing API
│   │   ├── seed/         # Database seeding API
│   │   └── test-db/      # Database connection test API
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/           # React components
│   ├── doctor-filters.tsx # Doctor filtering component
│   ├── doctor-listing.tsx # Main doctor listing component
│   └── header.tsx        # Header component
├── lib/                  # Utility functions
│   └── mongodb.ts        # MongoDB connection
├── types/                # TypeScript type definitions
│   └── doctor.ts         # Doctor type definition
├── public/               # Static assets
├── .env.local            # Environment variables (create this)
└── README.md             # Project documentation
\`\`\`

## Troubleshooting

### Common Issues

1. **Database Connection Errors**:
   - **Symptom**: Yellow "Using demo data" banner appears
   - **Solution**: Check your MongoDB connection string in `.env.local`
   - **Verification**: Visit `/api/test-db` to test the connection

2. **No Doctors Displayed**:
   - **Symptom**: "No doctors found" message
   - **Solution**: Seed the database by visiting `/api/seed`
   - **Verification**: Check if data exists in your MongoDB collection

3. **Environment Variable Issues**:
   - **Symptom**: Error about missing environment variables
   - **Solution**: Create or update `.env.local` file with required variables
   - **Note**: Restart the development server after changing environment variables

4. **API Errors**:
   - **Symptom**: Red error message when trying to fetch doctors
   - **Solution**: Check the browser console and server logs for detailed error messages
   - **Verification**: Ensure MongoDB is running and accessible

### Step-by-Step Verification

To verify your setup is working correctly:

1. Start the development server: `npm run dev`
2. Visit `/api/test-db` to check database connection
3. Visit `/api/seed` to populate the database
4. Visit the home page to see the doctor listing

If you encounter any issues, check the console logs for detailed error messages.
\`\`\`

Now, let me guide you step by step on how to run the application and how data flows between the frontend and database:

## Step 1: Set Up Environment Variables

First, create a `.env.local` file in the root directory of your project with the following content:
