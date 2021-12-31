import { useState } from "react";
import DataTable from "../../components/DataTable";

const Proforma = () => {
    const [annual, setAnnual] = useState("nav-link active")
    const [month, setMonth] = useState( "nav-link")

    const [annualUsers, setAnnualUsers] = useState([
        {name:"Tiger Nixon", position:"System Architect", office:"Edinburgh", age:"61", start_date:"2011/04/25", salary:"$320,800"},
        {name:"Garrett Winters", position:"Accountant", office:"Tokyo", age:"63", start_date:"2011/07/25", salary:"$170,750"},
        {name:"Ashton Cox", position:"Junior Technical Author", office:"San Francisco", age:"66", start_date:"2009/01/12", salary:"$86,000"},
        {name:"Cedric Kelly", position:"Senior Javascript Developer", office:"Edinburgh", age:"22", start_date:"2012/03/29", salary:"$433,060"},
        {name:"Cedric Kelly", position:"Senior Javascript Developer", office:"Edinburgh", age:"22", start_date:"2012/03/29", salary:"$433,060"}
    ])

    const [monthUsers, setMonthUsers] = useState([
        {name:"Tiger Nixon", position:"System Architect", office:"Edinburgh", age:"61", start_date:"2011/04/25", salary:"$320,800"},
        {name:"Garrett Winters", position:"Accountant", office:"Tokyo", age:"63", start_date:"2011/07/25", salary:"$170,750"},
        {name:"Ashton Cox", position:"Junior Technical Author", office:"San Francisco", age:"66", start_date:"2009/01/12", salary:"$86,000"},
        {name:"Cedric Kelly", position:"Senior Javascript Developer", office:"Edinburgh", age:"22", start_date:"2012/03/29", salary:"$433,060"}
    ])

    const setAnnualActive = () => {
        setAnnual("nav-link active")
        setMonth("nav-link")
    }

    const setMonthActive = () => {
        setAnnual("nav-link")
        setMonth("nav-link active")
    }

    return (
        <section id="Occupancy" className="container-fluid section-top-padding">
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
                            <h5 className="card-title mb-0">Proforma</h5>
                        </div>
                        <div className="card-body">
                            <p className="form-group">450,000 SF</p>
                            <div>
                                <ul className="nav nav-pills" id="myTab" role="tablist">
                                    <li className="nav-item" role="presentation">
                                        <a className={annual} onClick={setAnnualActive} id="Proforma-Anually-tab" data-bs-toggle="tab" href="#Proforma-Annually" role="tab" aria-controls="home" aria-selected="true">Annually</a>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <a className={month} onClick={setMonthActive} id="Proforma-Monthly-tab" data-bs-toggle="tab" href="#Proforma-Monthly" role="tab" aria-controls="profile" aria-selected="false">Monthly</a>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                {annual === "nav-link active" ? <DataTable users={annualUsers}/> : <DataTable users={monthUsers}/>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
 
export default Proforma;