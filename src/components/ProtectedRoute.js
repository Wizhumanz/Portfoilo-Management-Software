import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { useLayoutEffect } from 'react';

import Navbar from './Navbar'
import EmailBanner from './EmailBanner'

const ProtectedRoute = ({isAuth: isAuth, component: Component, ...rest}) => {
    const { propertyList } = useSelector((state) => state.property)

    useLayoutEffect(() => {
        window.scrollTo(0, 0)
    });

    const locationIsProperty = () => {
        if (propertyList.some(function(el) {
            return el._id === rest.location.pathname.split("/")[1];
        })) {
            return true
        }

        return false
    }

    return (
        <Route {...rest}>
            {rest.navbarOmit ? null : locationIsProperty() && <Navbar />}
            {isAuth && !isAuth.verified && <EmailBanner />}
            {isAuth ? <Component /> : <Redirect to="/login" />}
        </Route>
    );
}
 
export default ProtectedRoute;
