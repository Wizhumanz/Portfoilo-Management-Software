import { FaEye } from 'react-icons/fa';

const PurchasesSales = () => {
    return (
        <section id="Loans" className="container-fluid section-top-padding loans">
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><a href="#">303 Sungarden Spring</a></li>
                                <li className="breadcrumb-item active" aria-current="page">Proforma Assumptions</li>
                            </ol>
                        </nav>
                        <div className="card-header">
                            <h5 className="card-title mb-0">Purchase &amp; Sale</h5>
                        </div>
                        <div className="card-body">
                            <form>
                                <div className="row g-3 form-group">
                                    <div className="col-sm-2">
                                        <label htmlFor="Acquisition-price" className="col-form-label">Acquisition price<span className="text-danger">*</span></label>
                                    </div>
                                    <div className="col-sm-4 col-md-3">
                                        <div className="input-group">
                                            <span className="input-group-text" id="Acquisition-price1">$</span>
                                            <input type="number" className="form-control" id="Acquisition-price" aria-label="" aria-describedby="Acquisition-price1"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="row g-3 form-group">
                                    <div className="col-sm-2">
                                        <label htmlFor="CostofAcquisition" className="col-form-label">Cost of acquisition<span className="text-danger">*</span></label>
                                    </div>
                                    <div className="col-sm-4 col-md-3">
                                        <div className="input-group ">
                                            <span className="input-group-text" id="CostofAcquisition1">$</span>
                                            <input type="number" className="form-control" id="CostofAcquisition" aria-label="" aria-describedby="CostofAcquisition1"/>
                                        </div>
                                    </div>
                                    <div className="col-sm-4 col-md-3">
                                        <select className="form-select" id="select-CostofAcquisition">
                                        <option defaultValue disabled value="">Total Amount</option>
                                        <option>Option 1</option>
                                        <option>Option 2</option>
                                        <option>Option 3</option>
                                    </select>
                                    </div>
                                </div>

                                <div className="row g-3 form-group">
                                    <div className="col-sm-2">
                                        <label htmlFor="Disposition-Price" className="col-form-label w-auto">Disposition price<span className="text-danger">*</span></label>
                                    </div>
                                    <div className="col-sm-4 col-md-3">
                                        <div className="input-group">
                                            <span className="input-group-text" id="Disposition-Price1">$</span>
                                            <input type="number" className="form-control" id="Disposition-Price" aria-label="" aria-describedby="Disposition-Price1"/>
                                        </div>
                                    </div>
                                    <div className="col-sm-4 col-md-3">
                                        <select className="form-select " id="selectDisposition-Price">
                                        <option defaultValue disabled value="">Total Amount</option>
                                        <option>Option 1</option>
                                        <option>Option 2</option>
                                        <option>Option 3</option>
                                    </select>
                                    </div>
                                </div>

                                <div className="row g-3 form-group">
                                    <div className="col-sm-2">
                                        <label htmlFor="CostofDisposition" className="col-form-label w-auto">Cost of Disposition<span className="text-danger">*</span></label>
                                    </div>
                                    <div className="col-sm-4 col-md-3">
                                        <div className="input-group">
                                            <span className="input-group-text" id="CostofDisposition1">$</span>
                                            <input type="number" className="form-control" id="CostofDisposition" aria-label="" aria-describedby="CostofDisposition1"/>
                                        </div>
                                    </div>
                                    <div className="col-sm-4 col-md-3">
                                        <select className="form-select" id="select-CostofDisposition">
                                        <option defaultValue disabled value="">Total Amount</option>
                                        <option>Option 1</option>
                                        <option>Option 2</option>
                                        <option>Option 3</option>
                                    </select>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="card-footer">
                            <button type="button" className="btn btn-success me-1">Save</button>
                            <button type="button" className="btn btn-primary"><FaEye /> Preview</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
 
export default PurchasesSales;