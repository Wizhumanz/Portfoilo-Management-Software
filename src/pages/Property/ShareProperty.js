const ShareProperty = () => {
    return (
        <section id="ShareProperty" className="container-fluid section-top-padding">
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
                            <h5 className="card-title mb-0">Share this Proforma</h5>
                        </div>
                        <div className="card-body">
                            <div className="card-highlight">
                                <p>You can share a proforma with other people and allow them to view a read-only version of your projections.
                                </p>
                                <p>They will need to register but will not need to subscribe. They will be acne to view all of your projections as well as your proforma inputs, however they will not have access to PDF and Excel reports unless they subscribe.
                                </p>
                                <p>Add one or more comma separated email addresses.
                                </p>
                            </div>
                            <form>
                                <div className="form-group">
                                    <label htmlFor="Email1" className="form-label">Emails</label>
                                    <textarea className="form-control" id="Email1" rows="3"></textarea>
                                    <div id="emailHelp" className="form-text">Add an optional note for recipients
                                    </div>
                                </div>
                                <div className="form-group">
                                    <textarea className="form-control" id="exampleFormControlTextarea2" rows="3"></textarea>
                                </div>
                            </form>
                        </div>
                        <div className="card-footer">
                            <button type="button" className="btn btn-success">Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
 
export default ShareProperty;