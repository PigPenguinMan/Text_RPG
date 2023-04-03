import axios from "axios";

const { createContext, useState, useEffect } = require("react");
const DataContext = createContext();
// 로그인 암호화를 위한 노드 내장함수 crypto
const crypto = require('crypto');

const DataProvider = ({ children }) => {
    const [player, setPlayer] = useState({})
    const [monster, setMonster] = useState([])
    const [weapons, setWeapons] = useState([])
    const [isCallStat, setIsCallStat] = useState(false);
    const [armours ,setArmours] = useState([])
    const [inventory,setInventory] = useState([]);
    const [items, setItems] =useState([])
    const [login_id,setLogin_id] = useState();
    const [login_pw,setLogin_pw] = useState();
    // 암호화에 사용할 Salt키
    const salt = crypto.randomBytes(16).toString('hex');

    // 게임데이터를 불러오는 함수 
    const getGameData = async () => {

        const playerResponse = await axios.get('/api/user');
        setPlayer(playerResponse.data[0]);

        const weaponsResponse = await axios.get('/api/weapon');
        setWeapons(weaponsResponse.data);
        const armoursResponse = await axios.get('/api/armour');
        setArmours(armoursResponse.data)
        const monsterResponse = await axios.get('/api/monster');
        setMonster(monsterResponse.data[0]);
        const inventoryResponse = await axios.get('/api/inventory');
        setInventory(inventoryResponse.data);
        const itemResponse = await axios.get('/api/item');
        setItems(itemResponse.data);
    }
      // 장비와 스텟의 합을 구하는 함수
      const totalStatus = () => {
        let atk = 0;
        // 무기데이터의 ID값과 유저가 들고있는 무기iD값이 같으면 공격력을 더해줌 
        for (let i = 0; i < weapons.length; i++) {
            if (weapons[i].weapon_id === player.weapon_id) {
                atk = weapons[i].attack_power
            }
        }
        const updatePlayer = {...player ,attack_power : player.attack_power + atk}
        setPlayer(updatePlayer)
    }

    useEffect(()=>{
        getGameData()
    },[]);
   
    const value = {
        state: { player, monster, weapons,armours,isCallStat , inventory, items ,login_id ,login_pw},
        action: { setPlayer, setMonster, setWeapons, setArmours,totalStatus,setIsCallStat, setInventory ,setLogin_id,setLogin_pw}
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