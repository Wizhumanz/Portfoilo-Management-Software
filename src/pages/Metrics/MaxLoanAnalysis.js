import { FaEye } from 'react-icons/fa';

const MaxLoanAnalysis = () => {
    return (
        <section id="LoanAnalysis" className="container-fluid section-top-padding label-width">
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div id="liveToast" className="toast align-items-center text-white bg-success border-0 mb-2 show" role="alert" aria-live="assertive" aria-atomic="true">
                            <div className="d-flex">
                                <div className="toast-body">
                                    Saved
                                </div>
                                <button type="button" className="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                            </div>
                        </div>
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><a href="#">303 Sungarden Spring</a></li>
                                <li className="breadcrumb-item active" aria-current="page">Metrics</li>
                            </ol>
                        </nav>
                        <div className="card-header">
                            <h5 className="card-title mb-0">Maximum Loan Analysis</h5>
                        </div>
                        <form className="needs-validation" novalidate>
                            <div className="card-body">
                                <div className="row g-3 form-group">
                                    <div className="col-sm-2">
                                        <label htmlFor="LoanToValue" className="col-form-label w-auto">Loan to Value<span className="text-danger">*</span></label>
                                    </div>
                                    <div className="col-sm-4 col-md-3">
                                        <div className="input-group w-auto has-validation">
                                            <input type="number" className="form-control" id="LoanToValue" aria-label="" aria-describedby="LoanToValue1" required/>
                                            <span className="input-group-text" id="LoanToValue1">$</span>
                                            <div className="invalid-feedback">
                                                Please choose a username.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row g-3 form-group">
                                    <div className="col-sm-2">
                                        <label htmlFor="CapeRate" className="col-form-label w-auto">Cap Rate<span className="text-danger">*</span></label>
                                    </div>
                                    <div className="col-sm-4 col-md-3">
                                        <div className="input-group w-auto has-validation">
                                            <input type="number" className="form-control" id="CapeRate" aria-label="" aria-describedby="CapeRate1" required/>
                                            <span className="input-group-text" id="CapeRate1">$</span>
                                            <div className="invalid-feedback">
                                                Please choose a username.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row g-3 form-group">
                                    <div className="col-sm-2">
                                        <label htmlFor="Required-DSCR" className="col-form-label w-auto">Required DSCR<span className="text-danger">*</span></label>
                                    </div>
                                    <div className="col-sm-4 col-md-3">
                                        <div className="w-auto has-validation">
                                            <input type="number" className="form-control" id="Required-DSCR" aria-label="" aria-describedby="Required-DSCR1" value="3" required/>
                                        </div>
                                        <div className="valid-feedback">
                                            Looks good!
                                        </div>
                                    </div>
                                </div>
                                <div className="row g-3 form-group">
                                    <div className="col-sm-2">
                                        <label htmlFor="InterestRate" className="col-form-label w-auto">Interest Rate<span className="text-danger">*</span></label>
                                    </div>
                                    <div className="col-sm-4 col-md-3">
                                        <div className="input-group w-auto has-validation">
                                            <input type="number" className="form-control" id="InterestRate" aria-label="" aria-describedby="InterestRate1" required/>
                                            <span className="input-group-text" id="InterestRate1">$</span>
                                            <div className="invalid-feedback">
                                                Please choose a username.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row g-3 form-group">
                                    <div className="col-sm-2">
                                        <label htmlFor="Amortization" className="col-form-label w-auto">Amortization<span className="text-danger">*</span></label>
                                    </div>
                                    <div className="col-sm-4 col-md-3">
                                        <div className="input-group w-auto has-validation">
                                            <input type="number" className="form-control" id="Amortization" aria-label="" aria-describedby="Amortization1" required/>
                                            <span className="input-group-text" id="Amortization1">Months</span>
                                            <div className="invalid-feedback">
                                                Please choose a username.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer">
                                <button type="submit" id="liveToastBtn" className="btn btn-primary me-1">Save</button>
                                <button type="button" className="btn btn-primary"><FaEye /> Preview</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
 
export default MaxLoanAnalysis;