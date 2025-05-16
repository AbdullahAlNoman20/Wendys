const express = require('express');
const mysql = require('mysql')
const cors = require('cors')
const port = process.env.PORT || 5000;
const app = express()


require('dotenv').config();

// JWT
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE' ], 
  credentials: true,
}));
app.use(cookieParser());
app.use(express.json())

// Custom Middleware
// const logger = (req, res, next) =>{
//   console.log('Called', req.host, req.originalUrl)
//   next()
// }

const verifyToken = (req,res,next) =>{
  const token = req.cookies?.token;
  // console.log('Token Value', token)
  if(!token){
    return res.status(401).send({message: 'Not authorized'})
  }
  jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,decoded) =>{
    // error
    if(err){
      return res.status(401).send({message: 'Unauthorized'})
    }
    // When Token is Valid
    console.log('Value in the Token',decoded)
    req.person = decoded 
    next()
  })
  
}


// Create Connection with the Database
const db = mysql.createConnection({
    host: "localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: "template"
})

// console.log(process.env.DB_USER)
// console.log(process.env.DB_PASS)

// Check the DB Perfectly connect or not
db.connect((error)=>{
    if (error){
        console.error("No Connection with DB " + error.stack)
    }
    else{
        console.log("Successfully Connect with sql DB")
    }
})

// Auth Related Work
app.post('/jwt', async(req,res)=>{
  const person = req.body;
  console.log(person)
  // Create Token
  const token = jwt.sign(person , process.env.ACCESS_TOKEN_SECRET,{expiresIn:'1d'})

  res
  .cookie('token', token,{
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict'
  })
  .send({success: true })
})

// Data Related Work
app.get('/',(req,res)=>{
    return res.json("Server is running")
})


// Auth Related Work
app.post('/jwt', async(req,res)=>{
  const person = req.body;
  console.log(person)
  // Create Token
  const token = jwt.sign(person , process.env.ACCESS_TOKEN_SECRET,{expiresIn:'1d'})

  res
  .cookie('token', token,{
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict'
  })
  .send({success: true })
})

// Show All User Info
app.get("/register_user",(req,res)=>{
   const sql = "SELECT * FROM register_user";
   db.query(sql,(err,data)=>{
    if(err){
        console.error("error " + err.stack)
        return res.json("Error occurs: beep beep")
    }
    return res.json(data)
   })
})

// Show All developers Info
app.get("/developers",(req,res)=>{
   const sql = "SELECT * FROM developers";
   db.query(sql,(err,data)=>{
    if(err){
        console.error("error " + err.stack)
        return res.json("Error occurs: beep beep")
    }
    return res.json(data)
   })
})
// Show All products Info
app.get("/products",(req,res)=>{
   const sql = "SELECT * FROM products";
   db.query(sql,(err,data)=>{
    if(err){
        console.error("error " + err.stack)
        return res.json("Error occurs: beep beep")
    }
    return res.json(data)
    console.log('tok tok token',req.cookies.token)
   })
})

// Specific developers
app.get('/developers_details/:id',(req,res)=>{
    const id = req.params.id;
    const query = 'SELECT * FROM developers WHERE id = ?';
    db.query(query, [id], (err, result) => {
     if(err){
        console.error('Error fetching package:', err);
        res.status(500).send('Error fetching package');
    }
     else {
        res.json(result[0]);
      }
    })
 })
 
// Specific products
app.get('/product_details/:p_id',(req,res)=>{
    const id = req.params.p_id;
    const query = 'SELECT * FROM products WHERE p_id = ?';
    db.query(query, [id], (err, result) => {
     if(err){
        console.error('Error fetching package:', err);
        res.status(500).send('Error fetching package');
    }
     else {
        res.json(result[0]);
      }
    })
 })



// Post Data In DB
app.post('/order_info', (req, res) => {
  const order = req.body;
  const name = req.body.name;
  const date = req.body.date;
  const email = req.body.email;
  const price = req.body.price;
  const p_id = req.body.p_id; // Product ID
  const photo = req.body.photo; // Product Photo

  console.log(order);

  db.query(
      "INSERT INTO order_info (name, date, email, price, p_id, photo) VALUES (?, ?, ?, ?, ?, ?)", 
      [name, date, email, price, p_id, photo], 
      (err, result) => {
          if (err) {
              console.error("Error inserting into the database: ", err);
              res.status(500).send(err); 
          } else {
            res.send({ insertedId: result.insertId }); 
          }
      }
  );
});

// Get Orders by User Email
app.get('/order_info/:email', verifyToken, (req, res) => {
  const email = req.params.email;

  db.query(
      "SELECT * FROM order_info WHERE email = ?", [email], 
      (err, result) => {
          if (err) {
              console.error("Error fetching orders from database:", err);
              res.status(500).send(err);
          } else {

            // if(req.query.email !== req.person.email){
            //   return res.status(403).send({Message: 'Unauthorized'})
            // }
           
              res.send(result);
              // console.log('This is our Access Token : ',req.cookies.token)
              console.log('Verified Person', req.person)
            
              
          }
      }
  );
});


// Post Data In DB
app.post('/package', async(req,res)=>{

    const newPackage = req.body
        const placeName =  req.body.placeName
        const description = req.body.description
        
    console.log(newPackage)

      db.query ("INSERT INTO package (placeName,description) VALUES(?,?)",[placeName,description]),
        (err,result)=>{
            if(result){
                res.send(result)
            }
            else{
                res.send(err)
            }
        }
})


// Delete Single Order
app.delete('/order_info/:id', (req, res) => {
    const id = req.params.id;
  
    const query = 'DELETE FROM order_info WHERE id = ?';
    db.query(query, [id], (err, result) => {
      if (err) {
        console.error('Error deleting data:', err);
        res.status(500).send('Error deleting data');
      } else {
        if (result.affectedRows > 0) {
          res.json({ success: true, message: `Deleted entry with ID: ${id}`, deletedCount: result.affectedRows });
        } else {
          res.json({ success: false, message: 'No rows deleted' });
        }
      }
    });
  });

// Delete Single Data
app.delete('/delete_package/:id', (req, result) => {
    const id = req.params.id;
  
    const query = 'DELETE FROM package WHERE id = ?';
    db.query(query, [id], (err, result) => {
      if (err) {
        console.error('Error deleting data:', err);
        res.status(500).send('Error deleting data');
      } else {
        res.send(`Deleted entry with ID: ${id}`);
      }
    });
  });

// Update Packages
app.get('/update_package/:id',(req,res)=>{
    const id = req.params.id;
    const query = 'SELECT * FROM package WHERE id = ?';
    db.query(query, [id], (err, result) => {
     if(err){
        console.error('Error fetching package:', err);
        res.status(500).send('Error fetching package');
    }
     else {
        res.json(result[0]);
      }
    })
 })

app.put('/updated_package/:id',async(req, res) => {
    const id = req.params.id;
    const updatedPackage = req.body;
    console.log(updatedPackage)
    const { placeName, description } = req.body;
  
    const query = 'UPDATE package SET placeName = ?, description = ? WHERE id = ?';
    db.query(query, [placeName, description, id], (err, result) => {
      if (err) {
        console.error('Error updating data:', err);
        res.status(500).send('Error updating data');
      } 
      if (result.affectedRows === 0) {
        // No rows updated, possibly because the package ID doesn't exist
        return res.status(404).json({ error: 'Package not found' });
      }
      else {
        res.send(`Updated entry with ID: ${id}`);
      }
    });
  });




app.listen(5000,()=>{
    console.log(`Server in running on port ${port}`)
})