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
app.use(cors());
app.use(express.json());

const url = 'mongodb+srv://swapnilryadav168:DXnfliTyurc7Zmmn@sms29dec24.mmqcn.mongodb.net/?retryWrites=true&w=majority&appName=sms29dec24';
const client = new MongoClient(url);
const db = client.db('sms29dec24');
const coll = db.collection('student');

app.post('/save', async (req, res) => {
  try {
    const doc = { _id: req.body.rno, name: req.body.name, marks: req.body.marks };
    const result = await coll.insertOne(doc);
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});

app.get('/gs', async (req, res) => {
  try {
    const result = await coll.find({}).toArray();
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});

app.delete('/ds', async (req, res) => {
  try {
    const doc = { _id: req.body.rno };
    const result = await coll.deleteOne(doc);
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});

app.put('/us', async (req, res) => {
  try {
    const filter = { _id: req.body.rno };
    const update = { $set: { name: req.body.name, marks: req.body.marks } };
    const result = await coll.findOneAndUpdate(filter, update);
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});

app.listen(9000, () => console.log('Server running on port 9000'));
