# jubilant-pancake

## Application Overview

This application allows users to visually edit and interact with a knowledge graph while enforcing configurable schemas for node and edge types, and relationships. The frontend is built using React.js, the backend is built using Express.js, and the graph data is stored in a neo4j database.

## Features

- Visual interface for editing and interacting with the knowledge graph
- Configurable schemas for node and edge types, and relationships
- CRUD operations for nodes and edges
- Schema enforcement for node and edge types, and relationships

## Setup and Running the Application

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)
- neo4j (v4 or later)

### Frontend Setup

1. Navigate to the `frontend` directory:
   ```sh
   cd frontend
   ```

2. Install the dependencies:
   ```sh
   npm install
   ```

3. Start the frontend development server:
   ```sh
   npm start
   ```

### Backend Setup

1. Navigate to the `backend` directory:
   ```sh
   cd backend
   ```

2. Install the dependencies:
   ```sh
   npm install
   ```

3. Start the backend server:
   ```sh
   npm start
   ```

### Database Setup

1. Install and start the neo4j server. You can download neo4j from the official website or use a hosted service.

2. Configure the connection to the neo4j database by setting the following environment variables in the `backend` directory:
   ```sh
   NEO4J_URI=bolt://localhost:7687
   NEO4J_USER=neo4j
   NEO4J_PASSWORD=password
   ```

3. Initialize the neo4j database by running the initialization script:
   ```sh
   node scripts/init-neo4j.js
   ```

### Running the Application

1. Start the frontend and backend servers as described in the setup sections above.

2. Open your browser and navigate to `http://localhost:3000` to access the application.

## Usage

- Use the visual interface to add, edit, and delete nodes and edges in the knowledge graph.
- The application will enforce the configured schemas for node and edge types, and relationships.
