let bodyParser = require('body-parser');
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));
app.get("/products", (req,res) => {
    const products = [
    {
      id: 1,
      name: "hammer",
    },
    {
      id: 2,
      name: "screwdriver",
    },
    ,
    {
      id: 3,
      name: "wrench",
    },
   ];
  
   res.json(products);
  });

app.use(bodyParser.json({ extended : false }));

app.post('/<path>', (req, res) => {
    console.log('req.body', req.body) // contains incoming data
  })
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
