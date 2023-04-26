import styles from '../../css/currentGear.module.css'

const CurrentGear = (props) => {
    const {slots} = props;
    return ( 
        <div className={styles.current}>
            <div className={styles.Head}>
                Head
                {slots.Head.length > 0 && slots.Head[0].name}
                </div>
            <div className={styles.Body}>
                Body
                {slots.Body.length > 0 && slots.Body[0].name}
                </div>
            <div className={styles.MainHand}>
                Main-Hand
                {slots['Main-Hand'].length > 0 && slots['Main-Hand'][0].name}
                </div>
            <div className={styles.OffHand}>
                Off-Hand
                {slots['Off-Hand'].length > 0 && slots['Off-Hand'][0].name}
                </div>
            <div className={styles.Gloves}>
                Gloves
                {slots.Gloves.length > 0 && slots.Gloves[0].name}
                </div>
            <div className={styles.Boots}>
                Boots
                {slots.Boots.length > 0 && slots.Boots[0].name}
                </div>
        </div>
     );
}
 
export default CurrentGear;