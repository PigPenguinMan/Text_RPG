import { useContext, useEffect, useState } from "react";
import DataContext from "../data/context";

const Main = () => {
    const data = useContext(DataContext);    
    const [currentUser,setCurrentUser] = useState({});
    const [currentMonster,setCurrentMonster] = useState([]);
    const [turn,setTurn] =useState(0);
    useEffect(()=>{
        setCurrentUser(data.state.user)
        setCurrentMonster(data.state.monster[0])
    },[])
   
    const progress= ()=>{
        console.log(`${currentMonster.name} 에게 ${currentUser.atk}만큼 피해를 줬습니다`);
        currentMonster.hp -= currentUser.atk
        console.log(`${currentMonster.name} 에게 ${currentMonster.atk}만큼 피해를 받았습니다`);
        currentUser.hp -= currentMonster.atk
        if(currentMonster.hp <=0){
            console.log(`승리하였습니다, ${currentMonster.exp}의 경험치를 획득하였습니다`);
        }
        if(currentUser.hp <= 0){
            console.log(`사망하였습니다`);
        }
    } 
    const handleProgress = ()=>{
        setTurn(turn+1)
        progress()
    }
 
    return ( 
        <div>
            <div>
                <p>{currentUser.name}</p>
                <p>{currentUser.level}</p>
                <p>{currentUser.hp}</p>
                <p>{currentUser.exp}</p>
            </div>
            <div>
                vs
            </div>
            <div>
                <p>{currentMonster.name}</p>
                <p>{currentMonster.level}</p>
                <p>{currentMonster.hp}</p>
            </div>
            <button onClick={handleProgress}> 턴 진행 </button>
        </div>
     );
}
 
export default Main;