import axios from "axios";

const { createContext, useState, useEffect } = require("react");

const DataContext = createContext();

const DataProvider = ({ children }) => {
    const [player, setPlayer] = useState({})
    const [monster, setMonster] = useState([])
    const [weapons, setWeapons] = useState([])
    const [isCallStat, setIsCallStat] = useState(false);
    const [armour ,setArmour] = useState([])
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
      // 장비와 스텟의 합을 구하는 함수
      const totalStatus = () => {
        let atk = 0;
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
    },[])
   

  
    const value = {
        state: { player, monster, weapons,isCallStat },
        action: { setPlayer, setMonster, setWeapons,totalStatus,setIsCallStat }
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