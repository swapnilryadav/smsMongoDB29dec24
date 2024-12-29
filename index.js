// const express =  require('express');
// const cors = require('cors');
// const { MongoClient } = require('mongodb');

// const app = express();
// app.use(cors());
// app.use(express.json());

// app.post('/save',(req,res)=>{
//     const url="mongodb://0.0.0.0:27017";
//     const client =new MongoClient(url);
//     const db =client.db("sms29dec24");
//     const coll = db.collection("student");
//     const doc={"_id":req.body.rno  , "name":req.body.name , "marks":req.body.marks };
//     coll.insertOne(doc)
//     .then(result=>result.send(result))
//     .catch(error=>res.send(error));

// });

// app.get('/gs',(req,res)=>{
//     const url="mongodb://0.0.0.0:27017";
//     const client =new MongoClient(url);
//     const db =client.db("sms29dec24");
//     const coll = db.collection("student");
//     coll.find({}).toArray()
//     .then(result=>result.send(result))
//     .catch(error=>res.send(error));

// });

// app.delete('/ds',(req,res)=>{
//     const url="mongodb://0.0.0.0:27017";
//     const client =new MongoClient(url);
//     const db =client.db("sms29dec24");
//     const coll = db.collection("student");
//     const doc={"_id":req.body.rno };
//     coll.deleteOne(doc)
//     .then(result=>result.send(result))
//     .catch(error=>res.send(error));

// });

// app.put('/us',(req,res)=>{
//     const url="mongodb://0.0.0.0:27017";
//     const client =new MongoClient(url);
//     const db =client.db("sms29dec24");
//     const coll = db.collection("student");
//     const filter={"_id":req.body.rno };
//     const doc ={ "name":req.body.name , "marks":req.body.marks };
//     coll.FindOneAndUpdateOne(filter,{$set:doc})
//     .then(result=>result.send(result))
//     .catch(error=>res.send(error));
// });

// app.listen(9000, () => console.log('Server running on port 9000'));

const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
app.use(cors({
  origin: 'https://smsmongodb29dec24.web.app', // Allow only specific origin to access the server
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
}));
app.use(express.json());

const url = 'mongodb+srv://swapnilryadav168:DXnfliTyurc7Zmmn@sms29dec24.mmqcn.mongodb.net/?retryWrites=true&w=majority&appName=sms29dec24';
const client = new MongoClient(url);

// Wait for the MongoDB client to connect before starting the server
client.connect()
  .then(() => {
    console.log('Connected to MongoDB');

    const db = client.db('sms29dec24');
    const coll = db.collection('student');

    app.post('/save', async (req, res) => {
      try {
        const doc = { _id: req.body.rno, name: req.body.name, marks: req.body.marks };
        const result = await coll.insertOne(doc);
        res.status(201).send(result); // Send status 201 for successful creation
      } catch (error) {
        res.status(500).send({ message: 'Error inserting data', error });
      }
    });

    app.get('/gs', async (req, res) => {
      try {
        const result = await coll.find({}).toArray();
        res.status(200).send(result); // Send status 200 for successful retrieval
      } catch (error) {
        res.status(500).send({ message: 'Error fetching data', error });
      }
    });

    app.delete('/ds', async (req, res) => {
      try {
        const doc = { _id: req.body.rno };
        const result = await coll.deleteOne(doc);
        res.status(200).send(result); // Send status 200 for successful deletion
      } catch (error) {
        res.status(500).send({ message: 'Error deleting data', error });
      }
    });

    app.put('/us', async (req, res) => {
      try {
        const filter = { _id: req.body.rno };
        const update = { $set: { name: req.body.name, marks: req.body.marks } };
        const result = await coll.findOneAndUpdate(filter, update);
        res.status(200).send(result); // Send status 200 for successful update
      } catch (error) {
        res.status(500).send({ message: 'Error updating data', error });
      }
    });

    app.listen(9000, () => console.log('Server running on port 9000'));

  })
  .catch((error) => {
    console.error('Error connecting to MongoDB', error);
    process.exit(1); // Exit the process if MongoDB connection fails
  });
