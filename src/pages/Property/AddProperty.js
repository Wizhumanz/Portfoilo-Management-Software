import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { createProperty } from '../../redux/features/property'

const AddProperty = () => {
    const { user } = useSelector((state) => state.loginAuth)
    const { propertyList } = useSelector((state) => state.property)
    const dispatch = useDispatch()

    const [newProperty, setNewProperty] = useState({
        name: "",
        holdingPeriod: null,
        analysisStart: "",
        propType: "Industrial",
        sizeByMonth: {
            size: [],
            month: [0]
        },
    })
    const [showAlert, setShowAlert] = useState(null)

    // After 2 seconds set the alert to null
    const timer = () => {
        setTimeout(() => {
            setShowAlert(null);
        }, 2000);
    }

    function nameExists(name) {
        return propertyList.some(function (el) {
            return el.name === name;
        })
    }

    const handleChange = (e) => {
        if (e.target.name == "size") {
            let tempArray = [parseInt(e.target.value)]
            setNewProperty({ ...newProperty, ["sizeByMonth"]: { ["month"]: [0], [e.target.name]: tempArray } })
        } else {
            setNewProperty({ ...newProperty, [e.target.name]: e.target.value })
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        // Prevent users from inputting name that already exists
        if (nameExists(newProperty.name.trim())) {
            setShowAlert("There is already a property with this name")
            timer()
            return
        }

        try {
            await dispatch(createProperty({ user, property: newProperty }))
        } catch (rejectedValueOrSerializedError) {
            // handle error here
            console.log(rejectedValueOrSerializedError)
        }

        setNewProperty({
            name: "",
            holdingPeriod: "",
            analysisStart: "",
            propType: "Industrial",
            sizeByMonth: {
                "size": [],
                "month": [0]
            },
        })
        setShowAlert("Property Added!")
        timer()
    }

    return (
        <section id="AddProperty" className="container-fluid section-top-padding">
            <div className="card">
                <div className="card-body">
                    <h1 className="header-margin">Add Property</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-4 form-group">
                                <label htmlFor="name">Property name</label>
                                <input className="form-control p-2" value={newProperty.name} onChange={handleChange} type="text" name="name" required placeholder="Enter name" />
                            </div>
                            <div className="col-4 form-group">
                                <label htmlFor="analysisStart">Analysis start date</label>
                                <input className="form-control p-2" value={newProperty.analysisStart} onChange={handleChange} type="date" name="analysisStart" />
                            </div>
                            <div className="col-4 form-group">
                                <label htmlFor="holdingPeriod">Holding period(Years)</label>
                                <input className="form-control p-2" value={newProperty.holdingPeriod} onChange={handleChange} min="1" type="number" name="holdingPeriod" required placeholder="Enter period" />
                            </div>
                            <div className="col-4 form-group">
                                <label htmlFor="propType">Property type</label>
                                <div className="input-group mb-3">
                                    <select value={newProperty.propType} onChange={handleChange} name="propType" className="form-select p-2" aria-label="Default select example">
                                        <option value="Industrial" defaultValue>Industrial</option>
                                        <option value="Office">Office</option>
                                        <option value="Multifamily">Multifamily</option>
                                        <option value="Self-storage">Self-storage</option>
                                        <option value="Retail">Retail</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-4 form-group">
                                <label htmlFor="size">Initial building size</label>
                                <input className="form-control p-2" value={newProperty.sizeByMonth.size} onChange={handleChange} min="1" type="number" name="size" required placeholder="Enter size"/>
                            </div>
                            <div className="col-12 form-group">
                                <button type="button" className="primary-button m-0" type="submit">Add Property</button>
                            </div>
                            <div>
                                {showAlert}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default AddProperty;