import {createContext, useEffect, useState} from "react";

export const InvoiceContext = createContext(null);

export function InvoiceProvider({ children }) {
    const [invoices, setInvoices] = useState(localStorage.getItem("invoices") ? JSON.parse(localStorage.getItem("invoices")) : [])
    const [invoiceDetails, setInvoiceDetails] = useState({})
    const [itemRows, setItemRows] = useState([])
    const [filteredStatus, setFilteredStatus] = useState('all')

    const statuses = ['all', 'draft', 'pending', 'paid'];
    console.log(filteredStatus)

    const handleFilterChange = (status) => {
        if (status === 'all') {
            setFilteredStatus(['all']);
        } else {
            if (filteredStatus.includes('all')) {
                setFilteredStatus([status]);
            } else if (filteredStatus.includes(status)) {
                setFilteredStatus(filteredStatus.filter(s => s !== status));
            } else {
                setFilteredStatus([...filteredStatus, status]);
            }
        }
    };

    useEffect(() => {
        setInvoices(JSON.parse(localStorage.getItem("invoices")))
    }, [])
    useEffect(() => {
        localStorage.setItem("invoices", JSON.stringify(invoices))
    }, [invoices])


    const handleForm = () => {
        console.log('handleForm')
        setInvoiceDetails([])
        setItemRows([])
        document.querySelector('.formContainer').classList.toggle('formActive')
        document.querySelector('body').style.overflow = 'hidden'

    }
    const handleEditForm = () => {
        console.log('handleEditForm')
        document.querySelector('.formContainer').classList.toggle('formActive')
        document.querySelector('body').style.overflow = 'hidden'
    }
    const handleFormQuit = () => {
        console.log('handleFormQuit')
        document.querySelector('.formContainer').classList.remove('formActive')
        document.querySelector('body').style.overflow = 'unset'
    }
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInvoiceDetails(prev => ({ ...prev, [name]: value }));
    };

    const calculatePaymentDue = (invoiceDate, paymentTerms) => {
        if (isNaN(new Date(invoiceDate))) {
            return;
        }

        let date = new Date(invoiceDate);

        let daysToAdd;
        switch(paymentTerms) {
            case '30days':
                daysToAdd = 30;
                break;
            case '60days':
                daysToAdd = 60;
                break;
            case '90days':
                daysToAdd = 90;
                break;
            case '120days':
                daysToAdd = 120;
                break;
            default:
                daysToAdd = 0;
        }

        date.setDate(date.getDate() + daysToAdd);

        return date.toISOString().split('T')[0];
    }

    const calculateAmount = (itemRows) => {
        return itemRows.reduce((acc, item) => acc + item.itemPrc * item.itemQty, 0);
    }

    return (
        <InvoiceContext.Provider value={{
            invoices, setInvoices, itemRows, setItemRows, invoiceDetails, setInvoiceDetails,
            statuses, filteredStatus, setFilteredStatus, handleFilterChange,
            handleForm, handleFormQuit, handleEditForm, handleInputChange, calculatePaymentDue, calculateAmount
        }}>
            {children}
        </InvoiceContext.Provider>
    );
}