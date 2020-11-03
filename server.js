const express = require('express')
var mongoOps = require('./mongo')
const app = express()
const port = 80
const cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(express.static('public'))
app.use(express.urlencoded());
app.use(express.json());

app.get('/', (req, res) => {
    res.redirect("index.html")
})

app.post('/login',async (req,res)=>{
    console.log(req.body)
    var m = new mongoOps()
    var n = await m.login({'user':req.body['user']}) 
    // console.log(n['pass'],req.body['pass'],(n['pass']==req.body['pass']),(n['pass']===req.body['pass']))
    if (n['pass']===req.body['pass']){
        res.cookie('user',req.body['user'])
        res.redirect('/dashboard')
    }
    else{
        res.send("window.location.href = \"/\";<script>alert(\"Wrong Creds\");  </script>");
    }
})
app.post('/register',async (req,res)=>{
    console.log('data received: ',req.body)
    var m = new mongoOps()
    var n = await m.register(req.body)
    console.log('returned: ',n)
    res.send("<script>alert(window.location.href = \"/\";\"You are Registered\");  </script>");

})
app.get('/dashboard',(req,res)=>{
    res.redirect('dashboard.html')
})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
