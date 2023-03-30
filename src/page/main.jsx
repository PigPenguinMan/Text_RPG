import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Monster from "../component/monster";
import Navbar from "../component/navbar";
import Player from "../component/player";
import DataContext from "../data/context";


const Main = () => {
    const {state , action} = useContext(DataContext)
    const [turn, setTurn] = useState(0);
    console.log(state.player);
    // const progress= ()=>{
    //     console.log(`${monster.name} 에게 ${player.attack_power}만큼 피해를 줬습니다`);
    //     monster.hp -= player.attack_power
    //     console.log(`${monster.name} 에게 ${monster.attack_power}만큼 피해를 받았습니다`);
    //     player.hp -= monster.attack_power
    //     if(monster.hp <=0){
    //         console.log(`승리하였습니다, ${monster.experience}의 경험치를 획득하였습니다`);
    //     }
    //     if(player.hp <= 0){
    //         console.log(`사망하였습니다`);
    //     }
    // }

    // const handleProgress = ()=>{
    //     setTurn(turn+1)
    //     progress()
    // }


    return (
        <div>


            메인페이지입니다
            {/* <Player player={player} setPlayer={setPlayer} weapon={weapon} setWeapons={setWeapons}/> */}
            {/* <Monster monster={monster}setMonster={setMonster}/> */}
            {/* <button onClick={handleProgress}> 턴 진행 </button> */}
        </div>
    );
}

export default Main;