import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Monster from "../component/monster";
import Navbar from "../component/navbar";
import Player from "../component/player";
import DataContext from "../data/context";
import styles from '../css/main.module.css';
const Main = () => {
    const { state, action } = useContext(DataContext)

    useEffect(() => {
        action.setUser_id(state.player.id)
    }, [])

    console.log('player', state.player);
    console.log('player.id', state.user_id);
    console.log('equipment', state.equipment);
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
        <div className={styles.main}>
            <div className={styles.main_wrap}>
                <div className={styles.status}>
                    
                </div>
                <div className={styles.blank}> 공백 </div>
                <div className={styles.board_wrap}>
                    <div className={styles.board} >게시판</div>
                    <div className={styles.chat} >채팅창</div>
                </div>
            </div>

        </div>
    );
}

export default Main;