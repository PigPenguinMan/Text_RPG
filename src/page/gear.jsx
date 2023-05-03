import { useContext, useEffect } from "react";
import CurrentGear from "../component/equipment/currentGear";
import DataContext from "../data/context";
import styles from '../css/gear.module.css'
const Gear = () => {
    const {state,action} = useContext(DataContext);
    const weapons = state.weapons;
    const armours = state.armour;
    const equipSlot = state.equipSlots
    const gearList =()=>{
        console.log('weapons',weapons);
        console.log('armours',armours);
        console.log('user_id',state.user_id);
        console.log('equipment',state.equipment);
        console.log('equipSlot',state.equipSlots);
    }
    const slot =()=>{
        action.slot()
    }
    
    return ( 
        <div className={styles.gear}>
            <button onClick={()=>{gearList()}}>장비리스트 확인</button>
            <button onClick={()=>{slot()}}>장비슬롯</button>
            <CurrentGear classname={styles.currentGear} slots={equipSlot}/>
        </div>
     );
}
 
export default Gear;    