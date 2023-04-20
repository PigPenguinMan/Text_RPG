import axios from 'axios';
import { useContext } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../css/splash.module.css'
import DataContext from '../data/context';
import CryptoJS from 'crypto-js'
const Splash = () => {
    const {state,action} =useContext(DataContext);
    const [input_id,setInput_id] =useState();
    const [input_pw,setInput_pw] =useState()
    const navigate = useNavigate()
    const login = async()=>{
        if(state.login_id && state.login_pw){
            const url = '/api/login';
            const login_id = state.login_id
            const login_pw = state.login_pw;
            const data = {
                login_id,
                login_pw
            }
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                  }
            };
            // 04/16 여기서 끝
            console.log('data',data);
            return await axios.post(url,data,config)
        }else { 
            console.log('id 와 pw중 입력하지않은게 있습니다');
        }        
    }
  
    const test = ()=>{
        const shaPW = CryptoJS.SHA256(state.login_pw).toString(CryptoJS.enc.Hex);
        console.log('f0d49121f0692129de444074ebe67fe21f62a3973dfbdcc411ed5a6c6ea01424'
        );
        console.log('shaPW',shaPW);
        if (shaPW == 'f0d49121f0692129de444074ebe67fe21f62a3973dfbdcc411ed5a6c6ea01424'
        ) console.log('ok');

    }
    const loginHandler =async(e)=>{
        e.preventDefault()
        try {
            await login().then(navigate('/main'));
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
                   ID <input type="text" value={input_id} onChange={(e)=>action.setLogin_id(e.target.value)}/>
                   PW <input type="password" value={input_pw} onChange={(e)=>action.setLogin_pw(e.target.value)}/>
                   <button onClick={()=>navigate('/signup')}> 회원가입</button>
                   <button type='submit'> submit</button>
                </form>
            </div>
        </div>
     );
}
 
export default Splash;