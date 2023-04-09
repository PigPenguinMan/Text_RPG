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



//회원가입 
app.post('/api/user',(req,res)=>{
    pool.getConnection((err,conn)=>{
        if (err){
            throw err ;
        } else {
            const userSql = 'insert into user (login_id ,name,gender) values (?,?,?)';
            const login_id = req.body.login_id
            const user_name = req.body.user_name;
            const gender = req.body.gender ;
            const userParams = [login_id,user_name,gender];
            conn.query(userSql,userParams,(err,result)=>{
                if(err){
                    throw err ;
                } else {
                    const authSql = 'INSERT INTO user_auth(user_id,login_id,salt,hashed_password,iv) VALUES (?,?,?,?,?)';
                    const user_id =result.insertId;
                    const login_id = req.body.login_id;
                    const salt = req.body.salt;
                    const hashed_password = req.body.hashed_password;
                    const iv = req.body.iv
                    const authParams = [user_id,login_id,salt,hashed_password,iv];
                    conn.query(authSql,authParams,(err,result)=>{
                        if(err){
                            throw err ;
                        } else {
                            res.send(result);
                            console.log('등록 성공');
                        }
                    });
                } 
            });
            conn.release();
        }
    });
});

// 로그인에 사용
app.post('/api/login',(req,res)=>{
    const login_id = req.body.login_id;
    const login_pw = req.body.login_pw;
    pool.getConnection((err,conn)=>{
        if(err){
            throw err ;
        }else {
            const sql = 'SELECT salt,iv,hashed_password FROM user_auth WHERE login_id = ?';
            const params = [login_id];
            conn.query(sql,params,(err,rows,fields)=>{
                if(err){
                    throw err ;
                } else {
                    if(rows.length === 0){
                        res.status(401).send('line 134 ,401오류 자격증명이 유효하지않음,rows === 0')
                    } else {
                        // db에 있는 salt,iv,암호화된 비밀번호 불러오기
                        const salt = rows[0].salt;
                        const iv = rows[0].iv;
                        const hashed_password = rows[0].hashed_password;
                        // 암호화된 비밀번호 해독
                        const decrypted_pw =CryptoJS.AES.decrypt(hashed_password,salt ,{iv});
                        const plain_pw = decrypted_pw.toString();

                        if (plain_pw === login_pw ){
                            res.status(200).send('로그인 성공');
                        }else {
                            res.status(401).send('line 145','401오류 자격증명 잘못됨')
                        }
                    }
                }
            })
            conn.release();
        }
    })
})