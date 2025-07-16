const filterAndSortProducts = (products, {category="All", searchTerm="", sortOrder="asc"}) => {
    return [...products]
        .filter((p) => category === "All" ? true : p.category === category )
        .filter((p) => searchTerm.trim() === "" ? true : p.name.toLowerCase().includes(searchTerm.toLowerCase()))
        .sort((a,b) => sortOrder === "asc" ? a.price - b.price : b.price - a.price)
    }

export default filterAndSortProducts;