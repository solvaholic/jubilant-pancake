import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const GraphEditor = () => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  const addNode = () => {
    const newNode = { id: uuidv4(), label: 'New Node' };
    setNodes([...nodes, newNode]);
  };

  const editNode = (id, newLabel) => {
    setNodes(nodes.map(node => (node.id === id ? { ...node, label: newLabel } : node)));
  };

  const deleteNode = (id) => {
    setNodes(nodes.filter(node => node.id !== id));
    setEdges(edges.filter(edge => edge.source !== id && edge.target !== id));
  };

  const addEdge = (source, target) => {
    const newEdge = { id: uuidv4(), source, target };
    setEdges([...edges, newEdge]);
  };

  const deleteEdge = (id) => {
    setEdges(edges.filter(edge => edge.id !== id));
  };

  return (
    <div>
      <button onClick={addNode}>Add Node</button>
      <div>
        {nodes.map(node => (
          <div key={node.id}>
            <input
              type="text"
              value={node.label}
              onChange={(e) => editNode(node.id, e.target.value)}
            />
            <button onClick={() => deleteNode(node.id)}>Delete Node</button>
          </div>
        ))}
      </div>
      <div>
        {edges.map(edge => (
          <div key={edge.id}>
            <span>{`Edge from ${edge.source} to ${edge.target}`}</span>
            <button onClick={() => deleteEdge(edge.id)}>Delete Edge</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GraphEditor;
