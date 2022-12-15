const multer = require('multer');
const path = require('path');
const client = require('../db/db.js');
const fs = require('fs');

// storage images to folders

let multerStorage = multer.diskStorage({
        destination: (req, file, cb) => {
                let req_route_path = req.route.path;
                console.log("req_route_path:"+req_route_path);
                if (req_route_path.includes("mainnet-name")) {
                        cb(null, './images/mainnet/name');
                }
                else if (req_route_path.includes("mainnet-action")) {
                        cb(null, './images/mainnet/action');
                }
                else if (req_route_path.includes("testnet-name")) {
                        cb(null, './images/testnet/name')
                }
                else if (req_route_path.includes("testnet-action")) {
                        cb(null, './images/testnet/action')
                }
                else if (req_route_path.includes("devnet-name")) {
                        cb(null, './images/devnet/name')
                }
                else if (req_route_path.includes("devnet-action")) {
                        cb(null, './images/devnet/action')
                }             
        },

        filename: (req, file, cb) => {
                let upcase_name_0 = file.originalname;
                let upcase_name_1 = upcase_name_0.split(".")[0];
                cb(null, upcase_name_1 + path.extname(file.originalname))
        }
});



const multerFilter = (req, file, cb) => {
        if (!file.originalname.match(/\.(png|PNG|jpg|JPG|jpeg|JPEG|svg|SVG|gif|GIF)$/)) {
                return cb(new Error('Please upload a Image'))
        }
        cb(null, true)
};


exports.upload = multer({
        storage: multerStorage,
        fileFilter: multerFilter
});

// upload single image to database
exports.uploadSingleImage = async (req, res) => {
        const req_route_path = req.route.path;
        if (req_route_path.includes("mainnet-name")) {
                const single_image_path_image = path.resolve("/home/image_server/images/mainnet/name", req.file.filename);
                const read_single_image_path_image = Buffer.from(fs.readFileSync(single_image_path_image));
                let str_name_original = req.file.filename;
                let str_name = str_name_original.split(".")[0];
                let str_symbol = Object.values(req.body)[0];
                let int_action = Number(Object.values(req.body)[1]);
                if (typeof int_action !== "undefined" && int_action >= 0) {
                        const query = "INSERT INTO `logos_mainnet` (name,symbol,action,icon) VALUES (?,?,?,?)";
                        values = [str_name, str_symbol, int_action, read_single_image_path_image];
                        const allquery = await client.query(query, values);
                        res.status(200).json({ 'statusCode': 200, 'status': true, message: 'Image added', 'data': [] });
                        client.release();
                }
                else {
                        res.status(404).send('Not found')
                }
        }

        else if (req_route_path.includes("mainnet-action")) {
                const single_image_path_image = path.resolve("/home/image_server/images/mainnet/action", req.file.filename);
                const read_single_image_path_image = Buffer.from(fs.readFileSync(single_image_path_image));
                let str_name_original = req.file.filename;
                let str_name = str_name_original.split(".")[0];
                let str_symbol = Object.values(req.body)[0];
                let int_action = Number(Object.values(req.body)[1]);
                if (typeof int_action !== "undefined" && int_action >= 0) {
                        const query = "INSERT INTO `logos_mainnet` (name,symbol,action,icon) VALUES (?,?,?,?)";
                        values = [str_name, str_symbol, int_action, read_single_image_path_image];
                        const allquery = await client.query(query, values);
                        res.status(200).json({ 'statusCode': 200, 'status': true, message: 'Image added', 'data': [] });
                        client.release();
                }
                else {
                        res.status(404).send('Not found')
                }
        }

        else if (req_route_path.includes("testnet-name")) {
                const single_image_path_image = path.resolve("/home/image_server/images/testnet/name", req.file.filename);
                const read_single_image_path_image = Buffer.from(fs.readFileSync(single_image_path_image));
                let str_name_original = req.file.filename;
                let str_name = str_name_original.split(".")[0];
                let str_symbol = Object.values(req.body)[0];
                let int_action = Number(Object.values(req.body)[1]);
                if (typeof int_action !== "undefined" && int_action >= 0) {
                        let query = "INSERT INTO `logos_testnet` (name,symbol,action,icon) VALUES (?,?,?,?)";
                        values = [str_name, str_symbol, int_action, read_single_image_path_image];
                        const allquery = await client.query(query, values);
                        res.status(200).json({ 'statusCode': 200, 'status': true, message: 'Image added', 'data': [] });
                        client.release();
                }
                else {
                        res.status(404).send('Not found')
                }
        }

        else if (req_route_path.includes("testnet-action")) {
                const single_image_path_image = path.resolve("/home/image_server/images/testnet/action", req.file.filename);
                const read_single_image_path_image = Buffer.from(fs.readFileSync(single_image_path_image));
                let str_name_original = req.file.filename;
                let str_name = str_name_original.split(".")[0];
                let str_symbol = Object.values(req.body)[0];
                let int_action = Number(Object.values(req.body)[1]);
                if (typeof int_action !== "undefined" && int_action >= 0) {
                        let query = "INSERT INTO `logos_testnet` (name,symbol,action,icon) VALUES (?,?,?,?)";
                        values = [str_name, str_symbol, int_action, read_single_image_path_image];
                        const allquery = await client.query(query, values);
                        res.status(200).json({ 'statusCode': 200, 'status': true, message: 'Image added', 'data': [] });
                        client.release();
                }
                else {
                        res.status(404).send('Not found')
                }
        }

        else if (req_route_path.includes("devnet-name")) {
                const single_image_path_image = path.resolve("/home/image_server/images/devnet/name", req.file.filename);
                const read_single_image_path_image = Buffer.from(fs.readFileSync(single_image_path_image));
                let str_name_original = req.file.filename;
                let str_name = str_name_original.split(".")[0];
                let str_symbol = Object.values(req.body)[0];
                let int_action = Number(Object.values(req.body)[1]);
                if (typeof int_action !== "undefined" && int_action >= 0) {
                        let query = "INSERT INTO `logos_devnet` (name,symbol,action,icon) VALUES (?,?,?,?)";
                        values = [str_name, str_symbol, int_action, read_single_image_path_image];
                        const allquery = await client.query(query, values);
                        res.status(200).json({ 'statusCode': 200, 'status': true, message: 'Image added', 'data': [] });
                        client.release();
                }
                else {
                        res.status(404).send('Not found')
                }
        }

        else if (req_route_path.includes("devnet_action")) {
                const single_image_path_image = path.resolve("/home/image_server/images/devnet/action", req.file.filename);
                const read_single_image_path_image = Buffer.from(fs.readFileSync(single_image_path_image));
                let str_name = Object.values(req.body)[1];
                let str_symbol = Object.values(req.body)[0];
                let int_action = Number(Object.values(req.body)[1]);
                if (typeof int_action !== "undefined" && int_action >= 0) {
                        const query = "INSERT INTO `logos_devnet` (name,symbol,action,icon) VALUES (?,?,?,?)";
                        values = [str_name, str_symbol, int_action, read_single_image_path_image];
                        const allquery = await client.query(query, values);
                        res.status(200).json({ 'statusCode': 200, 'status': true, message: 'Image added', 'data': [] });
                        client.release();
                }
                else {
                        res.status(404).send('Not found')
                }
        }
}



