import { useMemo } from "react";
import SummaryCard from "./SummaryCard";
import common from "../styles/common.module.css";

const InventorySummaryCards = ({products=[], loading}) => {
    const summary = useMemo(() => {
        if(!products?.length) return {};

        const total = products.length;
        const lowStock = products.filter(p => p.stock<5).length;
        const outOfStock = products.filter(p => p.stock === 0).length;
        const topProduct = products.reduce((max,product) => {
            return product.stock > max.stock ? product : max;
        },products[0]); 

        return {
            total,
            lowStock,
            outOfStock,
            topProduct
        };

    },[products])

    if(loading){
        return <div>Loading summary...</div>
    }
    return (
        <div className={common.summaryCard}>
            <SummaryCard icon="📦" label="Total" value={summary.total} bgColor="#e8f5e9" textColor="#2e7d32" />
            <SummaryCard icon="⚠️" label="Low Stock" value={summary.lowStock} bgColor="#fff3e0" textColor="#ef6c00"/>
            <SummaryCard icon="🚫" label="Out of Stock" value={summary.outOfStock} bgColor="#ffebee" textColor="#c62828"/>
            <SummaryCard icon="🔝" label="Top Product" value={`${summary.topProduct?.name} (${(summary.topProduct?.stock)})`} bgColor="#e3f2fd" textColor="#1565c0"/>
        </div>
    )
}

export default InventorySummaryCards;