const Amortization = () => {
    return (
        <section id="Loan-Amortization" className="container-fluid section-top-padding">
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
                            <h5 className="card-title mb-0">Loan Amortization</h5>
                        </div>
                        <div className="card-body">
                            <div className="alert alert-warning" role="alert">
                                Add at least one loan first.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
 
export default Amortization;