const neo4j = require('neo4j-driver');

const driver = neo4j.driver(
  process.env.NEO4J_URI,
  neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD)
);

const session = driver.session();

const initializeDatabase = async () => {
  try {
    await session.run(`
      CREATE CONSTRAINT ON (n:Node) ASSERT n.id IS UNIQUE;
      CREATE CONSTRAINT ON (r:Relationship) ASSERT r.id IS UNIQUE;
    `);
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
  } finally {
    await session.close();
    await driver.close();
  }
};

const startNeo4jServer = async () => {
  try {
    // Add logic to start the neo4j server if needed
    console.log('Neo4j server started successfully');
  } catch (error) {
    console.error('Error starting Neo4j server:', error);
  }
};

initializeDatabase();
startNeo4jServer();
