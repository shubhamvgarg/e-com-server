const express = require('express');
const cors = require('cors');
const app = express();
const con = require('./db/config');
const Jwt = require('jsonwebtoken')
const keyJwt = 'e-com';
const port = 5000

app.use(express.json())
app.use(cors())

con.connect((err)=>{
    if(!err){
        console.log("Working")
    }
});

// API for getting all products 
app.get('/products/', verifyToken,(req, res) => {
    con.query(`select * from Mobiles `,(e,result)=>{
        if(result.length>0){
            res.send(result)
        }else{
            res.send({result:"No Product(s) Avialable"})
        }  
    })
})

// API for registering new user 
app.post('/register', (req, res) => {
    const data = req.body;
    con.query('INSERT INTO user SET ?',data, (e,result,fields)=>{
        // res.send(req.body);
        if(!e && result){
            const user = req.body;
            const token = Jwt.sign({ user }, keyJwt, { expiresIn: '2h' }); // Replace 'yourSecretKey' with your JWT secret key
      
            res.status(200).json({ user, auth: token }); // Sending user and token as JSON response
          }else{
            e
        }
    })
})

// API for adding new product
app.post('/addproduct', verifyToken,(req, res) => {
    const data = req.body;
    con.query('INSERT INTO Mobiles SET ?',data, (e,result,fields)=>{
        if(!e){
            res.send(result);
        }else{
            e
        }
    })
})

// API for login user in Nodejs using jwtwebtoken for token
app.post('/login', (req, res) => {
    const { email, password } = req.body;
  
    con.query('SELECT * FROM user WHERE email = ? AND password = ?', [email, password], (err, results) => {
      if (err) {
        res.status(500).send('Error querying the database');
        return;
      }
  
      if (results.length === 0) {
        res.status(401).send('Invalid email or password');
      } else {
        const user = results[0];
        const token = Jwt.sign({ user }, keyJwt, { expiresIn: '2h' }); // Replace 'yourSecretKey' with your JWT secret key
  
        res.status(200).json({ user, auth: token }); // Sending user and token as JSON response
      }
    });
  });

  // Deleting single product
  app.delete('/delete/:id',verifyToken,(req,res)=>{
    con.query('DELETE from Mobiles where id='+req.params.id, (err, result)=>{
        if(err) throw err;
        res.send( result);
    })
})

// Getting single product for Update
app.get('/product/:id',verifyToken, (req, res) => {
    con.query(`select * from Mobiles where id = ${req.params.id}`,(e,result)=>{
        if(result.length>0){
            res.send(result)
        }else{
            res.send({result:"No Product Avialable"})
        }  
    })
})

// API for updating product
app.put('/update/:id',verifyToken,(req,res)=>{
    const data = [ req.body.name, req.body.price, req.body.brand , req.params.id];
    con.query("UPDATE Mobiles SET name = ?, price=?,brand=? where id = ?", data, (err,result,fields)=>{
        if(err) err;
        if(result){
        res.send(result)
        }else{
            res.send({result:'Product Update fails'})
        }
    })
})

// API for search 
app.get('/search/:key',verifyToken, (req, res) => {
    let searchTerm = req.params.key
    con.query('SELECT * FROM Mobiles WHERE name LIKE ? OR price LIKE ? OR brand LIKE ?',[`%${searchTerm}%`, `%${searchTerm}%`, `%${searchTerm}%`],(e,result)=>{
        if(result.length>0){
            res.send(result)
        }else{
            res.send({result:"No Product Avialable"})
        }  
    })
})

function verifyToken (req,res,next){
    let token = req.headers.authorization;
    if(token){
        token = token.split(' ')[1];
        
        Jwt.verify(token,keyJwt,(err,valid)=>{
            if(valid) {
                next();}
            else {res.status(401).send({result:'Please send token to verify'})}
        })
    }else{
        res.status(403).send({result:'Please send token to verify'})
    }

}

// con.end();
app.listen(process.env.PORT || port)



