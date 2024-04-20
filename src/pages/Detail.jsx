// noinspection JSUnresolvedReference

import {Link, useParams} from "react-router-dom";
import {useContext, useEffect} from "react";
import {InvoiceContext} from "../context/InvoiceContext.jsx";
import EditInvoice from "../components/EditInvoice.jsx";

export default function Detail() {
    const { invoices, setInvoices, setInvoiceDetails, handleEditForm } = useContext(InvoiceContext);
    const { id } = useParams();
    const invoice = invoices.find(invoice => invoice.id === id)

    useEffect(() => {
        setInvoiceDetails(invoice)
    }, [])

    const deleteInvoice = () => {
        const newInvoices = invoices.filter(invoice => invoice.id !== id)
        setInvoices(newInvoices)
    }

    const markAsPaid = () => {
        invoice.status = "paid";
        setInvoices([...invoices])
    }

    return (
        <>
            <EditInvoice />
            <Link className='goBackBtn' to={"/"}><img src="/images/Path2.svg" alt='go-back-icon'/> Go Back </Link>

            <div className="invoiceDetail">
                <div className="statusDetail">
                    <p>Status</p>
                    <p className={`status ${invoice.status}`}>{invoice.status}</p>
                </div>
                <div className="buttons">
                    <button className='editBtn' onClick={handleEditForm}>edit</button>
                    <Link className='deleteBtn' to={'/'} onClick={deleteInvoice}>delete</Link>
                    <button onClick={markAsPaid} className='markPaidBtn'>mark as paid</button>
                </div>
            </div>
            <div className="detail">
                <div className="detailHeader">
                    <div className="leftSide">
                        <h3>#{invoice.id}</h3>
                        <p>{invoice.description}</p>
                    </div>
                    <div className="rightSide">
                        <p>{invoice.billFromAddress}</p>
                        <p>{invoice.billFromCity}</p>
                        <p>{invoice.billFromPostCode}</p>
                        <p>{invoice.billFromCountry}</p>
                    </div>
                </div>
                <div className='detailBody'>
                    <div className='detailDate'>
                        <div className='invoiceDate'>
                            <p>invoice date</p>
                            <h3>{invoice.invoiceDate}</h3>
                        </div>
                        <div className='paymentDue'>
                            <p>payment due</p>
                            <h3>{invoice.paymentDue}</h3>
                        </div>
                    </div>
                    <div className="billTo">
                        <p>Bill To</p>
                        <h3>{invoice.billToName}</h3>
                        <p>{invoice.billToAddress}</p>
                        <p>{invoice.billToCity}</p>
                        <p>{invoice.billToPostCode}</p>
                        <p>{invoice.billToCountry}</p>
                    </div>
                    <div className="sendTo">
                        <p>Sent to</p>
                        <h3>{invoice.billToEmail}</h3>
                    </div>
                </div>


                <div className='itemContainer'>
                    <div className="itemHeader">
                        <p>Item Name</p>
                        <p>QTY</p>
                        <p>Price</p>
                        <p>Total</p>
                    </div>
                    {
                        invoice.items.map((item, index) => (
                            <div className="item" key={index}>
                                <h3>{item.itemName}</h3>
                                <p>{item.itemQty}</p>
                                <p>$ {item.itemPrc}</p>
                                <h3>$ {item.itemPrc * item.itemQty}</h3>
                            </div>

                        ))
                    }
                </div>
                <div className="amountDue">
                    <h4>Amount Due</h4>
                    <h1>$ {invoice.amount}</h1>
                </div>
            </div>
        </>

    )
}