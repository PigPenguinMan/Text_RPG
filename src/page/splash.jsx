import axios from 'axios';
import { useContext } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../css/splash.module.css'
import DataContext from '../data/context';
import CryptoJS from 'crypto-js'
const Splash = () => {
    const {state,action} =useContext(DataContext);
    const navigate = useNavigate()
   
    const login = async()=>{
        if(state.login_id && state.login_pw){
            const url = '/api/login';
            const login_id = state.login_id;
            const login_pw = state.login_pw;
            const data = {
                login_id,
                login_pw
            }
            const config = {
                headers : {"Content-type" : 'apllication/json'}
            };
            return await axios.post(url,data,config)
        }else { 
            console.log('id 와 pw중 등록하지않은게 있습니다');
        }        
    }
  
    const test = ()=>{
        const salt =CryptoJS.enc.Utf8.parse ('85631');
        const iv=  CryptoJS.enc.Hex.parse('352ca9f2d54636669d9c51919634c806');
        const hash = 'g8fLqwYiukQq61exCzvF7g'
        const decrypt = CryptoJS.AES.decrypt(hash,salt,{iv}).toString(CryptoJS.enc.Utf8);
        const plain = decrypt.toString(CryptoJS.enc.Utf8)
        console.log(decrypt);
        // const pw = 'testpw10';
        // const encrypt = CryptoJS.AES.encrypt(pw,salt,iv).toString()
        // console.log(encrypt);
    }
    const loginHandler =(e)=>{
        e.preventDefault()
        try {
            login()
            // navigate('/main')
        } catch (err) {
            console.log('로그인실패' ,err);
        }
    }
    return ( 
        <div className={styles.splash}>
            스플래시 페이지
           <p>{state.login_id}</p>
           <p>{state.login_pw}</p>
           <button onClick={()=>test()}>test</button>
            <div className={styles.loginbox} onSubmit={loginHandler}>
                <form className={styles.loginform} >
                   ID <input type="text" value={state.login_id} onChange={(e)=>action.setLogin_id(e.target.value)}/>
                   PW <input type="text" value={state.login_pw} onChange={(e)=>action.setLogin_pw(e.target.value)}/>
                   <button onClick={()=>navigate('/signup')}> 회원가입</button>
                   <button type='submit'> submit</button>
                </form>
            </div>
        </div>
     );
}
 
export default Splash;