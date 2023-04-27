const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const pool = require('./config/db');
const CryptoJS = require('crypto-js');

const bodyparser = require('body-parser')
app.get('/', (req, res) => {
    res.send('Response Complete')
})
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
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
app.get('/api/user', (req, res) => {
    pool.getConnection((err, conn) => {
        if (err) {
            throw err;
        } else {
            const sql = 'select * from user';
            conn.query(sql, (err, rows, field) => {
                res.send(rows);
            })
            conn.release();
        }
    })
})

// 소버에서 무기데이터 불러오기 
app.get('/api/weapon', (req, res) => {
    pool.getConnection((err, conn) => {
        if (err) {
            throw err;
        } else {
            const sql = 'select * from weapon';
            conn.query(sql, (err, rows, field) => {
                res.send(rows);
            })
            conn.release();
        }
    })
})

// 서버에서 방어구 불러오기 
app.get('/api/armour', (req, res) => {
    pool.getConnection((err, conn) => {
        if (err) {
            throw err;
        } else {
            const sql = 'select * from armour';
            conn.query(sql, (err, rows, field) => {
                res.send(rows);
            })
            conn.release();
        }
    })
})



//회원가입 
app.post('/api/user', (req, res) => {
    pool.getConnection((err, conn) => {
        if (err) {
            throw err;
        } else {
            const userSql = 'INSERT INTO user(login_id,name,gender) values (?,?,?)';
            const login_id = req.body.login_id
            const user_name = req.body.user_name;
            const gender = req.body.gender;
            const userParams = [login_id, user_name, gender];
            conn.query(userSql, userParams, (err, result) => {
                if (err) {
                    throw err;
                } else {
                    const authSql = 'INSERT INTO user_auth(login_id,hashed_password) VALUES (?,?)';
                    const login_id = req.body.login_id;
                    // const salt = req.body.salt;
                    const hashed_password = req.body.hashed_password;
                    // const iv = req.body.iv
                    const authParams = [login_id, hashed_password];
                    conn.query(authSql, authParams, (err, result) => {
                        if (err) {
                            throw err;
                        } else {
                            res.send(result);
                            console.log('등록 성공');
                            conn.release();
                        }
                    });
                }
            });
        }
    });
});

// 로그인에 사용
app.post('/api/login',bodyparser.json() ,(req, res) => {
    console.log('req.body',req.body);
    const login_id = req.body.login_id;
    /* 04/16 401 오류 발생원인 login_id가 undefined로 넘어왔음 */
    const login_pw = req.body.login_pw;
    pool.getConnection((err, conn) => {
        if (err) {
            throw err;
        } else {
            const sql = 'SELECT hashed_password FROM user_auth WHERE login_id = ?';
            /* 
            04/16 
            sqlMessage: "You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near '?' at line 1", 오류 발생
            SELECT 에서 ? 를 사용해 값이 동적으로 바인딩됨 params배열에 값을 제대로 넣어야함
            */
            const loginParams = [login_id];
            conn.query(sql, loginParams, (err, rows, fields) => {
                conn.release(); // 쿼리가 완료된후 conn해제
                if (err) {
                    throw err;
                } else {
                    if (rows.length === 0) {
                        res.status(401).send('line 137 401오류 자격증명이 유효하지않음 rows === 0')
                    } else {
                        const hashed_password = rows[0].hashed_password;
                        // 암호화된 비밀번호 해독
                        const checkPw = CryptoJS.SHA256(login_pw).toString(CryptoJS.enc.Hex)
                        if (hashed_password === checkPw) {
                            res.status(200).send('로그인 성공');
                        } else {
                            res.status(401).send('line 145', '401오류 자격증명 잘못됨')
                        }
                    }
                }
            })
        }
    })
})

// 유저 장비 체크 
app.get('/api/item/equipment',(req,res)=>{
    pool.getConnection((err,conn)=>{
        if(err){
            throw err
        } else {
            // 유저 아이디가 ? 인 유저의 장비창에 있는 아이템 불러오기
            const user_id = [req.query.user_id];
            const sql = 'SELECT * FROM item JOIN equipment ON item.id = equipment.item_id WHERE user_id = ?';
            const equipParam = [user_id];
            console.log('equipParam',equipParam);
            conn.query(sql,equipParam,(err,result)=>{
                if (err){
                    throw err
                } else {
                    res.send(result);
                }
                conn.release()
            })
    }
    })
})