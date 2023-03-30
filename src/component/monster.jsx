import axios from "axios";
import { useEffect, useState } from "react";

const Monster = (props) => {
    const {monster,setMonster} = props;

   
    return ( 
        <div>
            <div>이름 : {monster.name}</div>
            <div>레벨 : {monster.level}</div>
            <div>체력 : {monster.hp}</div>
            <div>공격력 : {monster.attack_power}</div>
        </div>
     );
}
 
export default Monster;