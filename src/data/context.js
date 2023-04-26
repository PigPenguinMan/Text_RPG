import axios from "axios";

import { createContext, useState, useEffect } from "react";
import CryptoJS from 'crypto-js'
// const crypto = require('crypto');
// polyfill 에러 발생 
// https://velog.io/@fgprjs/JS-Crypto-Module-Build-Module-Not-Found-Error 참고
// create-react-app으로 만들면 사실상 사용하기 힘들다고 판단 


const DataContext = createContext();

const DataProvider = ({ children }) => {
    const [player, setPlayer] = useState({})
    const [monster, setMonster] = useState([])
    const [weapons, setWeapons] = useState([])
    const [isCallStat, setIsCallStat] = useState(false);
    const [armour, setArmour] = useState([])

    const [user_id, setUser_id] = useState();
    const [user_pw, setUser_pw] = useState();
    const [user_name, setUser_name] = useState();
    // 장비에 사용하는 변수 
    const [equipment, setEquipment] = useState([]);

    // 회원가입때 사용하는 변수 
    const [login_id, setLogin_id] = useState();
    const [login_pw, setLogin_pw] = useState();
    const [login_name, setLogin_name] = useState();
    const equipSlots = {
        Head: [],
        Body: [],
        // '' 를 안붙이면 JS에서 두개의 단어로 읽어 문자열로 만들어줘야함
        'Main-Hand': [],
        'Off-Hand': [],
        Gloves: [],
        Boots: []
    };
    // 암호화에 사용할 salt키
    /** 수정필요 현재 단순문자열 => 배열로 변경해야함
     *  CrpytoJS.lib.wordArray.random(16);사용 
     * 
     */
    // const [salt,setSalt]  =useState(CryptoJS.lib.WordArray.random(16));
    // hash된 비밀번호 
    const [hashed_password, setHashed_password] = useState()

    // 게임데이터를 불러오는 함수 
    const getGameData = async () => {
        const playerResponse = await axios.get('/api/user');
        setPlayer(playerResponse.data[0]);

        const weaponsResponse = await axios.get('/api/weapon');
        setWeapons(weaponsResponse.data);

        const armourResponse = await axios.get('/api/armour');
        setArmour(armourResponse.data)

        const monsterResponse = await axios.get('/api/monster');
        setMonster(monsterResponse.data[0]);
    }

    useEffect(() => {
        getGameData()
    }, [])
    const getEquipment = async () => {
        /** 장비를 불러오기위해 get()메소드의 두번쨰인자로 파라미터 넘겨줌 */
        const equipResponse = await axios.get('/api/item/equipment', { params: { user_id: user_id } });
        setEquipment(equipResponse.data)
        /* 불러온 장비를 슬롯별로 나누기 */
        equipment.forEach(item => {
            const slotName = item.slot;
            equipSlots[slotName].push(item);
        })
    }

    // 장비와 스텟의 합을 구하는 함수
    const totalStatus = () => {
        let atk = 0;
        for (let i = 0; i < weapons.length; i++) {
            if (weapons[i].weapon_id === player.weapon_id) {
                atk = weapons[i].attack_power
            }
        }
        const updatePlayer = { ...player, attack_power: player.attack_power + atk }
        setPlayer(updatePlayer)
    }




    const value = {
        state: { player, monster, weapons, isCallStat, login_id, login_pw, user_id, user_pw, user_name, hashed_password, login_name, armour, equipment ,equipSlots},
        action: { setPlayer, setMonster, setWeapons, totalStatus, setIsCallStat, setLogin_id, setLogin_pw, setUser_id, setUser_pw, setUser_name, setHashed_password, setLogin_name, getEquipment }
    };

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    )
}
const { Consumer: DataConsumer } = DataContext;
export { DataProvider, DataConsumer };
export default DataContext;