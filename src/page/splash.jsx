import { useContext } from 'react';
import { useState } from 'react';
import styles from '../css/splash.module.css'
import DataContext from '../data/context';
const Splash = () => {
    const {state,action} =useContext(DataContext);
    return ( 
        <div className={styles.splash}>
            스플래시 페이지
           <p>{state.login_id}</p>
           <p>{state.login_pw}</p>
            <div className={styles.loginbox}>
                <form className={styles.loginform} >
                   ID <input type="text" value={id} onChange={(e)=>action.setLogin_id(e.target.value)}/>
                   PW <input type="text" value={pw} onChange={(e)=>action.setLogin_pw(e.target.value)}/>
                   <button type='submit'> submit</button>
                </form>
            </div>
        </div>
     );
}
 
export default Splash;