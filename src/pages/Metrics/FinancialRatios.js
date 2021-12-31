import { FaEye } from 'react-icons/fa';

const FinancialRatios = () => {
    return (
        <section id="Financial-Ratios" className="container-fluid section-top-padding">
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><a href="#">303 Sungarden Spring</a></li>
                                <li className="breadcrumb-item active" aria-current="page">Metrics</li>
                            </ol>
                        </nav>
                        <div className="card-header">
                            <h5 className="card-title mb-0">Financial Ratios</h5>
                        </div>
                        <div className="card-body">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="CheckCashonCash"/>
                                <label className="form-check-label" htmlFor="CheckCashonCash">
                                Cash on cash
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="CheckGrossRent" defaultChecked/>
                                <label className="form-check-label" htmlFor="CheckGrossRent">
                                    Gross rent multipler
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="CheckLoantoValue" defaultChecked/>
                                <label className="form-check-label" htmlFor="CheckLoantoValue">
                                    Loan To value
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="CheckDeptService" defaultChecked/>
                                <label className="form-check-label" htmlFor="CheckDeptService">
                                    Dept Service Coverage
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="CheckOperating" defaultChecked/>
                                <label className="form-check-label" htmlFor="CheckOperating">
                                    Operating expense ratio
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="CheckCapitalization" defaultChecked/>
                                <label className="form-check-label" htmlFor="CheckCapitalization">
                                    Capitalization rate
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="CheckBreakeven" defaultChecked/>
                                <label className="form-check-label" htmlFor="CheckBreakeven">
                                    Breakeven occupacy
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="CheckEquity" defaultChecked/>
                                <label className="form-check-label" htmlFor="CheckEquity">
                                    Equity Multiple
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="CheckDepth" defaultChecked/>
                                <label className="form-check-label" htmlFor="CheckDepth">
                                    Depth yield
                                </label>
                            </div>
                        </div>
                        <div className="card-footer">
                            <button type="button" className="btn btn-primary me-1">Add Sensitivity First</button>
                            <button type="button" className="btn btn-primary"><FaEye /> Preview</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
 
export default FinancialRatios;