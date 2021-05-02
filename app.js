// 웹 서버 구동파일 express 가져오기
const express = require('express')
// 웹 서버 구동파일을 실행시킴
const app = express();
// 실행시킨 구동파일(서버)를 8000번 포트에서 열어줌
const server = app.listen(8000, a)
// 8000번 포트에서 서버를 연 후 실행할 작업
function a(){
    console.log('server has started.')
}

// html파일을 이용해도 좋지만, 나중을 위해
// a.html를 a.ejs로 변경해보자
// ejs 사용가능하게 하는 명령어
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// DB 이니셜라이징
const mysql = require('mysql2')
const connection = mysql.createPool({
    host: "cnudb.soga.ng",
    user: "cnu",
    password: "r912",
    database: "cnu"
})
// 데이터베이스 시각화
// http://viewcnudb.soga.ng

// 얘도 복붙 
// 얘가 있어야 request.body 읽을 수 있음
app.use(express.urlencoded({ extended: true }))
// 얘가 있어야 json 값을 주고 받을 수 있음
app.use(express.json())

// 얘도 복붙
const cors = require('cors')
app.use(cors())


// 익명 함수
app.use("/registerData", function (request, response) {
    let body = request.body
    // let id = body.id
    let id = body["id"]

    connection.query(`SELECT user_id FROM user WHERE user_id = ?`, [id], function (error, result, field) {
        if (error) {
            console.log(error)
            return;
        }

        if (result.length == 0) {
            response.send("OK")
        } else {
            response.send("existing user!")
        }
    })
})

app.use("/chk-duplicate-id", function (request, response) {
    let body = request.body
    console.log(body)
    // let id = body.id
    let id = body["id"]

    connection.query(`SELECT user_id FROM user WHERE user_id = ?`, [id], function (error, result, field) {
        if (error) {
            console.log(error)
            return;
        }

        if (result.length == 0) {
            response.json({
                msg: "ok"
            })
        } else {
            response.json({
                msg: "no"
            })
        }
    })
})