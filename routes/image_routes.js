const express = require('express');
const client = require('../db/db.js');     
const controller =  require('../controllers/upload.js');

module.exports = function(app) {
   //route to upload single image (mainnet)
   app.post('/upload-mainnet/upload-single-image',controller.upload.single('icon'),controller.uploadSingleImage);
   //route to upload single image (testnnet)
   app.post('/upload-testnet/upload-single-image',controller.upload.single('icon'),controller.uploadSingleImage);
   //route to upload single image (action-mainnet)
   app.post('/upload-action-main/upload-single-image',controller.upload.single('icon'),controller.uploadSingleImage);
   //route to upload single image (action-testnnet)
   app.post('/upload-action-test/upload-single-image',controller.upload.single('icon'),controller.uploadSingleImage);
   //route to upload single image (dev)
   app.post('/upload-dev/upload-single-image',controller.upload.single('icon'),controller.uploadSingleImage);
};
