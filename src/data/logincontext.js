import { createContext, useState } from "react";


const LoginContext = createContext();
const LoginProvider = ({ children }) => {
    const [user_id, setUser_id] = useState();
    const [user_pw, setUser_pw] = useState();
    const [user_name, setUser_name] = useState();
  

    const value = {
        state : { exSalt , user_id  },
        action : { setUser_id,setUser_pw,setUser_name }
    } ;

    return (
        <LoginContext.Provider value={value}>
            {children}
        </LoginContext.Provider>
    )
}
// 04/04 Consumer : DataConsumer 에서 LoginConsumner로 바꿈
const { Consumer: LoginConsumer } = LoginContext;
export { LoginProvider, LoginConsumer };
export default LoginContext;