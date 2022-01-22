const bodyParser = require('body-parser');

const express = require('express');
const compression = require('compression');
const app = express();
const PORT = 3000;

app.use(compression());
app.use(express.json());
app.use(express.static('client/dist'));

app.get('*', (req, res) => {
  res.send('404 Page Not Found');
});

app.listen(PORT, () => console.log(`Listening at port ${PORT}`));