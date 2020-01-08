# 仿[cnodejs.org](cnodejs.org)论坛官网

### 项目描述

本项目为仿 cnodejs.org 官网，使用 node.js、express、mongoDB，实现了注册、登录、发布主题、修改资料等功能。

### 启动方法

1. 安装依赖包`$ npm install`
2. 开启数据库
   - `$ mongod`
   - `$ mongo`
3. 使用 nodemon 或 node,启动 app.js
   - `$ nodemon app.js` / `node app.js`
4. 在浏览器输入 `localhost:3000` 即可访问项目

### 技术栈

1. node.js
2. express
3. mongoDB
4. art-template
5. bootstrap
6. jquery

### 项目结构

```
│  app.js
│  list.txt
│  package.json
│  README.md
│  router.js
│
├─models
│      publish.js
│      user.js
│
├─public
│  ├─css
│  ├─img
│  │      avatar-default.png
│  │      cnodejs_light.svg
│  │      search.png
│  │      xiala.png
│  │
│  └─js
└─views
        404.html
        footer.html
        header.html
        index.html
        layout.html
        login.html
        publish.html
        register.html
        userInfo.html


```

### 接口文档

| 路径      | 方法 | get 参数 | post 参数               | 是否需要登录 | 备注             |
| --------- | ---- | -------- | ----------------------- | ------------ | ---------------- |
| /         | GET  |          |                         |              | 渲染首页         |
| /register | GET  |          |                         |              | 渲染注册页面     |
| /register | POST |          | email nickname password |              | 处理注册请求     |
| /login    | GET  |          |                         |              | 渲染登录页面     |
| /login    | POST |          | email password          |              | 处理登录请求     |
| /logout   | GET  |          |                         | 是           | 处理退出请求     |
| /publish  | GET  |          |                         | 是           | 渲染发布主题页面 |
| /publish  | POST |          | title content nickname  | 是           | 处理发布主题请求 |
| /userInfo | GET  |          |                         | 是           | 渲染个人资料页面 |
| /userInfo | POET |          | email nickname gender   | 是           | 处理修改资料请求 |
