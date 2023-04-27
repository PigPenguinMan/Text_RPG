import styles from '../../css/currentGear.module.css'

const CurrentGear = (props) => {
    const {slots} = props;
    return ( 
        <div className={styles.current}>
            <div className={styles.Head}>
                Head
                {slots.head.length > 0 && slots.head[0].name}
                </div>
            <div className={styles.Body}>
                Body
                {slots.body.length > 0 && slots.body[0].name}
                </div>
            <div className={styles.MainHand}>
                Main-Hand
                {slots['main-hand'].length > 0 && slots['main-hand'][0].name}
                </div>
            <div className={styles.OffHand}>
                Off-Hand
                {slots['off-hand'].length > 0 && slots['off-hand'][0].name}
                </div>
            <div className={styles.Gloves}>
                Gloves
                {slots.gloves.length > 0 && slots.gloves[0].name}
                </div>
            <div className={styles.Boots}>
                Boots
                {slots.boots.length > 0 && slots.boots[0].name}
                </div>
        </div>
     );
}
 
export default CurrentGear;