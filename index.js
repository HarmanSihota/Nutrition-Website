if(process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const path = require("path");
const mysql = require("mysql");

const app = express();
const PORT = process.env.PORT || 3001;

const pool = mysql.createPool({
  user     : "nutrition_app",
  password : "password",
  database: "nutrition_app_users"
});

let users = [];
let currUser;

app.use(express.static(path.join(__dirname, "client", "build")));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.post("/checkAuth", (req, res) =>{
  const authToken = req.body.token;
  if(authToken == null) { 
    console.log("null token");
    return res.send("no token");
  }

  jwt.verify(authToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if(err) return res.send("token invalid");
    req.user = user;
    return res.send("success");
  });
})

app.post("/login", checkUserExists, async (req, res) => {
  try {
    if(!await bcrypt.compare(req.body.password, currUser.password)) {
       console.log("incorrect password");
       res.send("incorrect password");
    }
    else {
      const accessToken = jwt.sign(currUser, process.env.ACCESS_TOKEN_SECRET);
      console.log("log in success");
      res.json({accessToken: accessToken});
    }
  } catch(error) {
    res.status(500).end();
  }
});

app.post("/register", checkUserDoesNotExist, async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    pool.query("INSERT INTO users (username, password, email) VALUES(?,?,?)", [req.body.username, hashedPassword, req.body.email], function(error, results, fields) {
      if(error) throw error;
      console.log(results);
      res.status(201).send("User created");
    });

    pool.query(`CREATE TABLE ${req.body.username}_nutrition_log( entry_id INT AUTO_INCREMENT, entry_name VARCHAR(100), 
              entry_date DATETIME, entry_calories INT, PRIMARY KEY(entry_id));`, function(error, results, fields) {
      
      if(error) throw error;
      console.log(results);
    });

  } catch(error) {
      console.log(error);
      res.status(500).end();
    }
});

app.post("/mealEntry", (req, res) => {
  pool.query(`INSERT INTO ${req.body.username}_nutrition_log (entry_name, entry_date, entry_calories) VALUES(?,?,?)`, 
            [req.body.entry_name, req.body.entry_date, req.body.entry_calories], function(error, results, fields) {
    
    if(error) throw error;
    res.status(201).send("success");
  });
})

app.post("/mealHistory", getMealHistory, (req, res) => {
  return res.status(200).json(currUser.mealHistory);
})


app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`);
});


function checkUserDoesNotExist(req, res, next) {
  pool.query("SELECT username, password FROM users WHERE username=?", [req.body.username], function (error, results, fields) {
    if (error) throw error;
    if(results.length !== 0) {
      return res.send("Username already exists");
    }
    next();
  });
}

function checkUserExists(req, res, next) {
  pool.query("SELECT username, password FROM users WHERE username=?", [req.body.username], function (error, results, fields) {
    if (error) throw error;
    if(results.length === 0) {
      return res.send("invalid username");
    }    
    currUser = {
      "username": results[0].username,
      "password": results[0].password
    }
    next();
  });
}

async function getMealHistory(req, res, next){
  pool.query(`SELECT entry_name, entry_date, entry_calories from ${currUser.username}_nutrition_log ORDER BY entry_date DESC LIMIT 10`, function(error, results, fields) {
    if(error) throw error;
    console.log(results);
    currUser.mealHistory = results;
    next();
  });
}