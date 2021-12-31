import { FaEye } from 'react-icons/fa';

const MarketLeasing = () => {
    return (
        <section id="MarketProfiles" className="container-fluid section-top-padding">
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
                            <h5 className="card-title mb-0">Market Leasing Profiles</h5>
                        </div>
                        <div className="card-body">
                            <p>You haven’t added your first Market Leasing Profile to this property yet. Get started by <a herf="#"><span className="text-primary">adding one now.
                            </span></a></p>
                        </div>
                        <div className="card-footer">
                            <button type="button" className="btn btn-primary">Add New</button>
                            <button type="button" className="btn btn-primary"><FaEye /> Preview</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
 
export default MarketLeasing;