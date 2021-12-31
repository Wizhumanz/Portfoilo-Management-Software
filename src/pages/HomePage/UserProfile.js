import { MdEdit } from "react-icons/md";
import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit'

import userPicture from '../../images/user-picture.jpg';
import { updateUser } from '../../redux/features/auth'

const UserProfile = () => {
    const dispatch = useDispatch()

    const {user} = useSelector((state) => state.loginAuth)

    const [editProfileValue, setEditProfileValue] = useState(user)
    const [showProfile, setShowProfile] = useState(user)

    const handleChange = (e) => {
        setEditProfileValue({...editProfileValue, [e.target.name]: e.target.value})
    }

    // submit changed info
    const handleSubmit = async (e) => {
        e.preventDefault()
        
        try {
            let newUser = await dispatch(updateUser({user, editProfileValue}))
            setEditProfileValue(unwrapResult(newUser))
            setShowProfile(unwrapResult(newUser))
        } catch (rejectedValueOrSerializedError) {
            // handle error here
            console.log(rejectedValueOrSerializedError)
        }
    }

    return (
        <>
        {showProfile && 
        <div className="container">
            <div className="row profile">
                <div className="col-3">
                    <div className="card">
                        <div className="card-body">
                            <div className="text-center">
                                <img draggable="false" src={userPicture} className="img-thumbnail" alt="user-picture" />
                                <h4>{showProfile.firstName} {showProfile.lastName}</h4>
                                <h5>{showProfile.description}</h5>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-9">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-6">
                                    <h1>Your Profile</h1>
                                </div>
                                <div className="col-6 text-end">
                                    {/* Button for edit popup */}
                                    <button type="button" className="edit-btn" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                        <MdEdit className="edit-icon"/>
                                    </button>
                                </div>
                            </div>
                            <div className="row list-dashboard">
                                <div className="col-6">
                                    <ul className="">
                                        <li>First Name: {showProfile.firstName}</li>
                                        <li>Country: {showProfile.country}</li>
                                        <li>Company: {showProfile.company}</li>
                                        <li>Age: {showProfile.age}</li>
                                        <li>Phone: {showProfile.phone}</li>
                                    </ul>
                                </div>
                                <div className="col-6">
                                    <ul className="">
                                        <li>Last Name: {showProfile.lastName}</li>
                                        <li>State: {showProfile.state}</li>
                                        <li>Email: {showProfile.email}</li>
                                        <li>Profile Role: {showProfile.profileRole}</li>
                                        <li>Verified: {showProfile.verified.toString()}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-12">
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
                                options={{
                                    responsive: true,
                                    plugins: {
                                        title: {
                                            display: true,
                                            text: 'Number of logins this week',
                                            font: {
                                                size: 20
                                            }
                                        }
                                    }
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Pop up for edit */}
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Edit Profile</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="firstName">First Name</label>
                                    <input value={editProfileValue.firstName} onChange={handleChange} name="firstName" type="text" className="form-control" id="firstName" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="lastName">Last Name</label>
                                    <input value={editProfileValue.lastName} onChange={handleChange} name="lastName" type="text" className="form-control" id="lastName" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="birthday">Age</label>
                                    <input value={editProfileValue.age} onChange={handleChange} name="age" type="number" className="form-control" id="age" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="country">Country</label>
                                    <input value={editProfileValue.country} onChange={handleChange} name="country" type="text" className="form-control" id="country" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="state">State</label>
                                    <input value={editProfileValue.state} onChange={handleChange} name="state" type="text" className="form-control" id="state" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="company">Company</label>
                                    <input value={editProfileValue.company} onChange={handleChange} name="company" type="text" className="form-control" id="company" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input value={editProfileValue.email} onChange={handleChange} name="email" type="text" className="form-control" id="email" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="phone">Phone</label>
                                    <input value={editProfileValue.phone} onChange={handleChange} name="phone" type="text" className="form-control" id="phone" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="address">Profile Role</label>
                                    <input value={editProfileValue.profileRole} onChange={handleChange} name="profileRole" type="text" className="form-control" id="profileRole" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="description">Description</label>
                                    <input value={editProfileValue.description} onChange={handleChange} name="description" type="text" className="form-control" id="description" />
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="secondary-button" data-bs-dismiss="modal">Exit</button>
                                    <button type="submit" className="primary-button" data-bs-dismiss="modal">Save</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        }
        </>
    );
}
 
export default UserProfile;