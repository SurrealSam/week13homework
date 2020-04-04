// Import MySQL connection.
var connection = require("./connection.js");

function printQuestionMarks( num ) {
  var arr = [];
  for (var i = 0; i < num; i++) {
    arr.push("?");
  }
  return arr.toString();
}
 
function objToSQL(ob) {
  var arr = [];

  // loop through the keys and push the key/value as a string int arr
  for (var key in ob) {
    var value = ob[key];
    // check to skip hidden properties
    if (Object.hasOwnProperty.call(ob, key)) {
      // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
      // e.g. {sleepy: true} => ["sleepy=true"]
      arr.push(key + "=" + value);
    }
  }

  // translate array of strings to a single comma-separated string
  return arr.toString();
}


var orm = {
  selectAll: function( tableName, cb ) {
    var queryString = "SELECT * FROM " + tableName + ";";
    connection.query( queryString, function( err, result ) {
      if ( err ) {
        throw err;
      }
      cb( result );
    });
  },

  insertOne: function( tableName, columns, values, cb ) {
    var queryString = "INSERT INTO " + tableName + "(" + columns.toString() + ") VALUES (" + printQuestionMarks( values.length ) + ");";
  console.log(queryString);    

    connection.query( queryString, values, function( err, result ) {
       if ( err ) {
         throw err;
       }
        cb( result );
    });
  },
  updateOne: function( tableName, condition, valueObj, cb ) {
    var queryString = "UPDATE " + tableName + " SET " + objToSQL( valueObj ) + " WHERE " + condition + ";";
    // var queryString = `UPDATE burgers 
    // SET 
    //     eaten = TRUE
    // WHERE
    //     ID = 1;`
    console.log(queryString);

    connection.query(queryString, function( err, result ) {
      if ( err ) {
        throw err;
      }
      cb( result );
    });
  }
}

// var test = function (result) {
//   console.log(result);
// }
// orm.selectAll('burgers', test);

module.exports = orm;
