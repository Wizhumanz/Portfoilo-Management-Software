import { Bar, Doughnut, Line, Scatter } from 'react-chartjs-2'
import { useParams, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux';

const Dashboard = () => {
    const { id } = useParams()
    const { propertyList } = useSelector((state) => state.property)

    const property = propertyList.filter(({_id}) => _id === id)[0]

    // 404 for incorrect property
    if (property == undefined) {
        return <Redirect to="/404" />
    }

    const createRows = (length) => {
        let rows = [];
        for (let i = 0; i < length; i++) {
          rows.push(<td key={i}>$0</td>);
        }
        return rows
    }

    const createBoldRows = (length) => {
        let rows = [];
        for (let i = 0; i < length; i++) {
            rows.push(<td key={i} className="fw-bold">$0</td>);
        }
        return rows
    }

    const createConsecutiveNum = (endNum) => {
        let nums = [];
        for (let i = 1; i <= endNum; i++) {
            nums.push(<td key={i}>{i}</td>);
        }
        return nums
    }

    const createFakeYears = (endNum) => {
        let years = [];
        for (let i = 0; i < endNum; i++) {
            years.push(<td key={i}>5/31/{2022+i}</td>);
        }
        return years
    }

    const createFakeMonths = (endNum) => {
        let months = [];
        for (let i = 1; i <= endNum; i++) {
            months.push(<td key={i}>{i}/31/2021</td>);
        }
        return months
    }

    const propertySize = (size) => {
        if (size.length === 1) {
            return size[0]
        } else {
            return Math.min(...size) + " - " + Math.max(...size)
        }
    }
    
    return (
        <section id="Dashboard" className="container-fluid section-top-padding open-property">
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            <h1 className="card-sub-heading">{property.name}</h1>
                            <div className="row list-dashboard">
                                <div className="col-6">
                                    <ul className="">
                                        <li className="">Property type: {property.propType}</li>
                                        <li className="">Analysis period: {new Date(property.analysisStart).toDateString()} - {new Date(new Date(property.analysisStart).setFullYear(new Date(property.analysisStart).getFullYear() + property.holdingPeriod)).toDateString()} ({property.holdingPeriod} years)</li>
                                        <li className="">Property Id: {property._id}</li>
                                        <li className="">Number of years old: {new Date().getFullYear() - new Date(property.analysisStart).getFullYear()} years</li>
                                    </ul>
                                </div>
                                <div className="col-6">
                                    <ul className="">
                                        <li className="">Current Owner: John Allen</li>
                                        <li className="">Estimated Worth: {property.currencyUnit}500,000</li>
                                        <li className="">Area: San Jose, CA</li>
                                        <li className="">Size: {propertySize(property.sizeByMonth.size)} {property.sizeUnit}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="card card-no-padding">
                        <div className="card-body">
                            <nav>
                                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                    <button className="nav-link active" id="nav-annually-tab" data-bs-toggle="tab" data-bs-target="#nav-annually" type="button" role="tab" aria-controls="nav-annually" aria-selected="true">Annually</button>
                                    <button className="nav-link" id="nav-monthly-tab" data-bs-toggle="tab" data-bs-target="#nav-monthly" type="button" role="tab" aria-controls="nav-monthly" aria-selected="false">Monthly</button>
                                </div>
                            </nav>
                            <div className="tab-content" id="nav-tabContent">
                                <div className="tab-pane fade show active" id="nav-annually" role="tabpanel" aria-labelledby="nav-annually-tab">
                                    <table className="tables tables-box">
                                        <thead>
                                            <tr>
                                                <th>End of Year</th>
                                                {createConsecutiveNum(8)}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td></td>
                                                {createFakeYears(8)}
                                            </tr>
                                            <tr>
                                                <td className="fw-bold">POTENTIAL RENTAL INCOME</td>
                                                {createBoldRows(8)}
                                            </tr>
                                            <tr>
                                                <td>General Vacancy</td>
                                                {createRows(8)}
                                            </tr>
                                            <tr>
                                                <td className="fw-bold">AFFECTIVE RENTAL INCOME</td>
                                                {createBoldRows(8)}
                                            </tr>
                                            <tr>
                                                <td>Total Expenses</td>
                                                {createRows(8)}
                                            </tr>
                                            <tr>
                                                <td className="fw-bold">NET OPERATING INCOME</td>
                                                {createBoldRows(8)}
                                            </tr>
                                            <tr>
                                                <td className="fw-bold">CASH FLOW BEFORE TAX</td>
                                                {createBoldRows(8)}
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="tab-pane fade" id="nav-monthly" role="tabpanel" aria-labelledby="nav-monthly-tab">
                                    <table className="tables tables-box">
                                        <thead>
                                            <tr>
                                                <th>End of Month</th>
                                                {createConsecutiveNum(12)}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td></td>
                                                {createFakeMonths(12)}
                                            </tr>
                                            <tr>
                                                <td className="fw-bold">POTENTIAL RENTAL INCOME</td>
                                                {createBoldRows(12)}
                                            </tr>
                                            <tr>
                                                <td>General Vacancy</td>
                                                {createRows(12)}
                                            </tr>
                                            <tr>
                                                <td className="fw-bold">AFFECTIVE RENTAL INCOME</td>
                                                {createBoldRows(12)}
                                            </tr>
                                            <tr>
                                                <td>Total Expenses</td>
                                                {createRows(12)}
                                            </tr>
                                            <tr>
                                                <td className="fw-bold">NET OPERATING INCOME</td>
                                                {createBoldRows(12)}
                                            </tr>
                                            <tr>
                                                <td className="fw-bold">CASH FLOW BEFORE TAX</td>
                                                {createBoldRows(12)}
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-6">
                    <div className="card">
                        <div className="card-body">
                            <Bar 
                                data={{
                                    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                                    datasets: [{
                                        label: '# of Votes',
                                        data: [12, 19, 3, 5, 2, 3],
                                        backgroundColor: [
                                            'rgba(255, 99, 132, 0.2)',
                                            'rgba(54, 162, 235, 0.2)',
                                            'rgba(255, 206, 86, 0.2)',
                                            'rgba(75, 192, 192, 0.2)',
                                            'rgba(153, 102, 255, 0.2)',
                                            'rgba(255, 159, 64, 0.2)'
                                        ],
                                        borderColor: [
                                            'rgba(255, 99, 132, 1)',
                                            'rgba(54, 162, 235, 1)',
                                            'rgba(255, 206, 86, 1)',
                                            'rgba(75, 192, 192, 1)',
                                            'rgba(153, 102, 255, 1)',
                                            'rgba(255, 159, 64, 1)'
                                        ],
                                        borderWidth: 1
                                    }]
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div className="col-6">
                    <div className="card">
                        <div className="card-body">
                            <div className="doughnut">
                                <Doughnut 
                                    data={{
                                        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                                        datasets: [{
                                            label: '# of Votes',
                                            data: [12, 19, 3, 5, 2, 3],
                                            backgroundColor: [
                                                'rgba(255, 99, 132, 0.2)',
                                                'rgba(54, 162, 235, 0.2)',
                                                'rgba(255, 206, 86, 0.2)',
                                                'rgba(75, 192, 192, 0.2)',
                                                'rgba(153, 102, 255, 0.2)',
                                                'rgba(255, 159, 64, 0.2)'
                                            ],
                                            borderColor: [
                                                'rgba(255, 99, 132, 1)',
                                                'rgba(54, 162, 235, 1)',
                                                'rgba(255, 206, 86, 1)',
                                                'rgba(75, 192, 192, 1)',
                                                'rgba(153, 102, 255, 1)',
                                                'rgba(255, 159, 64, 1)'
                                            ],
                                            borderWidth: 1
                                        }]
                                    }}
                                    options={{
                                        responsive: true,
                                        maintainAspectRatio: false,
                                        width:"600px",
                                        height:"600px",
                                        plugins: {
                                            legend: {
                                                display: true,
                                                position: 'left'
                                            },
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-6">
                    <div className="card">
                        <div className="card-body">
                            <Line 
                                data={{
                                    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                                    datasets: [{
                                        label: '# of Votes',
                                        data: [12, 19, 3, 5, 2, 3],
                                        backgroundColor: [
                                            'rgba(255, 99, 132, 0.2)',
                                            'rgba(54, 162, 235, 0.2)',
                                            'rgba(255, 206, 86, 0.2)',
                                            'rgba(75, 192, 192, 0.2)',
                                            'rgba(153, 102, 255, 0.2)',
                                            'rgba(255, 159, 64, 0.2)'
                                        ],
                                        borderColor: [
                                            'rgba(255, 99, 132, 1)',
                                            'rgba(54, 162, 235, 1)',
                                            'rgba(255, 206, 86, 1)',
                                            'rgba(75, 192, 192, 1)',
                                            'rgba(153, 102, 255, 1)',
                                            'rgba(255, 159, 64, 1)'
                                        ],
                                        borderWidth: 1
                                    }]
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div className="col-6">
                    <div className="card">
                        <div className="card-body">
                            <Scatter 
                                data={{
                                    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                                    datasets: [{
                                        label: '# of Votes',
                                        data: [{
                                            x: 10,
                                            y: 2
                                          }, {
                                            x: 3,
                                            y: 10
                                          }, {
                                            x: 10,
                                            y: 5
                                          }, {
                                            x: 4,
                                            y: 7
                                          }, {
                                            x: 6,
                                            y: 4
                                          }, {
                                            x: 0,
                                            y: 5
                                          }, {
                                            x: 15,
                                            y: 3
                                          }, {
                                            x: 2,
                                            y: 8
                                          }],
                                        backgroundColor: [
                                            'rgba(255, 99, 132, 0.2)',
                                            'rgba(54, 162, 235, 0.2)',
                                            'rgba(255, 206, 86, 0.2)',
                                            'rgba(75, 192, 192, 0.2)',
                                            'rgba(153, 102, 255, 0.2)',
                                            'rgba(255, 159, 64, 0.2)'
                                        ],
                                        borderColor: [
                                            'rgba(255, 99, 132, 1)',
                                            'rgba(54, 162, 235, 1)',
                                            'rgba(255, 206, 86, 1)',
                                            'rgba(75, 192, 192, 1)',
                                            'rgba(153, 102, 255, 1)',
                                            'rgba(255, 159, 64, 1)'
                                        ],
                                        borderWidth: 1
                                    }]
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
 
export default Dashboard;