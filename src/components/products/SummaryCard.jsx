import styles from "./SummaryCard.module.css";

const SummaryCard = ({icon, label, value, bgColor, textColor}) => {
    return(
        <div className={styles.summaryCard} style={{backgroundColor: bgColor, color: textColor}}>
            <div className={styles.icon}>{icon}</div>
            <div className={styles.info}>
                <div className={styles.label}>{label}</div>
                <div className={styles.value}>{value}</div>
            </div>
        </div>
    )
}

export default SummaryCard;