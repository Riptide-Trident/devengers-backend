const functions = require("firebase-functions");
const { db, admin } = require("./utils/config");

const func = require("./func.js");
const FBAuth = require("./utils/FBauth");

const express = require("express");
const app = express();

app.post("/employee1", (req, res) => {
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
});
app.post("/employee", func.enterEmployees);
app.post("/signup", func.signup);
app.post("/login", func.login);
app.post("/age", (req,res)=>{
    db.doc("stats/age").get().then(doc=>{
        return res.json(doc.data())
    })
})
app.post("/family", (req,res)=>{
    db.doc("stats/family").get().then(doc=>{
        return res.json(doc.data())
    })
})
app.post("/figures", (req,res)=>{
    db.doc("stats/figures").get().then(doc=>{
        return res.json(doc.data())
    })
})
app.post("/gender", (req,res)=>{
    db.doc("stats/gender").get().then(doc=>{
        return res.json(doc.data())
    })
})
app.post("/work", (req,res)=>{
    db.doc("stats/work").get().then(doc=>{
        return res.json(doc.data())
    })
})

exports.api = functions.https.onRequest(app);

exports.createStats = functions.firestore
  .document("/employees/{id}")
  .onCreate(snapshot => {
    let data = {};
    let yes = 0;
    let no = 0;
    let total = 0;
    data[snapshot.id] = snapshot.data().treatment;
    return db
      .collection("stats")
      .doc("treatment")
      .update(data)
      .then(() => {
        db.collection("stats")
          .doc("treatment")
          .get()
          .then(doc => {
            console.log(doc.data());
            Object.keys(doc.data()).forEach(a => {
              let ab = doc.data();
              if (ab[a] !== true) no++;
              else yes++;
            });
            total = yes + no;
          })
          .then(() => {
            let data = {
              yes: yes,
              no: no,
              total: total
            };
            db.collection("stats")
              .doc("figures")
              .update(data);
          });
      })
      .then(() => {
        let m = 0;
        let f = 0;
        let other = 0;
        db.collection("employees")
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              if (doc.data().gender === "M" && doc.data().treatment===true) m++;
              else if (doc.data().gender === "F" && doc.data().treatment===true) f++;
              else if(doc.data().treatment===true) other++;
            });
          })
          .then(() => {
            db.doc("stats/gender").update({
              male: m,
              female: f,
              others: other
            });
          });
      })
      .then(() => {
        let a1 = 0;
        let b1 = 0;
        let c1 = 0;
        let d1 = 0;
        let e1 = 0;
        db.collection("employees")
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              let a = Number(doc.data().age);
              console.log(a);
              if (a >= 20 && a < 25 && doc.data().treatment===true) a1++;
              else if (a >= 25 && a < 30 && doc.data().treatment===true) b1++;
              else if (a >= 30 && a < 35 && doc.data().treatment===true) c1++;
              else if (a >= 35 && a < 40 && doc.data().treatment===true) d1++;
              else if(doc.data().treatment===true) e1++;
            });
          })
          .then(() => {
            console.log({
              25: a1,
              30: b1,
              35: c1,
              40: d1,
              rest: e1
            });
            db.doc("stats/age").update({
              25: a1,
              30: b1,
              35: c1,
              40: d1,
              rest: e1
            });
          });
      })
      .then(()=>{
          let yes=0;
          let no=0;
        db.collection("employees")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            if(doc.data().family_history===true) yes++;
            else no++;
          });
        })
        .then(()=>{
            db.doc('stats/family').update({yes:yes, no:no})
        })
      })
      .then(()=>{
        let yes=0;
        let no=0;
      db.collection("employees")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          if(doc.data().work_interfere===true) yes++;
          else no++;
        });
      })
      .then(()=>{
          db.doc('stats/work').update({yes:yes, no:no})
      })
    })
  });
