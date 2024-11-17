const neo4j = require('neo4j-driver');

const driver = neo4j.driver(
  process.env.NEO4J_URI,
  neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD)
);

const session = driver.session();

const runQuery = async (query, params) => {
  try {
    const result = await session.run(query, params);
    return result.records;
  } catch (error) {
    console.error('Error running query:', error);
    throw error;
  }
};

const closeConnection = async () => {
  await session.close();
  await driver.close();
};

module.exports = {
  runQuery,
  closeConnection,
};
