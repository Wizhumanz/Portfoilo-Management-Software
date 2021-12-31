import { FaEye } from 'react-icons/fa';

const RentRoll = () => {
    return (
        <section id="Sensitivity" className="container-fluid section-top-padding">
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
                            <h5 className="card-title mb-0">Rent Roll</h5>
                        </div>
                        <form className="needs-validation" novalidate>
                            <div className="card-body">
                                <div className="row g-3 form-group">
                                    <div className="col-sm-2">
                                        <label htmlFor="select-RentRoll" className="col-form-label">Order by<span className="text-danger">*</span></label>
                                    </div>
                                    <div className="col-sm-4 col-md-3">
                                        <select className="form-select" id="select-RentRoll" required>
                                        <option defaultValue disabled value="">Select</option>
                                        <option>Option 1</option>
                                        <option>Option 2</option>
                                        <option>Option 3</option>
                                    </select>
                                        <div className="invalid-feedback">
                                            Please select a valid state.
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer">
                                <button type="submit" className="btn btn-success me-1">Save</button>
                                <button type="button" className="btn btn-primary"><FaEye /> Preview</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
 
export default RentRoll;