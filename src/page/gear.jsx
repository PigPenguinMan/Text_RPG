import { useContext } from "react";
import CurrentGear from "../component/equipment/currentGear";
import DataContext from "../data/context";
import styles from '../css/gear.module.css'
const Gear = () => {
    const {state,action} = useContext(DataContext);
    const weapons = state.weapons;
    const armours = state.armour;
    const gearList =()=>{
        console.log('weapons',weapons);
        console.log('armours',armours);
    }
    
    return ( 
        <div className={styles.gear}>
            <button onClick={()=>{gearList()}}>장비 체크</button>
            <CurrentGear classname={styles.currentGear} weapons={state.weapons} armours={state.armour}/>
        </div>
     );
}
 
export default Gear;