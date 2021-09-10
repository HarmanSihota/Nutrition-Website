if(process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const path = require("path");
var mysql = require("mysql");

const app = express();
const PORT = process.env.PORT || 3001;

// var connection = mysql.createConnection({
//    user     : "nutrition_app",
//    password : "password",
//    database: "nutrition_app_users"
// });
 
// connection.connect(function(err) {
//   if (err) {
//     console.error('error connecting: ' + err.stack);
//     return;
//   }
 
//   console.log('connected as id ' + connection.threadId);
// });

const pool = mysql.createPool({
  user     : "nutrition_app",
  password : "password",
  database: "nutrition_app_users"
});

// pool.query("SELECT a, b, c FROM test WHERE b=2", function (error, results, fields) {
//   if (error) throw error;
//   console.log("The results are: ", results[0]);
// });


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
    console.log("jwt check success")
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

    pool.query("INSERT INTO users (username, password) VALUES(?,?)", [req.body.username, hashedPassword], function(error, results, fields) {
      if(error) throw error;
      console.log(results);
      res.status(201).send("User created");
    });

  } catch(error) {
      console.log(error);
      res.status(500).end();
    }
  });

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


// function checkAuthenticated(req, res, next) {
//   // if(req.body){
//   //   if(req.body.path === "/login") {
//   //     console.log("on login");
//   //     const authHeader = req.headers.cookie;
//   //     const token = authHeader && authHeader.split(' ')[1];
//   //     if(token == null) return next();
    
//   //     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//   //       if(err) return next();
//   //       req.user = user;
//   //       return res.redirect("/");
//   //     });
//   //   }
//   // }

//   if(req.path !== "/login"){
//     console.log("not on login");

//     const authHeader = req.headers.cookie;
//     const token = authHeader && authHeader.split(' ')[1];
//     if(token == null) {
//       console.log("no token");
//       return res.redirect(301, "/login");
//     }

//     console.log("token is present");

//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//       if(err) return res.redirect(301, "/login");
//       req.user = user;
//       console.log("made it all the way");
//       return next();
//     });
//   } else {
//     next();
//   }
//  }

// function checkNotAuthenticated(req, res, next) {
//     const authHeader = req.headers.cookie;
//     const token = authHeader && authHeader.split(' ')[1];
//     if(token == null) return next();

//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//       if(err) return next();
//       return res.redirect("/")
//     });
// }