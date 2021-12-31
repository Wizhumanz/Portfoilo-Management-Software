import { useState } from "react";
import SalesTable from "../../components/SalesTable";

const SaleProceeds = () => {
    const [users, setUsers] = useState([
        {name:"Tiger Nixon", age:"61"},
        {name:"Garrett Winters", age:"63"},
        {name:"Ashton Cox", age:"66"},
        {name:"Cedric Kelly", age:"22"}
    ])

    return (
        <section id="Rent-Roll" className="container-fluid section-top-padding">
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><a href="#">303 Sungarden Spring</a></li>
                                <li className="breadcrumb-item active" aria-current="page">Projection</li>
                            </ol>
                        </nav>
                        <div className="card-header mb-0">
                            <h5 className="card-title mb-0">Sales Proceeds</h5>
                        </div>
                        <div className="card-body">
                            <SalesTable users={users}/> 
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
 
export default SaleProceeds;