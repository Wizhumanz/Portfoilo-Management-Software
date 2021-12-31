import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import axios from 'axios'

import accessDenied from '../../images/access-denied.png'

const Support = () => {
    const { user } = useSelector((state) => state.loginAuth)
    const { propertyList } = useSelector((state) => state.property)

    const [showSubmit, setShowSubmit] = useState('');
    const [showError, setShowError] = useState('');
    const [profileInfoFilled, setProfileInfoFilled] = useState(true);
    const [supportInfo, setSupportInfo] = useState({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        specificProp: "None",
        subject: "",
        description: ""
    })

    useEffect(() => {
        Object.entries(user).forEach(([key, value]) => {
            if (value === "") {
                setProfileInfoFilled(false)
            }
        })
    }, [])

    // After 2 seconds set the alert to none
    const timer = () => {
        setTimeout(() => {
            setShowSubmit('')
            setShowError('')
        }, 2000);
    }

    const handleChange = (e) => {
        setSupportInfo({...supportInfo, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const url = process.env.REACT_APP_API_URL + `/api/property/support`
        axios
            .post(url, supportInfo, {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + user.jwt
                },
            })
            .then(res => {
                setSupportInfo({
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    specificProp: "None",
                    subject: "",
                    description: ""
                })
                setShowSubmit(res.data.message)
                window.scrollTo(0, 0)
                timer()
            })
            .catch(err => {
                setShowError(err.response.data.message)
                window.scrollTo(0, 0)
                timer()
                return err;
            })
    }

    return (
        <main>
            <div className="container">
                <div className="row">
                    <div className="card card-center">
                        <div className="card-body">
                            {profileInfoFilled ? 
                                <>
                                    {showSubmit && <div className="alert alert-success" role="alert">{showSubmit}</div>}
                                    {showError && <div className="alert alert-danger" role="alert">{showError}</div>}
                                    <h1 className="header-margin">Support</h1>
                                    <form onSubmit={handleSubmit}>
                                        <div className="row">
                                            <div className="col-6 form-group">
                                                <label htmlFor="firstName">First Name</label>
                                                <input className="form-control p-2" value={user.firstName} onChange={handleChange} type="text" name="firstName" disabled/>
                                            </div>
                                            <div className="col-6 form-group">
                                                <label htmlFor="lastName">Last Name</label>
                                                <input className="form-control p-2" value={user.lastName} onChange={handleChange} type="text" name="lastName" disabled/>
                                            </div>
                                            <div className="col-12 form-group">
                                                <label htmlFor="email">Email</label>
                                                <input className="form-control p-2" value={user.email} onChange={handleChange} type="text" name="email" disabled/>
                                            </div>
                                            <div className="col-12 form-group">
                                                <label htmlFor="specificProp">Choose specific property name if applies (Optional)</label>
                                                <div className="input-group mb-3">
                                                    <select name="specificProp" className="form-select p-2" value={supportInfo.specificProp} onChange={handleChange} aria-label="Default select example">
                                                        <option value="None" defaultValue>None</option>
                                                        {propertyList.map(({name}, index) => <option key={index} value={name}>{name}</option>)}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-12 form-group">
                                                <label htmlFor="subject">Subject</label>
                                                <input className="form-control p-2" value={supportInfo.subject} onChange={handleChange} type="text" name="subject" required/>
                                            </div>
                                            <div className="col-12 form-group">
                                                <label htmlFor="description">Description</label>
                                                <textarea className="form-control p-2" value={supportInfo.description} onChange={handleChange} type="text" name="description" required/>
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <button type="submit" className="primary-button">Submit</button>
                                        </div>
                                    </form>
                                </>
                            :
                                <>
                                    <h1 className="display-1 pt-5 text-center">Sorry!</h1>
                                    <div className="row">
                                        <img src={accessDenied} draggable="false" className="empty-propertylist" alt="access-denied" />
                                    </div>
                                    <h3 className="margin-top-bottom-2 text-center">We need you to fill in your profile information first!</h3>
                                </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
 
export default Support;