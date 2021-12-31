import { useParams } from 'react-router-dom'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { createProperty } from '../../redux/features/property'

const CopyProperty = () => {
    const { id } = useParams()
    const { propertyList } = useSelector((state) => state.property)
    const property = propertyList.filter(({_id}) => _id === id)[0]
    
    const { user } = useSelector((state) => state.loginAuth)
    const dispatch = useDispatch()

    const [name, setName] = useState(`COPY ${property.name}`)
    const [holdingPeriod, setHoldingPeriod] = useState(property.holdingPeriod)
    const [showAlert, setShowAlert] = useState(null)

    const handleNameChange = (e) => {
        setName(e.target.value)
    }

    const handleHoldingPeriodChange = (e) => {
        setHoldingPeriod(e.target.value)
    }

    function nameExists(name) {
        return propertyList.some(function(el) {
            return el.name === name;
        })
    }
    
    // After 2 seconds set the alert to null
    const timer = () => {
        setTimeout(() => {
            setShowAlert(null);
        }, 2000);
    }

    const handleSubmit = async () => {
        // Prevent users from inputting negative years
        if (holdingPeriod < 1) {
            setShowAlert("Holding period cannot be below 1")
            timer()
            return
        }

        // Prevent users from inputting name that already exists
        if (nameExists(name.trim())) {
            setShowAlert("There is already a property with this name")
            timer()
            return
        }

        let newProperty = {...property, ["name"]: name, ["holdingPeriod"]: parseInt(holdingPeriod), ["dateCreated"]: undefined}
        delete newProperty._id
        try {
            await dispatch(createProperty({user, property: newProperty}))
        } catch (rejectedValueOrSerializedError) {
            // handle error here
            console.log(rejectedValueOrSerializedError)
        }

        setShowAlert("Property Copied!")
        timer()
    }

    return (
        <section id="EditProperty" className="container-fluid section-top-padding">
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <h1 className="header-margin">Copy Property</h1>
                                <input value={name} onChange={handleNameChange} type="text" className="form-control" aria-label="Copy property name" />
                                <label htmlFor="holdingPeriod" className="form-label form-group col-auto d-flex align-items-center">Holding Period</label>
                                <div className="col-auto">
                                    <div className="input-group form-group">
                                        <input value={holdingPeriod} min="1" onChange={handleHoldingPeriodChange} type="number" className="form-control" aria-label="Holding Period" aria-describedby="holdingYears" />
                                        <span className="input-group-text">Years</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            {showAlert}
                        </div>
                        <div>
                            <button onClick={handleSubmit} type="button" className="primary-button">Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
 
export default CopyProperty;