const path = require("path");
const express = require("express")
const mongoose = require("mongoose")
const db = require("./db/db")
const header_middleware = require("./middlewares/header")

const postRouter = require("./Routes/post");
const userRoutes = require("./Routes/user");
const profileRoutes = require("./Routes/profile");

const fs = require("fs");
const https = require("https");




const app = express()

const PORT = process.env.PORT || 5000


app.use(express.json())
app.use(header_middleware)
const directory = path.join(__dirname, './images');
app.use("/images", express.static(directory));
// app.use("/", express.static(path.join(__dirname, 'angular')));

app.use("/api/posts", postRouter)
app.use("/api/user", userRoutes);
app.use("/api/profile", profileRoutes);


app.get('/test', (req, res) => {
  res.send('Hello World!')
})

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "angular", "index.html"))
});

https.createServer({
  cert: fs.readFileSync(process.env.SSL_CERT),
  key: fs.readFileSync(process.env.SSL_KEY)
}, app).listen(PORT, (req, res) => {
  console.log(`app is listening to PORT ${PORT}`)
})