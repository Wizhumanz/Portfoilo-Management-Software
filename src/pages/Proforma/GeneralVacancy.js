import { FaEye } from 'react-icons/fa';

const GeneralVacancy = () => {
    return (
        <section id="GeneralVacancy" className="container-fluid section-top-padding">
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
                            <h5 className="card-title mb-0"> General Vacancy</h5>
                        </div>
                        <div className="card-body">
                            <form>
                                <div className="row form-group">
                                    <label htmlFor="Year1" className="col-form-label w-auto">Year 1</label>
                                    <div className="input-group w-auto">
                                        <input type="text" className="form-control" id="Year1" aria-label="" aria-describedby="YearCopy1"/>
                                        <span className="input-group-text" id="YearCopy1">%</span>
                                    </div>
                                    <a href="#" alt="copy down" className="w-auto d-flex align-items-center">Copy down</a>
                                </div>
                                <div className="row form-group">
                                    <label htmlFor="Year2" className="col-form-label w-auto">Year 2</label>
                                    <div className="input-group w-auto">
                                        <input type="text" className="form-control" id="Year2" aria-label="" aria-describedby="YearCopy2"/>
                                        <span className="input-group-text" id="YearCopy2">%</span>
                                    </div>
                                    <a href="#" alt="copy down" className="w-auto d-flex align-items-center">Copy down</a>
                                </div>
                                <div className="row form-group">
                                    <label htmlFor="Year3" className="col-form-label w-auto">Year 3</label>
                                    <div className="input-group w-auto">
                                        <input type="text" className="form-control" id="Year3" aria-label="" aria-describedby="YearCopy3"/>
                                        <span className="input-group-text" id="YearCopy3">%</span>
                                    </div>
                                    <a href="#" alt="copy down" className="w-auto d-flex align-items-center">Copy down</a>
                                </div>
                                <div className="row form-group">
                                    <label htmlFor="Year4" className="col-form-label w-auto">Year 4</label>
                                    <div className="input-group w-auto">
                                        <input type="text" className="form-control" id="Year4" aria-label="" aria-describedby="YearCopy4"/>
                                        <span className="input-group-text" id="YearCopy4">%</span>
                                    </div>
                                    <a href="#" alt="copy down" className="w-auto d-flex align-items-center">Copy down</a>
                                </div>
                                <div className="row form-group">
                                    <label htmlFor="Year5" className="col-form-label w-auto">Year 5</label>
                                    <div className="input-group w-auto">
                                        <input type="text" className="form-control" id="Year5" aria-label="" aria-describedby="YearCopy5"/>
                                        <span className="input-group-text" id="YearCopy5">%</span>
                                    </div>
                                    <a href="#" alt="copy down" className="w-auto d-flex align-items-center">Copy down</a>
                                </div>
                                <div className="row form-group">
                                    <label htmlFor="Year6" className="col-form-label w-auto">Year 6</label>
                                    <div className="input-group w-auto">
                                        <input type="text" className="form-control" id="Year6" aria-label="" aria-describedby="YearCopy6"/>
                                        <span className="input-group-text" id="YearCopy6">%</span>
                                    </div>
                                    <a href="#" alt="copy down" className="w-auto d-flex align-items-center">Copy down</a>
                                </div>
                                <div className="row form-group">
                                    <label htmlFor="Year7" className="col-form-label w-auto">Year 7</label>
                                    <div className="input-group w-auto">
                                        <input type="text" className="form-control" id="Year7" aria-label="" aria-describedby="YearCopy7"/>
                                        <span className="input-group-text" id="YearCopy7">%</span>
                                    </div>
                                    <a href="#" alt="copy down" className="w-auto d-flex align-items-center">Copy down</a>
                                </div>
                                <div className="row form-group">
                                    <label htmlFor="Year8" className="col-form-label w-auto">Year 8</label>
                                    <div className="input-group w-auto">
                                        <input type="text" className="form-control" id="Year8" aria-label="" aria-describedby="YearCopy8"/>
                                        <span className="input-group-text" id="YearCopy8">%</span>
                                    </div>
                                    <a href="#" alt="copy down" className="w-auto d-flex align-items-center">Copy down</a>
                                </div>
                            </form>
                        </div>
                        <div className="card-footer">
                            <button type="button" className="btn btn-success me-1">Save Changes</button>
                            <button type="button" className="btn btn-primary"><FaEye/> Preview</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
 
export default GeneralVacancy;