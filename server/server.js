const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const pool = require('./config/db');
const bodyparser = require('body-parser')
app.get('/', (req, res) => {
    res.send('Response Complete')
})
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.listen(PORT, () => {
    console.log(`Server On : http://localhost:${PORT}/`);
})
app.get('/', (res, req) => {
    res.send(`response Complete`);
})

// 서버의 몬스터를 불러오기 
app.get('/api/monster', (req, res) => {
    pool.getConnection((err, conn) => {
        if (err) {
            throw err;
        } else {
            const sql = 'select * from monster';
            conn.query(sql, (err, rows, field) => {
                res.send(rows);
            });
            conn.release();
        }
    })
})

// 서버에서 유저불러오기
app.get('/api/user',(req,res)=>{
    pool.getConnection((err,conn)=>{
        if (err){
            throw err;
        } else {
            const sql = 'select * from user';
            conn.query(sql , (err,rows,field)=>{
                res.send(rows);
            })
            conn.release();
        }
    })
})

// 소버에서 무기데이터 불러오기 
app.get('/api/weapon',(req,res)=>{
    pool.getConnection((err,conn)=>{
        if (err){
            throw err;
        } else {
            const sql = 'select * from weapon';
            conn.query(sql , (err,rows,field)=>{
                res.send(rows);
            })
            conn.release();
        }
    })
})

// 서버에서 방어구 불러오기 
app.get('/api/armour',(req,res)=>{
    pool.getConnection((err,conn)=>{
        if (err){
            throw err;
        } else {
            const sql = 'select * from armour';
            conn.query(sql , (err,rows,field)=>{
                res.send(rows);
            })
            conn.release();
        }
    })
})