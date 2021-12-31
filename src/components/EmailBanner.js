import { useDispatch, useSelector } from 'react-redux';
import { useState, useRef } from 'react';
import axios from 'axios'
import { Toast } from 'bootstrap';

import favicon from '../images/Prim6 final logos/favicon.png';

const EmailBanner = () => {
    const dispatch = useDispatch()
    const notification = useRef()

    const {user} = useSelector((state) => state.loginAuth)

    const sendConfirmationEmail = () => {
        const url = process.env.REACT_APP_API_URL + `/api/user/verify`
            axios
                .put(url, {username: user.username, email: user.email}, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                .then(() => {
                })
                .catch(err => {
                    return err;
                })

        var toast = new Toast(notification.current)

        toast.show()
    }

    return (
        <main>
            <div className="banner text-center">
                <strong>Reminder:</strong> Please confirm your email address. If you have not received the email, click<button type="button" id="notificationBtn" className="buttonToLink" onClick={sendConfirmationEmail}>resend</button>
            </div>
            <div className="position-fixed bottom-0 end-0 p-3" style={{zIndex:11}}>
                <div ref={notification} id="notification" className="toast" role="alert" aria-live="assertive" aria-atomic="true">
                    <div className="toast-header">
                        <img draggable="false" src={favicon} className="notification-icon" alt="favicon"></img>
                        <strong className="me-auto">Notification</strong>
                        <small>Just now</small>
                        <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                    <div className="toast-body">
                        Email sent! Please check your email inbox!
                    </div>
                </div>
            </div>
        </main>
    );
}
 
export default EmailBanner;