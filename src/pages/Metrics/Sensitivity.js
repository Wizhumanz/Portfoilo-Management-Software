import { FaEye } from 'react-icons/fa';

const Sensitivity = () => {
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
                            <h5 className="card-title mb-0">Sensitivity</h5>
                        </div>
                        <div className="card-body">
                            <p>You haven't added your first sensitivity to this property yet. Get started by <a href="#"><span className="text-primary">adding one now</span></a></p>
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
 
export default Sensitivity;