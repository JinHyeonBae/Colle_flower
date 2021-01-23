import mysql from 'mysql2';

export const connection = mysql.createConnection({
    host : 'localhost',
    port : '3001',
    user : 'jj',
    password : '1234',
    database : 'colleflower'
})
//create user jj할 때 identified with mysql_native_password로 진행해야함
//myql2 쓰니까 안 뜨네요

connection.connect();

connection.query('show databases', (err, rows, fields)=>{
    if(err) throw err;
    console.log("row is", rows);
})


