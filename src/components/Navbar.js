import { Link, useParams } from "react-router-dom";

const Navbar = () => {
    const { id } = useParams()

    return (
        <nav className="navbar navbar-expand-lg navbar-light navbar-bottom">
            <div className="container-fluid">
                <div className="collapse navbar-collapse navbar-left" id="navbarNavDropdown">
                    <ul className="navbar-nav nav-distance">
                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle text-dark text-decoration-none" to="#" id="nav-property" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Property
                            </Link>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <li><Link className="dropdown-item" to={`/`}>Dashboard</Link></li>
                                <li><Link className="dropdown-item" to={`/${id}`}>View Property</Link></li>
                                <li><Link className="dropdown-item" to={`/${id}/edit-property`}>Edit Property</Link></li>
                                <li><Link className="dropdown-item" to={`/${id}/copy-property`}>Copy Property</Link></li>
                                <li><Link className="dropdown-item" to={`/${id}/share-property`}>Share Property</Link></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><Link className="dropdown-item" to={`/${id}/market-leasing-profiles`}>Marketing Leasing Profiles</Link></li>
                                <li><Link className="dropdown-item" to={`/${id}/inflation-profiles`}>Inflation Profiles</Link></li>
                                <li><Link className="dropdown-item" to={`/${id}/expense-groups`}>Expense Groups</Link></li>
                                <li><Link className="dropdown-item" to={`/${id}/recovery-structures`}>Recovery Structures</Link></li>
                            </ul>
                        </li>
                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle text-dark text-decoration-none" to="#" id="nav-property" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Proforma
                            </Link>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <li><Link className="dropdown-item" to={`/${id}/tenants`}>Tenants</Link></li>
                                <li><Link className="dropdown-item" to={`/${id}/general-vacancy`}>General Vacancy</Link></li>
                                <li><Link className="dropdown-item" to={`/${id}/other-income`}>Other Income</Link></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><Link className="dropdown-item" to={`/${id}/expenses`}>Expenses</Link></li>
                                <li><Link className="dropdown-item" to={`/${id}/capital-expenditures`}>Capital Expenditures</Link></li>
                                <li><Link className="dropdown-item" to={`/${id}/development-costs`}>Development Costs</Link></li>
                                <li><Link className="dropdown-item" to={`/${id}/loans`}>Loans</Link></li>
                                <li><Link className="dropdown-item" to={`/${id}/purchases-sales`}>Purchases &amp; Sales</Link></li>
                            </ul>
                        </li>
                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle text-dark text-decoration-none" to="#" id="nav-property" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Metrics
                            </Link>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <li><Link className="dropdown-item" to={`/${id}/discounted-cash-flow`}>Discounted Cash Flow</Link></li>
                                <li><Link className="dropdown-item" to={`/${id}/sensitivity`}>Sensitivity</Link></li>
                                <li><Link className="dropdown-item" to={`/${id}/financial-ratios`}>Financial Ratios</Link></li>
                                <li><Link className="dropdown-item" to={`/${id}/maximum-loan-analysis`}>Maximum Loan Analysis</Link></li>
                                <li><Link className="dropdown-item" to={`/${id}/rent-roll`}>Rent Roll</Link></li>
                            </ul>
                        </li>
                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle text-dark text-decoration-none" to="#" id="nav-property" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Reports
                            </Link>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <li><Link className="dropdown-item" to={`/${id}/pdf-reports`}>PDF Reports</Link></li>
                                <li><Link className="dropdown-item" to={`/${id}/excel-reports`}>Excel Reports</Link></li>
                                <li><Link className="dropdown-item" to={`/${id}/generated-reports`}>Generated Reports</Link></li>
                            </ul>
                        </li>
                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle text-dark text-decoration-none" to="#" id="nav-property" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Projections
                            </Link>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <li><Link className="dropdown-item" to={`/${id}/proforma`}>Proforma</Link></li>
                                <li><Link className="dropdown-item" to={`/${id}/occupancy`}>Occupancy</Link></li>
                                <li><Link className="dropdown-item" to={`/${id}/discounted-cash-flow`}>Discounted Cash Flow</Link></li>
                                <li><Link className="dropdown-item" to={`/${id}/sensitivity`}>Sensitivity</Link></li>
                                <li><Link className="dropdown-item" to={`/${id}/financial-ratios`}>Financial Ratios</Link></li>
                                <li><Link className="dropdown-item" to={`/${id}/maximum-loan-analysis`}>Maximum Loan Analysis</Link></li>
                                <li><Link className="dropdown-item" to={`/${id}/amortization-schedule`}>Amortization Schedule</Link></li>
                                <li><Link className="dropdown-item" to={`/${id}/rent-roll`}>Rent Roll</Link></li>
                                <li><Link className="dropdown-item" to={`/${id}/sale-proceeds`}>Sale Proceeds</Link></li>
                                <li><Link className="dropdown-item" to={`/${id}/sources-uses`}>Sources &amp; Uses</Link></li>
                                <li><Link className="dropdown-item" to={`/${id}/charts`}>Charts</Link></li>
                            </ul>
                        </li>
                    </ul>
                    {/* <div className="row justify-content-end">
                        <div className="collapse navbar-collapse" id="navbarNavDropdown">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link className="nav-link" to={`/${id}/share-property`}>
                                        <FaShareAlt /> Share
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div> */}
                </div>
            </div>
        </nav>
    );
}
 
export default Navbar;