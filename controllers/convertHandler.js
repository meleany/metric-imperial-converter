/*
*
*
*       Complete the handler logic below
*       
*       
*/

function ConvertHandler() {
  const arrUnits = ['gal', 'l', 'lbs', 'kg', 'mi', 'km'];
  const arrUnitsFull = ["gallons", "liters", "pounds", "kilograms", "miles", "kilometers"];
  const arrConvUnits = ['l', 'gal', 'kg', 'lbs', 'km', 'mi'];

  this.getNum = function(input) {
    var split_input = input.split(/([a-zA-Z]+)/).filter(Boolean);
    var split_number = split_input[0].split(/[\/]{1}/);
    var numVal = split_input[0];
    var num;
    
    switch(split_number.length) {
      case 1:
          isNaN(numVal) ? num = 1 : num = numVal;
        break;
      case 2:
          numVal = split_number[0]/split_number[1];
          isNaN(numVal) ? num = 'error' : num = numVal;
        break;
      default:
          num = "error";
        break;
    }

    return num;
  };
  
  this.getUnit = function(input) {
    var split_input = input.toLowerCase();
    split_input = split_input.split(/([a-zA-Z]+)/).filter(Boolean);
    input = input.split(/([a-zA-Z]+)/).filter(Boolean);
    var index, unit;    
    arrUnits.includes(split_input[split_input.length-1]) ? unit = input[split_input.length-1] : unit="error";
    return unit;
  };
  
  this.getReturnUnit = function(initUnit) {
    initUnit = initUnit.toLowerCase();
    var index = arrUnits.indexOf(initUnit);
    return arrConvUnits[index];
  };

  this.spellOutUnit = function(initUnit) {
    initUnit = initUnit.toLowerCase();
    var index = arrUnits.indexOf(initUnit);
    if(index > -1) {
      return arrUnitsFull[index];
    } else{
      return initUnit;
    }
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    var result;
    
    initUnit = initUnit.toLowerCase();
    
    switch(initUnit) {
      case "gal":
          result = initNum * galToL;    
        break;
      case "l":
          result = initNum / galToL;
        break;
      case "lbs":
          result = initNum * lbsToKg;
        break;
      case "kg":
          result = initNum / lbsToKg;
        break;
      case "mi":
          result = initNum * miToKm;
        break;
      case "km":
          result = initNum / miToKm;
        break;
    }
    return Number(result.toFixed(5)); 
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    initUnit = initUnit.toLowerCase();
    var index = arrUnits.indexOf(initUnit);
    var initUnitFull = arrUnitsFull[index]; 
    var index2 = arrUnits.indexOf(returnUnit);
    var returnUnitFull = arrUnitsFull[index2];
    var result;
    return initNum + " " + initUnitFull + " converts to " + returnNum + " " + returnUnitFull;
  };
  
}

module.exports = ConvertHandler;