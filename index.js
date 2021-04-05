const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient;
const cors =require('cors');
const bodyParser = require('body-parser');
require('dotenv').config()
const port = process.env.PORT ||5055;
 app.use(cors());
 app.use(bodyParser.json())
 app.use = bodyParser.urlencoded({ extended: false })

app.get('/', (req, res) => {
  res.send('Hello World!')
})


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.taqt5.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const productCollection = client.db("fashionPark").collection("products");
   app.post('/addProduct',(req, res) => {
       const newProduct =req.body;
        productCollection.insertOne(newProduct)
        .then(result => {
            res.send(result.insertedCount>0)
        })
   })
   
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})