import styles from '../../css/currentGear.module.css'

const CurrentGear = () => {
    return ( 
        <div className={styles.current}>
            <div className={styles.Head}>Head</div>
            <div className={styles.Body}>Body</div>
            <div className={styles.MainHand}>Main-Hand</div>
            <div className={styles.OffHand}>Off-Hand</div>
            <div className={styles.Gloves}>Gloves</div>
            <div className={styles.Boots}>Boots</div>
        </div>
     );
}
 
export default CurrentGear;