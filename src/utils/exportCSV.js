import Papa from "papaparse";

export const exportProductsCSV = (products) => {
    const fields = ['name', 'price', 'stock'];
    const csvData = products.map((product) => ({
        name: product.name,
        price: product.price,
        stock: product.stock
    }))

    //convert json to csv
    const csv = Papa.unparse(csvData,{
        header: true,
        columns: fields
    });//???

    //download csv
    const blob = new Blob([csv], {type: "text/csv;charset:utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute("download", "products_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}