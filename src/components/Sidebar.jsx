import styles from './Sidebar.module.css';

const Sidebar = ({setView,currentView}) => {
    const menuItems = [
        { label: 'Products', key: 'products'},
        { label: 'Add Product', key: 'add'},
    ]

    return (
        <div className={styles.sidebar}>
            <div className={styles.title}>Admin Dashboard</div>
            {menuItems.map((item) => (
                <button 
                key={item.key}
                onClick={() => setView(item.key)}
                className={`${styles.menuItem} ${currentView === item.key? styles.active:''}`}
                >
                    {item.label}
                </button>
            ))}
        </div>
    )
}

export default Sidebar;