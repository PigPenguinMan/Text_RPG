import { useContext, useState } from "react";
import DataContext from "../data/context";
import styles from '../css/character.module.css'
import { useEffect } from "react";
const Character = () => {
    const {state,action} = useContext(DataContext);
    const player = state.player
    const isCallStat =state.isCallStat

    useEffect(() => {
        // 처음 렌더시 isCallStat = false
        if (!isCallStat) {
            // 장비를 장착했을때 스텟을 더하는 함수 
            action.totalStatus()
            // isCallState = ture로 변경해 스텟변화가 더 생기지않게 하기
            action.setIsCallStat(true)
        }
    }, []);
    return ( 
    <div className={styles.Character} >
        <div>이름 : {player.name}</div>
        <div>레벨 :{player.level}</div>
        <div>체력 : {player.hp}</div>
        <div>마나 :{player.mp}</div>
        <div>공격력 : {player.attack_power}</div>
    </div>
     );
}
 
export default Character;