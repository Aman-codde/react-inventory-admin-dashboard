import { useState } from "react";
import ProductList from "../components/products/ProductList";
import Sidebar from "../components/Sidebar";
import AddProductForm from "../components/products/AddProductForm";
import ChartView from "../components/ChartView";
import styles from './Dashboard.module.css';

const Dashboard = () => {
    const [view, setView] = useState('products'); // 'products' | 'add' | 'charts'
    
    return (
        <div className={styles.container}>
            <Sidebar setView={setView} currentView={view}/>
            <main className={styles.main}>
                {view === 'products' && <div className={styles.contentWrapper}><ProductList/></div>}
                {view === 'add' && <div className={styles.contentWrapper}><AddProductForm/></div>}
                {view === 'charts' && <div className={styles.contentWrapper}><ChartView/></div>}
            </main>
        </div>
    )
}

export default Dashboard;