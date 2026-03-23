import app from "./app.js"

app.listen(process.env.PORT, ()=>{
     console.log(`server is runninng in port:${process.env.PORT}`)
});