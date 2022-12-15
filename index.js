const express = require('express');
const bodyParser = require("body-parser");
const path = require('path');
const app = express();
const router = express.Router();
const mysql = require('mysql');
const multer  = require('multer');
const client = require('./db/db.js');
const port = 13300
const urlencoderParser = bodyParser.urlencoded({extended:true});


// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//absolte path 
app.use('/mainnetName',express.static(path.join(__dirname,'/images/mainnet/name')));
app.use('/mainnetAction',express.static(path.join(__dirname,'/images/mainnet/action')));
app.use('/testnetName',express.static(path.join(__dirname,'/images/testnet/name')));
app.use('/testnetAction',express.static(path.join(__dirname,'/images/testnet/action')));
app.use('/devnetName',express.static(path.join(__dirname,'/images/devnet/name')));
app.use('/devnetAction',express.static(path.join(__dirname,'/images/devnet/action')));

app.get('/', (req, res) => {
    res.send("This is a finlchain image server!!!");    
});
    
//load the routes
require('./routes/image_routes')(app);

//GET (images_mainnet)
app.get('/api-get-mainnet',function(req,res){
    let qry = "select * from logos_mainnet";
    client.query(qry,function(err,rows){
        if(err)
            throw err;
        console.log(rows);
        res.json(rows);
    });
});


//GET (images_testnet)
app.get('/api-get-testnet',function(req,res){
    let qry = "select * from logos_testnet";
    client.query(qry,function(err,rows){
        if(err)
            throw err;
        console.log(rows);
        res.json(rows);
    });
});


//GET (action_images_mainnet)
app.get('/api-get-mainnet-action',function(req,res){
    let qry = "select * from logos_mainnet_action";
    client.query(qry,function(err,rows){
        if(err)
            throw err;
        console.log(rows);
        res.json(rows);
    });
});


//GET (action_images_testnet)
app.get('/api-get-testnet-action',function(req,res){
    let qry = "select * from logos_testnet_action";
    client.query(qry,function(err,rows){
        if(err)
            throw err;
        console.log(rows);
        res.json(rows);
    });
});


//GET (dev)
app.get('/api-get-dev',function(req,res){
    let qry = "select * from logos_dev";
    client.query(qry,function(err,rows){
        if(err)
            throw err;
        console.log(rows);
        res.json(rows);
    });
});



//GET with image name (images_mainnet)
app.get('/api-get-name-mainnet/:name',function(req,res){
    let str_name_get = req.params.name;
    let qry = 'select * from logos_mainnet where name = ?';
    client.query(qry, [str_name_get],function(err,rows){
        if(err)
            throw err;
        res.json(rows[0]);
    });
});


//GET with image name (images_testnet)
app.get('/api-get-name-testnet/:name',function(req,res){
    let str_name_get = req.params.name;
    let qry = 'select * from logos_testnet where name = ?';
    client.query(qry, [str_name_get],function(err,rows){
        if(err)
            throw err;
        res.json(rows[0]);
    });
});


//GET with image name (action_images_mainnet)
app.get('/api-get-name-mainnet-action/:name',function(req,res){
    let str_name_get = req.params.name;
    let qry = 'select * from logos_mainnet_action where name = ?';
    client.query(qry, [str_name_get],function(err,rows){
        if(err)
            throw err;
        res.json(rows[0]);
    });
});


//GET with image name (action_images_testnet)
app.get('/api-get-name-testnet-action/:name',function(req,res){
    let str_name_get = req.params.name;
    let qry = 'select * from logos_testnet_action where name = ?';
    client.query(qry, [str_name_get],function(err,rows){
        if(err)
            throw err;
        res.json(rows[0]);
    });
});


//GET with image name (dev)
app.get('/api-get-name-dev/:name',function(req,res){
    let str_name_get = req.params.name;
    let qry = 'select * from logos_dev where name = ?';
    client.query(qry, [str_name_get],function(err,rows){
        if(err)
            throw err;
        res.json(rows[0]);
    });
});


//PUT with image name (images_mainnet)
app.put('/api-put-name-mainnet/:name',urlencoderParser,function(req,res){
    console.log("num_action:", typeof num_action, num_action);
    let num_action = Number(Object.values(req.body)[1]);
    let str_name_get = req.params.name;
    if (typeof num_action !== 'undefined' && num_action >= 0 ){
    let qry = "update logos_mainnet set symbol='"+req.body.symbol+"', action = '"+num_action+"' where name=?";
    client.query(qry,[str_name_get], function(err,rows){
        if(err)
            throw err;
        console.log("1 Row Updated.");
        res.send("1 Row Updated.")
    });}
    else{
    res.status(404).send('Not found')
    }
});


//PUT with image name (images_testnet)
app.put('/api-put-name-testnet/:name',urlencoderParser,function(req,res){
    let str_name_get = req.params.name;
    let num_action = Number(Object.values(req.body)[1]);
    if (typeof num_action !== 'undefined' && num_action >= 0 ){
    let qry = "update logos_testnet set symbol='"+req.body.symbol+"', action = '"+num_action+"' where name=?";
    client.query(qry,[str_name_get], function(err,rows){
        if(err)
            throw err;
        console.log("1 Row Updated.");
        res.send("1 Row Updated.")
    });}
    else {
    res.status(404).send('Not found')
    }
});


//PUT with image name (action_images_mainnet)
app.put('/api-put-name-mainnet-action/:name',urlencoderParser,function(req,res){
    console.log("num_action:", typeof num_action, num_action);
    let num_action = Number(Object.values(req.body)[1]);
    let str_name_get = req.params.name;
    if (typeof num_action !== 'undefined' && num_action >= 0 ){
    let qry = "update logos_mainnet_action set symbol='"+req.body.symbol+"', action = '"+num_action+"' where name=?";
    client.query(qry,[str_name_get], function(err,rows){
        if(err)
            throw err;
        console.log("1 Row Updated.");
        res.send("1 Row Updated.")
    });}
    else{
    res.status(404).send('Not found')
    }
});


//PUT with image name (action_images_testnet)
app.put('/api-put-name-testnet-action/:name',urlencoderParser,function(req,res){
    let str_name_get = req.params.name;
    let num_action = Number(Object.values(req.body)[1]);
    if (typeof num_action !== 'undefined' && num_action >= 0 ){
    let qry = "update logos_testnet_action set symbol='"+req.body.symbol+"', action = '"+num_action+"' where name=?";
    client.query(qry,[str_name_get], function(err,rows){
        if(err)
            throw err;
        console.log("1 Row Updated.");
        res.send("1 Row Updated.")
    });}
    else {
    res.status(404).send('Not found')
    }
});


//PUT with image name (dev)
app.put('/api-put-name-dev/:name',urlencoderParser,function(req,res){
    let str_name_get = req.params.name;
    let num_action = Number(Object.values(req.body)[1]);
    if (typeof num_action !== 'undefined' && num_action >= 0 ){
    let qry = "update logos_dev set symbol='"+req.body.symbol+"', action = '"+num_action+"' where name=?";
    client.query(qry,[str_name_get], function(err,rows){
        if(err)
            throw err;
        console.log("1 Row Updated.");
        res.send("1 Row Updated.")
    });}
    else {
    res.status(404).send('Not found')
    }
});


//DELETE with image name (images_mainnet)
app.delete('/api-delete-name-mainnet/:name',function(req,res){
    let str_name_delete = req.params.name;
    let qry = "delete from logos_mainnet where name=?";
    client.query(qry,[str_name_delete],function(err,rows){
        if(err)
            throw err;
        console.log("1 Row Removed.");
        res.send("1 Row Removed.")
    });
});


//DELETE with image name (images_testnet)
app.delete('/api-delete-name-testnet/:name',function(req,res){
    let str_name_delete = req.params.name;
    let qry = "delete from logos_testnet where name=?";
    client.query(qry,[str_name_delete],function(err,rows){
        if(err)
            throw err;
        console.log("1 Row Removed.");
        res.send("1 Row Removed.")
    });
});


//DELETE with image name (action_images_mainnet)
app.delete('/api-delete-name-mainnet-action/:name',function(req,res){
    let str_name_delete = req.params.name;
    let qry = "delete from logos_mainnet_action where name=?";
    client.query(qry,[str_name_delete],function(err,rows){
        if(err)
            throw err;
        console.log("1 Row Removed.");
        res.send("1 Row Removed.")
    });
});
    

//DELETE with image name (action_images_testnet)
app.delete('/api-delete-name-testnet-action/:name',function(req,res){
    let str_name_delete = req.params.name;
    let qry = "delete from logos_testnet_action where name=?";
    client.query(qry,[str_name_delete],function(err,rows){
        if(err)
            throw err;
        console.log("1 Row Removed.");
        res.send("1 Row Removed.")
    });
});


//DELETE with image name (dev)
app.delete('/api-delete-name-dev/:name',function(req,res){
    let str_name_delete = req.params.name;
    let qry = "delete from logos_dev where name=?";
    client.query(qry,[str_name_delete],function(err,rows){
        if(err)
            throw err;
        console.log("1 Row Removed.");
        res.send("1 Row Removed.")
    });
});


app.listen(port, () => {
    console.log('mariaDB_PORT:' + process.env.IMG_PORT);    //mariaDB Port
    console.log('Server is running on port ' + port);
})

