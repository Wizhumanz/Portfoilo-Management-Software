import { FaEye } from 'react-icons/fa';
import * as XLSX from "xlsx";
import { useState } from 'react';
import { MdEdit } from "react-icons/md";

const Tenants = () => {
    const [items, setItems] = useState();
    let excelFile = {}

    function xlSerialToJsDate(xlSerial){
        return new Date(-2209075200000 + (xlSerial - (xlSerial < 61 ? 0 : 1)) * 86400000).toDateString();
    }

    const readExcel = (file) => {
        const promise = new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsArrayBuffer(file);

            fileReader.onload = (e) => {
                const bufferArray = e.target.result;

                const wb = XLSX.read(bufferArray, { type: "buffer" });

                const wsname = wb.SheetNames[0];

                const ws = wb.Sheets[wsname];

                const data = XLSX.utils.sheet_to_json(ws);
                console.log(data)
                resolve(data);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });

        promise.then((d) => {
            setItems(d);
        });
    };

    const renderTableContent = (property, index) => {
        return (
            <tr key={index}>
                <td>{property["Tenant"]}</td>
                <td>{property["Suite"]}</td>
                <td>{property["SF"]}</td>
                <td>{property["Reimbursement"]}</td>
                <td>$ {property["In-Place Rent/SF"]}</td>
                <td>{xlSerialToJsDate(property["Expiration"])}</td>
                <td><button className="edit-btn"><MdEdit className="edit-icon"/></button></td>
            </tr>
        )
    }

    return (
        <section id="Tenants" className="container-fluid section-top-padding">
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            <h1 className="header-margin">Tenants</h1>
                            {items ? (
                                <table className="tables">
                                    <thead>
                                        <tr>
                                        <th scope="col">Tenant Name</th>
                                        <th scope="col">Suite</th>
                                        <th scope="col">Square Feet</th>
                                        <th scope="col">Reimbursement</th>
                                        <th scope="col">In-Place Rent/SF</th>
                                        <th scope="col">Expiration</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {items.map(renderTableContent)}
                                    </tbody>
                                </table>
                            ) : (
                                <p className="form-group">You haven't added your first Tenants to this Property yet. Get started by <a href="#"><span className="text-primary">adding one now</span></a></p>
                            )}
                            <div>
                                <button type="button" className="primary-button">Add New</button>
                                <button type="button" className="primary-button"><FaEye /> Preview</button>
                                <button type="button" className="secondary-button" onClick={() => {readExcel(excelFile)}}>Upload Rent Roll</button>
                                <input type="file" onChange={(e) => {excelFile = e.target.files[0]}}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
 
export default Tenants;