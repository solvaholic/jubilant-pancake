const express = require('express');
const router = express.Router();
const neo4j = require('neo4j-driver');

const driver = neo4j.driver(
  process.env.NEO4J_URI,
  neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD)
);

const session = driver.session();

// Create a node
router.post('/nodes', async (req, res) => {
  const { label, properties } = req.body;
  try {
    const result = await session.run(
      `CREATE (n:${label} $properties) RETURN n`,
      { properties }
    );
    res.status(201).json(result.records[0].get('n'));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Read a node
router.get('/nodes/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await session.run(
      `MATCH (n) WHERE id(n) = $id RETURN n`,
      { id: parseInt(id) }
    );
    res.status(200).json(result.records[0].get('n'));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a node
router.put('/nodes/:id', async (req, res) => {
  const { id } = req.params;
  const { properties } = req.body;
  try {
    const result = await session.run(
      `MATCH (n) WHERE id(n) = $id SET n += $properties RETURN n`,
      { id: parseInt(id), properties }
    );
    res.status(200).json(result.records[0].get('n'));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a node
router.delete('/nodes/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await session.run(
      `MATCH (n) WHERE id(n) = $id DELETE n`,
      { id: parseInt(id) }
    );
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create an edge
router.post('/edges', async (req, res) => {
  const { source, target, type, properties } = req.body;
  try {
    const result = await session.run(
      `MATCH (a), (b) WHERE id(a) = $source AND id(b) = $target CREATE (a)-[r:${type} $properties]->(b) RETURN r`,
      { source: parseInt(source), target: parseInt(target), properties }
    );
    res.status(201).json(result.records[0].get('r'));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Read an edge
router.get('/edges/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await session.run(
      `MATCH ()-[r]->() WHERE id(r) = $id RETURN r`,
      { id: parseInt(id) }
    );
    res.status(200).json(result.records[0].get('r'));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update an edge
router.put('/edges/:id', async (req, res) => {
  const { id } = req.params;
  const { properties } = req.body;
  try {
    const result = await session.run(
      `MATCH ()-[r]->() WHERE id(r) = $id SET r += $properties RETURN r`,
      { id: parseInt(id), properties }
    );
    res.status(200).json(result.records[0].get('r'));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete an edge
router.delete('/edges/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await session.run(
      `MATCH ()-[r]->() WHERE id(r) = $id DELETE r`,
      { id: parseInt(id) }
    );
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
