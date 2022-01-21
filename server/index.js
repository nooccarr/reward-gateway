const bodyParser = require('body-parser');

const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

app.get('*', (req, res) => {
  res.send('404 Page Not Found');
});

app.listen(PORT, () => console.log(`Listening at port ${PORT}`));