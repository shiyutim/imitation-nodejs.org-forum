const express = require('express')
const app = express()
const router = require('./router')
const bodyParser = require('body-parser')
const path = require('path')
const port = 3000
const session = require('express-session')

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}))



app.use('/public', express.static(path.join(__dirname, './public/')))
app.use('/node_modules', express.static(path.join(__dirname, './node_modules/')))

app.engine('html', require('express-art-template'))
app.set('views', path.join(__dirname, './views'))  // 默认就是views目录


// 解析 application/json
app.use(bodyParser.json()); 
// 解析 application/x-www-form-urlencoded
app.use(bodyParser.urlencoded());


app.use(router)

app.use( (req, res) => {
    res.render('404.html')
})
app.listen(port, () => console.log('now you kan listening to localhost:3000'))

