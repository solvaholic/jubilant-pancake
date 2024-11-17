const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const graphRoutes = require('./routes/graph');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

app.use('/api/graph', graphRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
