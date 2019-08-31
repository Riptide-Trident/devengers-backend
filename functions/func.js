const {db, admin} =require('./utils/config')

var firebaseConfig = {
  apiKey: "AIzaSyAo_LI6ZiNgg6-c39f0tz3RUG6Ue4gdrlc",
  authDomain: "devengers-699a4.firebaseapp.com",
  databaseURL: "https://devengers-699a4.firebaseio.com",
  projectId: "devengers-699a4",
  storageBucket: "devengers-699a4.appspot.com",
  messagingSenderId: "454086699852",
  appId: "1:454086699852:web:be6df6068201e187"
};
const firebase = require("firebase");
firebase.initializeApp(firebaseConfig);


exports.getEmployees = (req, res) => {
  admin
    .firestore()
    .collection("employees")
    .get()
    .then(data => {
      let employees = [];
      data.forEach(doc => employees.push(doc.data()));
      return res.json(employees);
    })
    .catch(err => console.log(err));
};

exports.enterEmployees = (req, res) => {
  admin
    .firestore()
    .collection("employees")
    .add(req.body)
    .then(doc => {
      const data = req.body;
      data.docId = doc.id;
      res.json(data);
    })
    .catch(err => console.log(err));
};

exports.signup = (req, res) => {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    handle: req.body.handle
  };

  db.doc(`/users/${newUser.handle}`)
    .get()
    .then(doc => {
      if (doc.exists) {
        return res.status(400).json({ handle: "this handle is already taken" });
      } else {
        return firebase
          .auth()
          .createUserWithEmailAndPassword(newUser.email, newUser.password);
      }
    })
    .then(data => {
      userId = data.user.uid;
      return data.user.getIdToken();
    })
    .then(Idtoken => {
      token = Idtoken;
      const userCredentials = {
        user: newUser.handle,
        email: newUser.email,
        createdAt: new Date().toISOString(),
        userId: userId
      };
      return db.doc(`/users/${newUser.handle}`).set(userCredentials);
    })
    .then(() => {
      return res.status(201).json({ token });
    })
    .catch(err => {
      if (err.code === "auth/email-already-in-use") {
        return res.status(400).json({ email: "Email already in use" });
      } else {
        console.log(err);
        return res
          .status(500)
          .json({ error: "Something went wrong, please try again" });
      }
    });
};

exports.login = (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password
  };

  firebase
    .auth()
    .signInWithEmailAndPassword(user.email, user.password)
    .then(data => {
      return data.user.getIdToken();
    })
    .then(token => {
      return res.json({ token });
    })
    .catch(err => {
      console.log(err);
      if (err.code === "auth/wrong-password") {
        return res
          .status(403)
          .json({ general: "wrong credentials, try again" });
      } else {
        return res.status(500).json({ error: err.code });
      }
    });
};
