const express = require('express')
const app = express()
const path = require('path')
const User = require('./models/user')
const Invitation = require('./models/publish')
const md5 = require('blueimp-md5')

const router = express.Router()

router.get('/', (req, res) => {
    res.render('index.html', {
        // session的user传递页面里面
        user: req.session.user
    })
})

router.get('/login', (req, res) => {
    res.render('./login.html')
})


router.post('/login', (req, res) => {
    console.log(req.body)
    User.findOne({
        email: req.body.email,
        password: md5(md5(req.body.password))
    }, (err, data) => {
        if (err) {
            return res.status(500).json({
                code: 500,
                message: err.message
            })
        }

        if (!data) {
            return res.status(200).json({
                code: 1,
                message: '邮箱或密码错误'
            })
        } else {
            req.session.user = data
            res.status(200).json({
                code: 0,
                message: '登陆成功'
            })
        }
    })
})

router.get('/register', (req, res) => {
    res.render('./register.html')
})


router.post('/register', (req, res) => {
    console.log(req.body)
    User.findOne({
        $or: [{
                email: req.body.email
            },
            {
                nickname: req.body.nickname
            }
        ]
    }, (err, data) => {
        if (err) {
            return res.status(500).json({
                code: 500,
                message: '服务端错误'
            })
        }
        if (data) {
            return res.status(200).json({
                code: 1,
                message: '已存在'
            })
        }

        req.body.password = md5(md5(req.body.password))

        new User(req.body).save((err, user) => {
            if (err) {
                return res.status(500).json({
                    code: 500,
                    message: '服务端错误'
                })
            }

            // 通过session插件，把通过注册表单获取到的数据user传到session的user里面
            req.session.user = user

            res.status(200).json({
                code: 0,
                message: 'ok'
            })
        })
    })
})

router.get('/logout', (req, res) => {
    req.session.user = null

    res.redirect('/login')
})




router.get('/publish', (req, res) => {
    res.render('./publish.html', {
        user: req.session.user
    })
})

router.post('/publish', (req, res) => {
    console.log(req.body)
    new Invitation(req.body).save((err, data) => {
        if (err) {
            return res.status(500).json({
                code: 500,
                message: '服务端错误'
            })
        }


        res.status(200).json({
            code: 0,
            message: 'ok'
        })
    })

})


router.get('/userPushInfo', (req, res) => {
    Invitation.find({}, (err, data) => {
        if (err) {
            return res.status(500).json({
                code: 500,
                message: '服务端错误'
            })
        }
        res.status(200).json({
            code: 0,
            message: data,
            user: req.session.user
        })
    })
})


router.get('/userInfo', (req, res) => {
    res.render('./userInfo.html', {
        user: req.session.user
    })
})

router.post('/userInfo', (req, res) => {
    console.log(req.body)
    User.findOne({
        email: req.body.email
    }, (err, data) => {
        if (err) {
            return res.status(500).json({
                code: 500,
                message: '服务端错误'
            })
        }
        // res.status(200).json({
        //     code: 0,
        //     message: 'ok'
        // })
        console.log(data)


        new User(req.body).save( (err, user) => {
            if (err) {
                return res.status(500).json({
                    code: 500,
                    message: '服务端错误'
                })
            }


            req.session.user = user

            res.status(200).json({
                code: 0,
                message: '保存成功'
            })
        })



       
    })
})





module.exports = router