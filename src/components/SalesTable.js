import { Table } from 'react-bootstrap';

const SalesTable = ({users}) => {
    const renderUser = (user, index) => {
        return (
            <tr key={index}>
                <td>{user.name}</td>
                <td>{user.age}</td>
            </tr>
        )
    }

    return (
        <div>
            <Table striped hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Age</th>
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
 
export default SalesTable;