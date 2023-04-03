import axios from "axios";
import { useEffect, useState } from "react";

const Player = (props) => {
    
    const {player,setPlayer,weapons,setWeapons} =props;
   

    // 장비와 스텟의 합을 구하는 함수
    const totalStatus = ()=>{
        let atk = 0;
        for(let i =0 ; i < weapons.length; i ++){
            if(weapons[i].weapon_id === player.weapon_id){
                atk = weapons[i].attack_power
                player.attack_power += atk;
            } 
        }  return player
    }
  
    // console.log('player',player);
    // console.log('weapons',weapons);
    return ( 
        <div>
            <div>id : {player.id}</div>
            <div>이름 : {player.name}</div>
            <div>레벨 : {player.level}</div>
            <div>체력 : {player.hp}</div>
            <div>마력 : {player.mp}</div>
            <div>공격력 : {player.attack_power}</div>
            <button onClick={()=>(totalStatus())}> 1 </button>
        </div>
     );
}
 
export default Player;