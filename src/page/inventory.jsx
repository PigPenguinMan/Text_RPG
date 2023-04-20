import { useContext } from "react";
import DataContext from "../data/context";

const Inventory = () => {
  const {state,action} = useContext(DataContext);

    return ( 
        <div>
          인벤토리 페이지입니다  
        </div>
     );
}
 
export default Inventory;