import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios'

import { updateUserDetail, setEmail } from '../../redux/features/auth'

import accessDenied from '../../images/access-denied.png'

const Settings = () => {
    const dispatch = useDispatch()

    const {user} = useSelector((state) => state.loginAuth)

    const [showSubmit, setShowSubmit] = useState('');
    const [showError, setShowError] = useState('');
    const [changeEmail, setChangeEmail] = useState({email: '', username: user.username});
    const [changePassword, setChangePassword] = useState({oldPassword: '', newPassword: ''});
    const [changeUsername, setChangeUsername] = useState({username: ''});

    // After 2 seconds set the alert to none
    const timer = () => {
        setTimeout(() => {
            setShowSubmit('')
            setShowError('')
        }, 2000);
    }

    const handleChange = (e) => {
        if (e.target.name === "email") {
            setChangeEmail({...changeEmail, [e.target.name]: e.target.value})
        }

        if (e.target.name === "oldPassword" || e.target.name === "newPassword") {
            setChangePassword({...changePassword, [e.target.name]: e.target.value})
        }

        if (e.target.name === "username") {
            setChangeUsername({...changeUsername, [e.target.name]: e.target.value})
        }
    }

    const handleSubmit = (e, endpoint, info) => {
        e.preventDefault()

        const url = process.env.REACT_APP_API_URL + endpoint
        axios
            .put(url, info, {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + user.jwt
                },
            })
            .then(res => {
                if (e.target.name === "Email") {
                    dispatch(setEmail(changeEmail.email))
                    setChangeEmail({email: '', username: user.username})
                    setShowSubmit(`${e.target.name} sent to inbox!`)
                }
                if (e.target.name === "Password") {
                    setChangePassword({oldPassword: '', newPassword: ''})
                    setShowSubmit(`${e.target.name} updated successfully!`)
                }
                if (e.target.name === "Username") {
                    dispatch(updateUserDetail(changeUsername))
                    setChangeUsername({username: ''})
                    setShowSubmit(`${e.target.name} updated successfully!`)
                }
                window.scrollTo(0, 0)
                timer()
            })
            .catch(err => {
                setShowError(err.response.data.message)
                window.scrollTo(0, 0)
                timer()
            })
    }

    return (
        <section id="Settings" className="container-fluid section-top-padding">
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                {user.verified ?
                                    <>
                                        {showSubmit && <div className="alert alert-success" role="alert">{showSubmit}</div>}
                                        {showError && <div className="alert alert-danger" role="alert">{showError}</div>}
                                        <h1 className="header-margin">Settings</h1>
                                        <div className="accordion">
                                            <div className="accordion-item">
                                                <h2 className="accordion-header" id="headingOne">
                                                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                    Change Email
                                                </button>
                                                </h2>
                                                <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                                    <div className="accordion-body">
                                                        <form onSubmit={(e) => handleSubmit(e, '/api/user/verify', changeEmail)} name="Email">
                                                            <div className="col">
                                                                <label htmlFor="email">New Email</label>
                                                                <input value={changeEmail.email} onChange={handleChange} type="text" name="email" required/>
                                                            </div>
                                                            <button type="button" className="primary-button" type="submit">Update Email</button>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="accordion-item">
                                                <h2 className="accordion-header" id="headingTwo">
                                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                                    Change Password
                                                </button>
                                                </h2>
                                                <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                                    <div className="accordion-body">
                                                        <form onSubmit={(e) => handleSubmit(e, '/api/user/change-password', changePassword)} name="Password">
                                                            <div className="col">
                                                                <label htmlFor="oldPassword">Old Password</label>
                                                                <input value={changePassword.oldPassword} onChange={handleChange} type="password" name="oldPassword" required/>
                                                            </div>
                                                            <div className="col">
                                                                <label htmlFor="newPassword">New Password</label>
                                                                <input value={changePassword.newPassword} onChange={handleChange} type="password" name="newPassword" required/>
                                                            </div>
                                                            <button type="button" className="primary-button" type="submit">Change Password</button>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="accordion-item">
                                                <h2 className="accordion-header" id="headingThree">
                                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                                    Change Username
                                                </button>
                                                </h2>
                                                <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                                                    <div className="accordion-body">
                                                        <form onSubmit={(e) => handleSubmit(e, '/api/user/profile', changeUsername)} name="Username">
                                                            <div className="col">
                                                                <label htmlFor="username">New Username</label>
                                                                <input value={changeUsername.username} onChange={handleChange} type="text" name="username" required/>
                                                            </div>
                                                            <button type="button" className="primary-button" type="submit">Update Username</button>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                : 
                                    <>
                                        <h1 className="display-4 pt-5 text-center">Please confirm your email address!</h1>
                                        <div className="row">
                                            <img src={accessDenied} draggable="false" className="empty-propertylist" alt="access-denied" />
                                        </div>
                                        <h3 className="margin-top-bottom-2 text-center">We need you to verify your email!</h3>
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Settings;