import styles from '../../css/currentGear.module.css'

const CurrentGear = (props) => {
    const {slots} = props;
    // console.log(props.slots);
    return ( 
        <div className={styles.current}>
            <div className={styles.Head}>
                
                {slots.head.length > 0 && slots.head[0].name}
                </div>
            <div className={styles.Body}>
                
                {slots.body.length > 0 && slots.body[0].name}
                </div>
            <div className={styles.MainHand}>
                
                {slots['main-hand'].length > 0 && slots['main-hand'][0].name}
                </div>
            <div className={styles.OffHand}>

                {slots['off-hand'].length > 0 && slots['off-hand'][0].name}
                </div>
            <div className={styles.Gloves}>

                {slots.gloves.length > 0 && slots.gloves[0].name}
                </div>
            <div className={styles.Boots}>

                {slots.boots.length > 0 && slots.boots[0].name}
                </div>
        </div>
     );
}
 
export default CurrentGear;