import {useContext} from "react";
import {InvoiceContext} from "../context/InvoiceContext.jsx";
import ItemList from "./ItemList.jsx";

export default function EditInvoice() {
    const { invoiceDetails, setInvoiceDetails, setInvoices, itemRows, handleInputChange, handleFormQuit, calculatePaymentDue, calculateAmount } = useContext(InvoiceContext);

    const handleEdit = (e) => {
        e.preventDefault()
        const updatedInvoiceDetails = { ...invoiceDetails, items: itemRows, amount: calculateAmount(itemRows) };
        updatedInvoiceDetails.paymentDue = calculatePaymentDue(updatedInvoiceDetails.invoiceDate, updatedInvoiceDetails.paymentTerms);
        setInvoiceDetails(updatedInvoiceDetails);
        setInvoices(prev => prev.map(invoice => invoice.id === updatedInvoiceDetails.id ? updatedInvoiceDetails : invoice));
        handleFormQuit()
        console.log('edit')
    }

    return (
        <>
            <div className="formContainer">
                <div className="invoiceFormOutline">
                    <form className='invoiceForm' onSubmit={handleEdit}>
                        <div className="newInvoiceTitle">
                            <h2>New Invoice</h2>
                        </div>
                        <div className="billInformation">
                            <h3>Bill From</h3>
                            <div className="billFrom">
                                <p>Street Address</p>
                                <input type="text" name="billFromAddress" defaultValue={invoiceDetails.billFromAddress}
                                       onChange={handleInputChange}
                                       required/>
                            </div>
                            <div className="address2">
                                <div className="city">
                                    <p>City</p>
                                    <input type="text" name="billFromCity" defaultValue={invoiceDetails.billFromCity}
                                           onChange={handleInputChange}
                                           placeholder="City"/>
                                </div>
                                <div className="postCode">
                                    <p>Post Code</p>
                                    <input type="text" name="billFromPostCode"
                                           onChange={handleInputChange}
                                           defaultValue={invoiceDetails.billFromPostCode} placeholder="Post Code"/>
                                </div>
                                <div className="country">
                                    <p>Country</p>
                                    <input type="text" name="billFromCountry"
                                           onChange={handleInputChange}
                                           defaultValue={invoiceDetails.billFromCountry} placeholder="Country"/>
                                </div>
                            </div>
                        </div>
                        <div className="billTo">
                            <h3>Bill To</h3>
                            <p>Client&apos;s Name</p>
                            <input type="text" name="billToName" onChange={handleInputChange} defaultValue={invoiceDetails.billToName}/>
                            <p>Client&apos;s Email</p>
                            <input type="email" name="billToEmail" onChange={handleInputChange} defaultValue={invoiceDetails.billToEmail}/>
                            <p>Street Address</p>
                            <input type="text" name="billToAddress" onChange={handleInputChange} defaultValue={invoiceDetails.billToAddress}/>
                            <div className="address2">
                                <div className="city">
                                    <p>City</p>
                                    <input type="text" name="billToCity" onChange={handleInputChange} defaultValue={invoiceDetails.billToCity}/>
                                </div>
                                <div className="postCode">
                                    <p>Post Code</p>
                                    <input type="text" name="billToPostCode"
                                           onChange={handleInputChange}
                                           defaultValue={invoiceDetails.billToPostCode}/>
                                </div>
                                <div className="country">
                                    <p>Country</p>
                                    <input type="text" name="billToCountry"
                                           onChange={handleInputChange}
                                           defaultValue={invoiceDetails.billToCountry}/>
                                </div>
                            </div>
                            <div className="invoiceDateTerms">
                                <div className="invoiceDate">
                                    <p>Invoice Date</p>
                                    <input type="date" name="invoiceDate" onChange={handleInputChange} defaultValue={invoiceDetails.invoiceDate}/>
                                </div>
                                <div className="paymentTerms">
                                    <p>Payment Terms</p>
                                    <select name="paymentTerms" onChange={handleInputChange} value={invoiceDetails.paymentTerms}>
                                        <option value="30days">Net 30 Days</option>
                                        <option value="60days">Net 60 Days</option>
                                        <option value="90days">Net 90 Days</option>
                                        <option value="120days">Net 120 Days</option>
                                    </select>
                                </div>
                            </div>
                            <p>Project Description</p>
                            <input type="text" name="description" onChange={handleInputChange} defaultValue={invoiceDetails.description}/>
                        </div>

                        <ItemList />

                        <div className="sendAndDraft">
                            <div className="saveBtns">
                                <button className="cancelBtn" onClick={handleFormQuit} type="submit"><p>Cancel</p></button>
                                <button className="sendBtn" type="submit"><p>Save Changes</p></button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}