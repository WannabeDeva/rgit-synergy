const express = require("express");
const app = express();

app.get("/api",(req,res)=>{
    res.json({fruits: ["apple","orange"] });
});

let port=8081;

app.listen(port,()=>{
    console.log(`APi started on http://localhost:${port}/api`);
})

// note:- for fetching the data from back we will require cors
