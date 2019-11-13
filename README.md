# react-authentication

Create a folder which will be the root of your application.
With express generator create an express app called server.

## Backend setup

cd into /server. The dependencies that're necessary are:

- mongoose for connection to a database
- cors for allowing our react application to communicate with our express server.
- express-session for creating sessions
- connect-mongo for storing the the session in a mongo store.

1. Allow DB connection

```
const mongoose = require('mongoose');
mongoose
  .connect("mongodb://localhost:27017/auth-example", { useNewUrlParser: true })
  .then(() => {
    console.log("connected!");
  })
  .catch(err => {
    console.log(err);
  });

```

2. Setup sessions.

```
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
);
```

3. Setup cors

```
const cors = require('cors');
app.use(
  cors({
    origin: [
      "http://localhost:3000",

    ],
    credentials: true
  })
);
```

4. Create a user model in /models/User.js

```
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, unique: true },
  password: { type: String }
});

module.exports = mongoose.model("User", userSchema);
```

5. Setup the API authorisation endpoints

```
const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/register", async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json({ message: "Please provide credentials" });
    return false;
  }

  try {
    //encrpt password
    const newUser = await User.create(req.body);
    // dont send password back
    res.status(200).json(newUser);
  } catch (err) {
    res.status(500).json({ message: "Wops something went terribly awry!" });
  }
});

router.post("/login", async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json({ message: "Please provide credentials" });
    return false;
  }

  try {
    const user = await User.findOne({ username });
    if (user && user.password === password) {
      req.session.user = user;
      res.status(200).json(user);
    } else {
      res
        .status(400)
        .json({ message: "Please provide the correct credentials" });
    }
  } catch (err) {
    res.status(500).json({ message: "Wops something went terribly awry!" });
  }
});

router.get("/logout", (req, res, next) => {
  req.session.destroy();
  res.status(200).json({ message: "User is logged out" });
});

router.get("/isLoggedIn", (req, res, next) => {
  if (req.session.user) {
    res.status(200).json(req.session.user);
  } else {
    res.status(401).json({ message: "Get outta here" });
  }
});

module.exports = router;
```

## Frontend setup

In the root of your project create an react app by running: `npx create-creact-app client`

1. cd into client and download the correct dependencies. You will need:

- axios for making the api calls.
- react-router-dom from routing in the frontend.

2. Create a .env.development file in the root of client and an environment variable, which will be the connection string to your api. Don't forget that the process variable needs to start with REACT_APP

2) Setup folder structure.
   Your /src file should look as follow:

```
/src
    /api
        /authService.js
    /components
    /pages
```

3. Don't forget to setup react-router-dom inside the index.js file.

4. Create access to your api's endpoints in the /authService.js file. They can look like this:

```
import axios from 'axios';

export default class AuthService {
  constructor() {
    this.service = axios.create({
      baseURL: process.env.REACT_APP_BASE_URL,
      withCredentials: true
    });
  }

  login = async payload => {
    const { username, password } = payload;
    const { data } = await this.service.post('/auth/login', {
      username,
      password
    });
    return data;
  };

  register = async payload => {
    const { username, password } = payload;
    const { data } = await this.service.post('/auth/register', {
      username,
      password
    });
    return data;
  };

  isLoggedIn = async () => {
    const { data } = await this.service.get('/auth/isLoggedIn');
    return data;
  };

  logout = async () => {
    const { data } = await this.service.get('/auth/logout');
    return data;
  };
}
```

5. Now allow a user to post and get data from your api. You can see a full working example of my implementation in the branch full-auth. But don't cheat yet and it yourself!

## Extra

Here's an good example of a protected component that you can (re)use.

```
import React from "react";
import { Route, Redirect } from "react-router-dom";

// the private route is a function that will return a Route component or Redirect.
// that expects a component, an user an other props.
// the other props will be set in ...rest (the most important one will be the path definition (the path we see in the browser's navigation))
const protectedRoute = ({ component: Component, user, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        //render is a function that checks if the user is passed a long. If not the private route will redirect to "/"
        if (user) {
          return <Component {...props} {...user} />;
        } else {
          return <Redirect to="/" />;
        }
      }}
    />
  );
};
export default protectedRoute;

```
