# Google and Local  login/logout

### Package

* "bcrypt": "^5.1.0"
* "connect-flash": "^0.1.1"
* "dotenv": "^16.0.3"
* "ejs": "^3.1.9"
* "express": "^4.18.2"
* "express-session": "^1.17.3"
* "mongoose": "^7.0.1"
* "nodemon": "^2.0.21"
*  "passport": "^0.5.3"
* "passport-google-oauth20": "^2.0.0"
* "passport-local": "^1.0.0"



### Head

本登录框架使用passport来实现，网页框架为 express

### Routes

* index.js
* views
  * partials
    * header.ejs
    * message.ejs
    * nav.ejs
  * index.ejs
  * login.ejs
  * post.ejs
  * profile.ejs
  * signup.ejs
* routes
  * auth-route.js
  * profile-route.js
* models
  * user-model.js
  * post-model.js
* config
  * passport.js
* .env



### Home

相关describe



### Google Login

1. 向私服发出google登录请求，通过 Passport 连接到Google登录服务API
2. 用户登录后，说明同意本服务器访问用户在google中的数据，然后查找数据库中是否有该用户的数据，若有，则将该用户数据取出，若没有，则将其账号数据存入服务器的数据库中。
3. 创建 cookie 交给用户本地浏览器，每次用户访问都会对比cookie中的ID来确认是否有权访问网页。
4. 有权访问后，将数据库中的用户数据送到重定向后的 用户页 供用户使用

### Local login

1. 向私服发出login登录请求，将账号密码通过 passport-local 框架来进行本服务器的验证。
2. 通过对用户发送的账号来进行账号密码匹对，密码匹对过程使用bcrypt来实现，确保了用户数据的安全性。
3. 认证通过后，同样制作cookie来保存用户ID，用于后续有权访问服务器。
4. 每次对服务器的访问都会对cookie中的ID进行匹对，匹对成功后将用户数据发送到用户页面进行使用。

### Logout

使用passport中的logout来直接登出。

### New Post

将用户添加的数据写入数据后，然后重定向到profile页面，并将添加的数据一并显示出来。
