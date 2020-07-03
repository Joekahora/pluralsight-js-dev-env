import express from "express"
import path from "path"
import open from "open"
import webpack from "webpack"
import config from "../webpack.config.dev"

/* eslint-disable no-console */

const port = 3000;
const app = express();
const compiler = webpack(config)

app.use(require("webpack-dev-middleware")(compiler,{
  noInfo: true,
  publicPath: config.output.publicPath
}))

app.get("/", function (req, res){
  res.sendFile(path.join(__dirname,"../src/index.html"));
})

app.get('/users', (req,res)=>{
  // this is hardcoded for simplicity
  res.json([
    {'id':1,'firstname':'Bob','lastname':'Smith','email':'bob@gmail.com'},
    {'id':2,'firstname':'Tammy','lastname':'Norton','email':'tnorton@gmail.com'},
    {'id':3,'firstname':'Tina','lastname':'Lee','email':'lee.tina@gmail.com'}
  ])
})

app.listen(port, function(err){
  if (err){
    console.log(err)
  }else{
    open("http://localhost:"+port)
  }
})