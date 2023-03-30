import { Outlet, useNavigate } from 'react-router-dom';
import styles from '../css/navbar.module.css'

const Navbar = () => {
    const navigate = useNavigate()
    return ( 
        <div>
        <div className={styles.GNB}>
            <div className={styles.main} onClick={()=>{navigate('/')}}> 메인 </div>
            <div className={styles.character} onClick={()=>{navigate('/character')}}> 캐릭터 </div>
            <div className={styles.gear} onClick={()=>{navigate('/gear')}}> 장비 </div>
            <div className={styles.inventory} onClick={()=>{navigate('/inventory')}}> 인벤토리 </div>
            <div className={styles.battle}> 전투 </div>
        </div>
        <Outlet/>
        </div>
     );
}
 
export default Navbar;