import { useContext } from "react";
import DataContext from "../data/context";

const Inventory = () => {
    const {state,action} = useContext(DataContext);
    // console.log('weapon',state.weapons);
    // console.log('armour',state.armours);
    const inventory = state.inventory;
    const displayInventory = ()=>{
        const display = inventory.map((item,idx)=>{
            return <div key={idx}>{item.name} <button>장착하기</button></div>
        })
        return display
    }
    // console.log('item',state.items);
    console.log('player',state.player);
    // console.log(inventory);
    return ( 
        <div>
            <div>

            <h2>{state.player.name}의 인벤토리</h2>
            
            {displayInventory()}
            </div>
            <div>
                <h2>{state.player.name}의 장비</h2>
            </div>
                        
        </div>
     );
}
 
export default Inventory;