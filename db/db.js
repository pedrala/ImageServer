const mysql = require('mysql');    

//node.js 환경에서 user, password 를 환경변수로부터 가져와서 쓰는 법
//http://afrobambacar.github.io/2017/03/proccess-env-of-nodejs.html
//https://www.npmjs.com/package/getenv

const client = mysql.createPool({
    connectionLimit : 30,
    host: process.env.IMG_HOST,
    database: process.env.IMG_DATABASE,
    port: process.env.IMG_PORT,
    user: process.env.IMG_USER,
    password: process.env.IMG_PASSWORD
});

client.getConnection(function(err){
    if(err) throw err;
    console.log('connected!');
});

module.exports = client;
