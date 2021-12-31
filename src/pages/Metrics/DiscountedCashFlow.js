import { FaEye } from 'react-icons/fa';

const DiscountedCashFlow = () => {
    return (
        <div>
            <section id="Discounted-Cash-Flow" className="container-fluid section-top-padding label-width">
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
                                <h5 className="card-title mb-0">Discounted Cash Flow</h5>
                            </div>
                            <form className="needs-validation" novalidate>
                                <div className="card-body">
                                    <div className="row g-3 form-group">
                                        <label htmlFor="Levered-discount" className="col-form-label w-auto">Levered discount rate<span className="text-danger">*</span></label>
                                        <div className="input-group w-auto">
                                            <input type="number" className="form-control" id="Levered-discount" aria-label="" aria-describedby="Acquisition-price1" required/>
                                            <span className="input-group-text" id="Levered-discount1">$</span>
                                        </div>
                                    </div>
                                    <div className="row g-3 form-group">
                                        <label htmlFor="Unlevered-discount" className="col-form-label w-auto">Unlevered discount rate<span className="text-danger">*</span></label>
                                        <div className="input-group w-auto">
                                            <input type="number" className="form-control" id="Unlevered-discount" aria-label="" aria-describedby="Acquisition-price1" required/>
                                            <span className="input-group-text" id="Unlevered-discount1">$</span>
                                        </div>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                                        <label className="form-check-label" htmlFor="flexCheckDefault">
                                        Include Levered DCF in reports
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" defaultChecked/>
                                        <label className="form-check-label" htmlFor="flexCheckChecked">
                                            Include UnLevered DCF in reports
                                        </label>
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <button type="submit" className="btn btn-success me-1">Save</button>
                                    <button type="button" className="btn btn-primary"><FaEye/> Preview</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
 
export default DiscountedCashFlow;