import { FaEye } from 'react-icons/fa';

const Expenses = () => {
    return (
        <section id="Expenses" className="container-fluid section-top-padding">
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
                            <h5 className="card-title mb-0">Expenses</h5>
                        </div>
                        <div className="card-body">
                            <p className="form-group">You haven't added your first Expenses to this Property yet. Get started by <a href="#"><span className="text-primary">adding one now</span></a></p>
                            <button type="button" className="btn btn-primary me-1">Add New</button>
                            <button type="button" className="btn btn-primary me-1"><FaEye /> Preview</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
 
export default Expenses;