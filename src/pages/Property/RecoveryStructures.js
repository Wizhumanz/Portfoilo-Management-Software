import { GoDiffAdded } from "react-icons/go"

const RecoveryStructures = () => {
    return (
        <section id="ExpenseGroups" className="container-fluid section-top-padding">
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-header">
                            <h5 className="card-title mb-0">Expense Groups</h5>
                        </div>
                        <div className="card-body">
                            <button type="button" className="btn btn-primary mb-1"><GoDiffAdded /> Add Expense Group</button>
                            <p className="border max-width-btn p-2 rounded bg-primary text-white mb-1">Expenses</p>
                            <p className="border max-width-btn p-2 rounded mb-1">You don't have any expenses. Try adding <a href="#"><span className="text-primaty">Some</span></a></p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
 
export default RecoveryStructures;