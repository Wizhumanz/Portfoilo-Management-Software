import 'bootstrap/dist/css/bootstrap.min.css';
import { Redirect, BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProtectedRoute from './components/ProtectedRoute'
import { useSelector } from 'react-redux'
import Header from './components/Header'
import ForgotPassword from './pages/HomePage/ForgotPassword'
import Home from './pages/HomePage/Home'
import SignUp from './pages/HomePage/SignUp'
import Login from './pages/HomePage/Login'
import UserProfile from './pages/HomePage/UserProfile'
import PasswordReset from './pages/HomePage/PasswordReset'
import Settings from './pages/HomePage/Settings'
import EmailVerification from './pages/HomePage/EmailVerification'
import Support from './pages/HomePage/Support'
import EditGroup from './pages/HomePage/EditGroup'
import DiscountedCashFlow from './pages/Metrics/DiscountedCashFlow'
import FinancialRatios from './pages/Metrics/FinancialRatios'
import MaxLoanAnalysis from './pages/Metrics/MaxLoanAnalysis'
import RentRoll from './pages/Metrics/RentRoll'
import Sensitivity from './pages/Metrics/Sensitivity'
import CapitalExpenditures from './pages/Proforma/CapitalExpenditures'
import DevCosts from './pages/Proforma/DevCosts'
import Expenses from './pages/Proforma/Expenses'
import GeneralVacancy from './pages/Proforma/GeneralVacancy'
import Loans from './pages/Proforma/Loans'
import OtherIncome from './pages/Proforma/OtherIncome'
import PurchasesSales from './pages/Proforma/PurchasesSales'
import Tenants from './pages/Proforma/Tenants'
import Amortization from './pages/Projection/Amortization'
import Charts from './pages/Projection/Charts'
import Occupancy from './pages/Projection/Occupancy'
import Proforma from './pages/Projection/Proforma'
import SaleProceeds from './pages/Projection/SaleProceeds'
import SourcesUses from './pages/Projection/SourcesUses'
import CopyProperty from './pages/Property/CopyProperty'
import AddProperty from './pages/Property/AddProperty'
import ImportProperties from './pages/Property/ImportProperties'
import Dashboard from './pages/Property/Dashboard'
import EditProperty from './pages/Property/EditProperty'
import ExpenseGroups from './pages/Property/ExpenseGroups'
import InflationProfiles from './pages/Property/InflationProfiles'
import MarketLeasing from './pages/Property/MarketLeasing'
import RecoveryStructures from './pages/Property/RecoveryStructures'
import ShareProperty from './pages/Property/ShareProperty'
import Excel from './pages/Reports/Excel'
import Generated from './pages/Reports/Generated'
import PDF from './pages/Reports/PDF'
import NotFound from './pages/HomePage/NotFound'

function App() {
  const {user} = useSelector((state) => state.loginAuth)

  return (
    <Router>
      <div className="App">
        {user && <Header />}
        <div className="content"> 
          <Switch>
            <Route exact path="/signup">
                {user ? <Redirect to="/" /> : <SignUp />}
            </Route>
            <Route exact path="/login">
                {user ? <Redirect to="/" /> : <Login />}
            </Route>
            <Route exact path="/forgot">
                {user ? <Redirect to="/" /> : <ForgotPassword />}
            </Route>
            <Route path="/reset">
                {user ? <Redirect to="/" /> : <PasswordReset />}
            </Route>
            <Route path="/email-verification">
                <EmailVerification />
            </Route>
          
            {/* navbarOmit is used to remove navbar just for home page */}
            <Route exact path="/404" component={NotFound} />
            <ProtectedRoute exact path="/" component={Home} isAuth={user} navbarOmit={true}/>
            <ProtectedRoute exact path="/add-property/" component={AddProperty} isAuth={user} navbarOmit={true}/>
            <ProtectedRoute exact path="/import-properties" component={ImportProperties} isAuth={user} navbarOmit={true}/>
            <ProtectedRoute exact path="/user-profile" component={UserProfile} isAuth={user} navbarOmit={true}/>
            <ProtectedRoute exact path="/settings" component={Settings} isAuth={user} navbarOmit={true}/>
            <ProtectedRoute exact path="/support" component={Support} isAuth={user} navbarOmit={true}/>
            <ProtectedRoute exact path="/group/:groupName" component={EditGroup} isAuth={user} />
            <ProtectedRoute exact path="/:id" component={Dashboard} isAuth={user} />
            <ProtectedRoute exact path="/:id/tenants" component={Tenants} isAuth={user} />
            <ProtectedRoute exact path="/:id/copy-property" component={CopyProperty} isAuth={user} />
            <ProtectedRoute exact path="/:id/edit-property" component={EditProperty} isAuth={user} />
            <ProtectedRoute exact path="/:id/share-property" component={ShareProperty} isAuth={user} />
            <ProtectedRoute exact path="/:id/proforma" component={Proforma} isAuth={user} />
            <ProtectedRoute exact path="/:id/expenses" component={Expenses} isAuth={user} />
            <ProtectedRoute exact path="/:id/general-vacancy" component={GeneralVacancy} isAuth={user} />
            <ProtectedRoute exact path="/:id/loans" component={Loans} isAuth={user} />
            <ProtectedRoute exact path="/:id/other-income" component={OtherIncome} isAuth={user} />
            <ProtectedRoute exact path="/:id/purchases-sales" component={PurchasesSales} isAuth={user} />
            <ProtectedRoute exact path="/:id/capital-expenditures" component={CapitalExpenditures} isAuth={user} />
            <ProtectedRoute exact path="/:id/development-costs" component={DevCosts} isAuth={user} />
            <ProtectedRoute exact path="/:id/inflation-profiles" component={InflationProfiles} isAuth={user} />
            <ProtectedRoute exact path="/:id/recovery-structures" component={RecoveryStructures} isAuth={user} />
            <ProtectedRoute exact path="/:id/expense-groups" component={ExpenseGroups} isAuth={user} />
            <ProtectedRoute exact path="/:id/market-leasing-profiles" component={MarketLeasing} isAuth={user} />
            <ProtectedRoute exact path="/:id/excel-reports" component={Excel} isAuth={user} />
            <ProtectedRoute exact path="/:id/pdf-reports" component={PDF} isAuth={user} />
            <ProtectedRoute exact path="/:id/generated-reports" component={Generated} isAuth={user} />
            <ProtectedRoute exact path="/:id/maximum-loan-analysis" component={MaxLoanAnalysis} isAuth={user} />
            <ProtectedRoute exact path="/:id/sensitivity" component={Sensitivity} isAuth={user} />
            <ProtectedRoute exact path="/:id/rent-roll" component={RentRoll} isAuth={user} />
            <ProtectedRoute exact path="/:id/financial-ratios" component={FinancialRatios} isAuth={user} />
            <ProtectedRoute exact path="/:id/discounted-cash-flow" component={DiscountedCashFlow} isAuth={user} />
            <ProtectedRoute exact path="/:id/occupancy" component={Occupancy} isAuth={user} />
            <ProtectedRoute exact path="/:id/amortization-schedule" component={Amortization} isAuth={user} />
            <ProtectedRoute exact path="/:id/sources-uses" component={SourcesUses} isAuth={user} />
            <ProtectedRoute exact path="/:id/sale-proceeds" component={SaleProceeds} isAuth={user} />
            <ProtectedRoute exact path="/:id/charts" component={Charts} isAuth={user} />
            <Redirect to="/404" />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
