
const express = require('express'),
    http = require('http'),
    path = require('path');

const bodyParser = require('body-parser'),
    static = require('serve-static');

let app = express();

app.set('port', precess.env.PORT || 3001);

//body-parser를 사용해 application/x-www-form-urlencoded 파싱
app.use(bodyParser.urlencoded({extended : false}))
//body-parser를 사용해 application/json 파싱
app.use(bodyParser.json())
app.use(static(path.join(__dirname, 'public')))

const server = http.createServer(app);

server.listen(PORT, ()=>{
    console.log(`connect to ${PORT} port!`)
});

