// noinspection JSValidateTypes

import {useContext, useState} from "react";
import {InvoiceContext} from "../context/InvoiceContext.jsx";
import ItemList from "./ItemList.jsx";

export default function InvoiceForm() {

    const { setInvoices, itemRows, handleFormQuit, calculatePaymentDue, calculateAmount } = useContext(InvoiceContext);
    const [currentStatus, setCurrentStatus] = useState("");


    const handleFormSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formObj = Object.fromEntries(formData);
        let id = crypto.randomUUID()
        formObj.id = id.toString()
        formObj.status = currentStatus
        formObj.paymentDue = calculatePaymentDue(formObj.invoiceDate, formObj.paymentTerms);
        formObj.items = itemRows;
        formObj.amount = calculateAmount(itemRows);
        setInvoices(prev => [formObj, ...prev]);
        handleFormQuit()
    }




    return (
        <>
            <div className="formContainer">
                <div className="invoiceFormOutline">
                    <form className='invoiceForm' onSubmit={handleFormSubmit}>
                        <div className="newInvoiceTitle">
                            <h2>New Invoice</h2>
                        </div>
                        <div className="billInformation">
                            <h3>Bill From</h3>
                            <div className="billFrom">
                                <p>Street Address</p>
                                <input type="text" name="billFromAddress" required/>
                            </div>
                            <div className="address2">
                                <div className="city">
                                    <p>City</p>
                                    <input type="text" name="billFromCity" placeholder="City"/>
                                </div>
                                <div className="postCode">
                                    <p>Post Code</p>
                                    <input type="text" name="billFromPostCode" placeholder="Post Code"/>
                                </div>
                                <div className="country">
                                    <p>Country</p>
                                    <input type="text" name="billFromCountry" placeholder="Country"/>
                                </div>
                            </div>
                        </div>
                        <div className="billTo">
                            <h3>Bill To</h3>
                            <p>Client&apos;s Name</p>
                            <input type="text" name="billToName"/>
                            <p>Client&apos;s Email</p>
                            <input type="email" name="billToEmail" id=""/>
                            <p>Street Address</p>
                            <input type="text" name="billToAddress"/>
                            <div className="address2">
                                <div className="city">
                                    <p>City</p>
                                    <input type="text" name="billToCity"/>
                                </div>
                                <div className="postCode">
                                    <p>Post Code</p>
                                    <input type="text" name="billToPostCode"/>
                                </div>
                                <div className="country">
                                    <p>Country</p>
                                    <input type="text" name="billToCountry"/>
                                </div>
                            </div>
                            <div className="invoiceDateTerms">
                                <div className="invoiceDate">
                                    <p>Invoice Date</p>
                                    <input type="date" name="invoiceDate" id=""/>
                                </div>
                                <div className="paymentTerms">
                                    <p>Payment Terms</p>
                                    <select name="paymentTerms" id="">
                                        <option value="30days">Net 30 Days</option>
                                        <option value="60days">Net 60 Days</option>
                                        <option value="90days">Net 90 Days</option>
                                        <option value="120days">Net 120 Days</option>
                                    </select>
                                </div>
                            </div>
                            <p>Project Description</p>
                            <input type="text" name="description"/>
                        </div>
                        <ItemList />

                        <div className="sendAndDraft">
                            <button type="button" onClick={handleFormQuit}><p className="discardBtn">Discard</p>
                            </button>
                            <div className="saveBtns">
                                <button className="draftBtn" onClick={() => setCurrentStatus('draft')} type="submit"><p>Save as Draft</p></button>
                                <button className="sendBtn" onClick={() => setCurrentStatus('pending')} type="submit"><p>Save & Send</p></button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}