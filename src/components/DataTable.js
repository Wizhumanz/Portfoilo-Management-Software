import { Table } from 'react-bootstrap';

const DataTable = ({users}) => {
    const renderUser = (user, index) => {
        return (
            <tr key={index}>
                <td>{user.name}</td>
                <td>{user.position}</td>
                <td>{user.office}</td>
                <td>{user.age}</td>
                <td>{user.start_date}</td>
                <td>{user.salary}</td>
            </tr>
        )
    }

    return (
        <div>
            <Table striped hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Position</th>
                        <th>Office</th>
                        <th>Age</th>
                        <th>Start Date</th>
                        <th>Salary</th>
                    </tr>
                </thead>
                <tbody>
                    {/* dynamically render the data */}
                    {users.map(renderUser)}
                </tbody>
            </Table>
        </div>
    );
}
 
export default DataTable;