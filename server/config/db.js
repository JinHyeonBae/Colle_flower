import mysql from 'mysql';

export const connection = mysql.createConnection({
    host : 'localhost',
    user : 'jj',
    password : '1234',
    database : 'colleFlower'
})
//create user jj할 때 identified with mysql_native_password로 진행해야함

connection.connect();

connection.query('show databases', (err, rows, fields)=>{
    if(err) throw err;
    console.log("row is", rows);
    console.log("fields is", fields);
})

