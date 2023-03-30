const mysql = require('mysql2');

const pool = mysql.createPool({
    // RDS 엔드 포인트
    host:'textrpg-1.c35izomuqkb8.ap-northeast-2.rds.amazonaws.com',
    // RDS 포트 번호
    port:3306 ,
    // RDS 마스터 사용자 이름 
    user:'Huiseong',
    // RDS 비밀번호
    password:'tiger6090',
    // 데이터 베이스 이름 
    database:'TextRpg_back_databse'
});

module.exports = pool ;
