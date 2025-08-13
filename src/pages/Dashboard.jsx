import { useState } from "react";
import ProductList from "../components/products/ProductList";
import Sidebar from "../components/Sidebar";
import AddProductForm from "../components/products/AddProductForm";
import styles from './Dashboard.module.css';
import OrderStatusPieChart from "../components/charts/OrderStatusPieChart";

const Dashboard = () => {
    const [view, setView] = useState('products'); // 'products' | 'add' | 'charts'
    
    return (
        <div className={styles.container}>
            <Sidebar setView={setView} currentView={view}/>
            <main className={styles.main}>
                {view === 'products' && <div className={styles.contentWrapper}><ProductList/></div>}
                {view === 'add' && <div className={styles.contentWrapper}><AddProductForm/></div>}
                <OrderStatusPieChart/>
            </main>
        </div>
    )
}

export default Dashboard;