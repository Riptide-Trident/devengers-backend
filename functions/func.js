const {db, admin} =require('./utils/config')
const axios = require('axios')


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
  // axios.post("https://ussouthcentral.services.azureml.net/workspaces/1ec1299709704598b8f1fa5ee183d500/services/cc31135f26f348fba25ecc25664dd9ec/execute?api-version=2.0&details=true", {
  //   "Inputs": {
  //     "input1": {
  //       "ColumnNames": [
  //         "Age",
  //         "treatment",
  //         "AZ",
  //         "CA",
  //         "CO",
  //         "CT",
  //         "DC",
  //         "FL",
  //         "GA",
  //         "IA",
  //         "ID",
  //         "IL",
  //         "IN",
  //         "KS",
  //         "KY",
  //         "LA",
  //         "MA",
  //         "MD",
  //         "ME",
  //         "MI",
  //         "MN",
  //         "MO",
  //         "MS",
  //         "NC",
  //         "NE",
  //         "NH",
  //         "NJ",
  //         "NM",
  //         "NV",
  //         "NY",
  //         "OH",
  //         "OK",
  //         "OR",
  //         "PA",
  //         "RI",
  //         "SC",
  //         "SD",
  //         "TN",
  //         "TX",
  //         "UT",
  //         "VA",
  //         "VT",
  //         "WA",
  //         "WI",
  //         "WV",
  //         "WY",
  //         "Often",
  //         "Rarely",
  //         "Sometimes",
  //         "Agender",
  //         "Androgyne",
  //         "Cis Female",
  //         "Cis Male",
  //         "Cis Man",
  //         "Enby",
  //         "F",
  //         "Female (cis)",
  //         "Female (trans)",
  //         "Genderqueer",
  //         "M",
  //         "Male-ish",
  //         "Malr",
  //         "Man",
  //         "Nah",
  //         "Neuter",
  //         "Trans woman",
  //         "Trans-female",
  //         "cis male",
  //         "cis-female/femme",
  //         "femail",
  //         "fluid",
  //         "male leaning androgynous",
  //         "msle",
  //         "non-binary",
  //         "ostensibly male, unsure what that really means",
  //         "p",
  //         "queer",
  //         "Austria",
  //         "Bahamas, The",
  //         "Belgium",
  //         "Bosnia and Herzegovina",
  //         "Brazil",
  //         "Bulgaria",
  //         "Canada",
  //         "China",
  //         "Colombia",
  //         "Costa Rica",
  //         "Croatia",
  //         "Czech Republic",
  //         "Denmark",
  //         "Finland",
  //         "France",
  //         "Georgia",
  //         "Germany",
  //         "Greece",
  //         "Hungary",
  //         "India",
  //         "Ireland",
  //         "Israel",
  //         "Italy",
  //         "Japan",
  //         "Latvia",
  //         "Mexico",
  //         "Moldova",
  //         "Netherlands",
  //         "New Zealand",
  //         "Nigeria",
  //         "Norway",
  //         "Philippines",
  //         "Poland",
  //         "Portugal",
  //         "Romania",
  //         "Russia",
  //         "Singapore",
  //         "Slovenia",
  //         "South Africa",
  //         "Spain",
  //         "Sweden",
  //         "Switzerland",
  //         "Thailand",
  //         "United Kingdom",
  //         "United States",
  //         "Uruguay",
  //         "Zimbabwe",
  //         "Yes",
  //         "Yes (2)",
  //         "Yes (3)",
  //         "Yes (4)",
  //         "100-500",
  //         "26-100",
  //         "500-1000",
  //         "6-25",
  //         "More than 1000",
  //         "No",
  //         "Yes (5)",
  //         "No (2)",
  //         "Yes (6)",
  //         "No (3)",
  //         "Yes (7)",
  //         "No (4)",
  //         "Yes (8)",
  //         "Some of them",
  //         "Yes (9)",
  //         "No (5)",
  //         "Yes (10)",
  //         "No (6)",
  //         "Yes (11)",
  //         "No (7)",
  //         "Yes (12)",
  //         "Yes (13)"
  //       ],
  //       "Values": [
  //         [
  //           "0",
  //           "0",
  //           "1",
  //           "0",
  //           "0",
  //           "1",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "1",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "1",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "1",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "1",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "1",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "1",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "1",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0"
  //         ],
  //         [
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "1",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "1",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "1",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "1",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "1",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "1",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0",
  //           "0"
  //         ]
  //       ]
  //     }
  //   },
  //   "GlobalParameters": {}
  // }).then(res=>{
  //   console.log(res.data.Results.output1.value.treatment)
  // })
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
