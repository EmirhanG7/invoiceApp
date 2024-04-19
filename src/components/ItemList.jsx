import {useContext, useEffect} from "react";
import {InvoiceContext} from "../context/InvoiceContext.jsx";

export default function ItemList() {
    const { itemRows, setItemRows, invoiceDetails, setInvoiceDetails } = useContext(InvoiceContext);

    useEffect(() => {
        if (invoiceDetails.items && invoiceDetails.items.length > 0) {
            setItemRows(invoiceDetails.items);
        }
    }, [invoiceDetails]);

    const addItemRow = () => {
        setItemRows(prev => [...prev, { itemName:'',itemQty: null, itemPrc: null }]);
    };
    const deleteItemRow = (index) => {
        const newRows = [...itemRows];
        newRows.splice(index, 1);
        setItemRows(newRows);
    };

    const handleItemChange = (index, key, value) => {
        setItemRows(prev => {
            const updatedRows = prev.map((item, i) => i === index ? { ...item, [key]: value } : item);
            setInvoiceDetails(prevInvoiceDetails => ({ ...prevInvoiceDetails, items: updatedRows }));
            return updatedRows;
        });
    };

    return (
        <div className="itemList">
            <div className="itemListTitle">
                <p>Item List</p>
            </div>
            <div className="itemListMainRow">
                <p>Item Name</p>
                <p>QTY</p>
                <p>Price</p>
                <p>Total</p>
                <p>Delete</p>
            </div>
            <div>
                {itemRows.map((row, index) => (
                    <div className="itemListRow" key={index}>
                        <input type="text" data-name={`itemName[${index}]`} placeholder="Item Name"
                               defaultValue={row.itemName}
                               onChange={(e) => handleItemChange(index, 'itemName', e.target.value)}/>
                        <input  className="QTY" type="number" data-name={`itemQuantity[${index}]`} placeholder="Qty"
                               defaultValue={row.itemQty}
                                onChange={(e) => handleItemChange(index, 'itemQty', e.target.value)}/>
                        <input className="price" type="number" data-name={`itemPrice[${index}]`} placeholder="Price"
                               defaultValue={row.itemPrc}
                               onChange={(e) => handleItemChange(index, 'itemPrc', e.target.value)}/>
                        <p>{row.itemPrc * row.itemQty}</p>
                        <button onClick={() => deleteItemRow(index)}>
                            <img src="../images/delete-icon.svg" alt="Delete Icon"/>
                        </button>
                    </div>
                ))}
                <button type='button' onClick={addItemRow}>Add Item</button>
            </div>
        </div>
    )
}