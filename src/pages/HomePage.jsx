import { InvoiceContext } from "../context/InvoiceContext.jsx";
import {useContext, useEffect} from "react";
import {Link} from "react-router-dom";
import InvoiceForm from "../components/InvoiceForm.jsx";
import EmptyList from "../components/EmptyList.jsx";

export default function HomePage() {
    const { invoices, setInvoiceDetails, setItemRows, filteredStatus, handleFilterChange, handleForm, statuses } = useContext(InvoiceContext);

    const filteredInvoices = (invoices || []).filter(invoice => {
        if(filteredStatus.includes("all")) {
            return invoice;
        } else {
            return filteredStatus.includes(invoice.status);
        }
    })

    useEffect(() => {
        console.log('home page render')
        setInvoiceDetails([])
        setItemRows([])
    }, []);

    // noinspection JSUnresolvedReference
    return (
        <>
            <InvoiceForm />
            <div className="invoicesContainer">
                <div className="invoicesHeader">
                    <div className="logo">
                        <h1>Invoices</h1>
                        <p>There are {filteredInvoices.length} total invoices</p>
                    </div>
                    <div className="invoicesControl">
                        <div className="dropdownMenu">
                            <label className='filterLabel' htmlFor="filter">filter <span>by status</span></label>
                            <input type="checkbox" id='filter'/>
                            <img src="/images/arrow-icon.svg" alt=""/>

                            <ul className="drop">
                                {statuses.map((status, index) => (
                                    <li key={index}>
                                        <input type="checkbox" id={status} name='status'
                                               onChange={() => handleFilterChange(status)}
                                               checked={filteredStatus.includes(status)}/>
                                        <label htmlFor={status}>{status}</label>
                                        <span></span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <button onClick={handleForm} className="btn">New <span>Invoice</span></button>
                    </div>
                </div>
                <div className="invoicesList">
                    {
                        filteredInvoices.length !== 0 ? filteredInvoices.map((invoice, index) => (
                                <Link key={index} to={`detail/${invoice.id}`} className="invoice">
                                <h3><span>#</span>{invoice.id}</h3>
                                <p className='due'>Due {invoice.invoiceDate}</p>
                                <p className='billToName'>{invoice.billToName}</p>
                                <span></span>
                                <p className='totalPrice'>$ {invoice.amount}</p>
                                <p className={`status ${invoice.status}`}>{invoice.status}</p>
                            </Link>
                        ))
                        :
                        <EmptyList />
                    }
                </div>
            </div>
        </>

    )
}