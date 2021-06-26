const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => res.send("Hello World!"));
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
})
app.get('/products/:id', (req, res) => {
    // handle this request `req.params.id`
  })
  
app.get('/products', (req, res) => {
    // handle this request `req.query.page` and `req.query.pageSize`
  })

app.post('/<path>', (req, res) => {
    console.log('req.body', req.body) // contains incoming data
  })
app.listen(port, () => console.log(`Example app listening on port ${port}!`));