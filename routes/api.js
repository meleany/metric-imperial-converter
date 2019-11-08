/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;
var ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  var convertHandler = new ConvertHandler();

  app.route('/api/convert')
    .get(function (req, res){
      var input = req.query.input;
      if(input){        
        input = input.replace(/\s/g, ''); // Stripe the input from any white spaces, they shouldn't stop the app from working.
        var arrLen = input.split(/([a-zA-Z]+)/).filter(Boolean).length;
        if(arrLen < 3){
          var initNum = convertHandler.getNum(input);
          var initUnit = convertHandler.getUnit(input);
          
          if(initNum == "error" && initUnit == "error"){
            res.json({"error": "invalid number and unit"});
          }else{
           if(initUnit == "error" || initNum == "error") {
             if(initUnit == "error"){
               res.json({"error":"invalid unit"});  
             }else{
               res.json({"error":"invalid number"});
             } 
           }else{
             var returnUnit = convertHandler.getReturnUnit(initUnit);
             var returnNum = convertHandler.convert(initNum, initUnit);             
             var toString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
             res.json({initNum: initNum, initUnit: initUnit, returnNum: returnNum, returnUnit: returnUnit, string: toString}); 
           }
          }          
        }else{
          // Several units and/or quantities passed. Only 1 unit and 1 number should be passed for conversion.
          res.json({"error": "invalid number and unit"});          
        }
      }else{
        // No input given.
        res.json({error: "invalid number and unit"});
      }
    });
    
};