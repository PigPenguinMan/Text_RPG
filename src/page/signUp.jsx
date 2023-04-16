import { useContext } from "react";
import { useState } from "react";
import DataContext from "../data/context";
import CryptoJS from 'crypto-js'
import axios from "axios";
import { configure } from "@testing-library/react";

const SignUp = () => {
    const { state, action } = useContext(DataContext)
    const [signUp_id, setSignUp_id] = useState();
    const [signUp_pw, setSignUp_pw] = useState();
    const [signUp_name, setSignUp_name] = useState();
    // const [signUp_iv, setSignUp_iv] = useState()
    const onChangeInputId = (e) => {
        action.setLogin_id(e.target.value)
    }
    const onChangeInputPW = (e) => {
        /* 
        04/16 salt, iv 보류 , SHA256사용으로 변경
        salt값을 WordArray.random(16).toString() 사용할시 node.js의 Buffer함수 사용필요
        //salt 키 
        const newSalt = CryptoJS.lib.WordArray.random(16).toString();
        action.setSalt(newSalt);
        //  암호화에 사용할 iv키 
        const iv = CryptoJS.lib.WordArray.random(16);
        
        */
        // 암호화시킨 비밀번호 
        const encryptPw = CryptoJS.SHA256(e.target.value).toString(CryptoJS.enc.Hex);
        action.setLogin_pw(encryptPw);

        console.log(state.login_pw);   

    }
    const onChangeInputName = (e) => {
        action.setLogin_name(e.target.value)
    }
    const colog = () => {
        // console.log('salt', state.salt);
        console.log('ID', state.login_id);
        console.log('PW', state.login_pw);
        // console.log('iv', signUp_iv);
        const sha256 = CryptoJS.SHA256('randompw');
        const deSha = sha256.toString(CryptoJS.enc.Hex);
        console.log('deSha',deSha);
    }
    // server.js로 보내기
    const signUp = async () => {
        const url = '/api/user';
        const login_id = state.login_id
        const user_name = state.login_name;
        const gender = 0;
        // const salt = state.salt;
        const hashed_password = state.login_pw;
        // const iv = signUp_iv;
        /*04/07 기존에 formData로 만들었던것을 그냥 data객체? 로 만들어줌 */
        const data = {
            login_id,
            user_name,
            gender,
            // salt,
            hashed_password,
            // iv
        }
        const config = {
            headers: { "Content-type": 'application/json' },
        };
        return await axios.post(url, data, config)
    }
    // 회원가입 함수
    const signUpHandler = (e) => {
        e.preventDefault();
        // 회원가입 함수 실행후 콘솔에 로그표시
        signUp().then(res => console.log(res.data));
        console.log('등록');
    }
    return (
        <div>
            <div>
                <p>
                {state.login_id}

                </p>
                <p>
                {state.login_pw}

                </p>
                <p>
                {state.login_name}

                </p>
                <p>

                </p>
            </div>
            <div>

            </div>
            <h2>회원가입 페이지</h2>
            <form onSubmit={signUpHandler}>
                ID <input type="text" placeholder="사용할 ID" value={signUp_id} onChange={onChangeInputId} />
                PW <input type="text" placeholder="사용할 비밀번호" value={signUp_pw} onChange={onChangeInputPW} />
                이름 <input type="text" placeholder="사용할 이름" value={signUp_name} onChange={onChangeInputName} />

                <button type="submit">가입하기</button>
            </form>
            <button onClick={() => colog()}>테스트 로그 </button>
        </div>
    );
}

export default SignUp;