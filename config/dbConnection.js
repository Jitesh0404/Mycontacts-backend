const mongoose = require('mongoose')

mongoose.connect("mongodb://127.0.0.1:27017/contacts-backend")
.then(()=>{
    console.log("Connected to db");
}).catch((err)=>{
    console.log("Connection failed to DB",err);
})