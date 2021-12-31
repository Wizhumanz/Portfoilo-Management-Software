import { useLocation, Link } from "react-router-dom";
import { useHistory } from 'react-router';
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { VscWarning } from "react-icons/vsc";
import axios from 'axios'

import { login, updateUserDetail } from '../../redux/features/auth'

const EmailVerification = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const search = useLocation().search;
    const token = new URLSearchParams(search).get('token');
    const email = new URLSearchParams(search).get('email');

    const { updateEmail } = useSelector((state) => state.loginAuth)
    const { user } = useSelector((state) => state.loginAuth)
    const [linkExpired, setLinkExpired] = useState(false)

    useEffect(() => {
        emailVerified()
    }, [])

    const timer = () => {
        setTimeout(() => {
            history.push("/login")
        }, 2000);
    }

    const emailVerified = () => {
        const url = process.env.REACT_APP_API_URL + `/api/user/confirm-verify`
        axios
            .post(url, {email: email, token: token}, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then((res) => {
                // Update email only if its available
                if (updateEmail) {
                    dispatch(updateUserDetail({email: updateEmail}))
                }
                
                // Set verified to true
                if (user) {
                    dispatch(updateUserDetail({verified: true}))
                }

                // After 2 seconds head to homepage
                timer()
            })
            .catch(err => {
                console.log(err)
                setLinkExpired(true)
                return err;
            })
    }

    return (
        <main>
            {linkExpired ? 
                <div className="container">
                    <div className="row">
                        <div className="card card-center">
                            <div className="card-body center-notification">
                                <VscWarning className="icon"/>
                                <h2>This email verification link has expired.</h2>
                                <p><Link to="/">Go back to home page</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            :
                <div className="container">
                    <div className="row row-center">
                        <div className="card card-center">
                            <div className="card-body">
                                <h2 className="text-center">Email Verified!</h2>
                                <p className="text-center">You will be taken to homepage in a short while...</p>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </main>
    );
}
 
export default EmailVerification;