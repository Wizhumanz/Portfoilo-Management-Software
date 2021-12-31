import { useParams } from 'react-router-dom'
import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit'

import { updateProperty } from '../../redux/features/property'

const EditProperty = () => {
    const { id } = useParams()
    const { propertyList } = useSelector((state) => state.property)
    const property = propertyList.filter(({_id}) => _id === id)[0]

    const { user } = useSelector((state) => state.loginAuth)
    const dispatch = useDispatch()

    // Property is for backend and propertyValue is used to rerender when changed
    const [propertyValue, setPropertyValue] = useState(property)
    const [deleteValue, setDeleteValue] = useState([])
    const [checkBoxStatus, setCheckBoxStatus] = useState(new Array(property.sizeByMonth.size.length).fill(false))
    const [sizeValue, setSizeValue] = useState()
    const [monthValue, setMonthValue] = useState()
    const analysisDate = new Date(property.analysisStart)
    const [showSaveBtn, setShowSaveBtn] = useState(false)
    const [showAlert, setShowAlert] = useState(null)
    let saveBtn = useRef(true)

    // After 2 seconds set the alert to null
    const timer = () => {
        setTimeout(() => {
            setShowSaveBtn(false);
        }, 2000);
    }

    const handleChange = (e, index) => {
        let tempArray = propertyValue.sizeByMonth.size.slice()

        if (e.target.name == "size" || e.target.name == "month") {
            tempArray[index] = parseInt(e.target.value)
            setPropertyValue({...propertyValue, ["sizeByMonth"]: {...propertyValue.sizeByMonth, [e.target.name]: tempArray}})
        } else {
            setPropertyValue({...propertyValue, [e.target.name]: e.target.value})
        }
    }

    const handleSizeChange = (e) => {
        setSizeValue(e.target.value)
    }

    const handleMonthChange = (e) => {
        setMonthValue(e.target.value)
    }

    const handleDeleteChange = (e, index) => {
        // Managing checkbox status of each checkbox
        let updatedCheckedState = checkBoxStatus.map((item, i) =>
            index === i ? !item : item
        );
        setCheckBoxStatus(updatedCheckedState);

        let tempArray = deleteValue.slice()

        if (e.target.checked) {
            tempArray.push(index)
        } else {
            let i = tempArray.indexOf(index);
            tempArray.splice(i, 1);
        }
        tempArray.sort((a, b) => b - a);
        setDeleteValue(tempArray)
    }

    const handleSubmit = async () => {
        let tempProperty = propertyValue

        // Prevent users from not inputting both month and size values together
        if (sizeValue === undefined || sizeValue == "" || monthValue === undefined || monthValue === "") {
            if (sizeValue !== undefined && sizeValue !== "" || monthValue !== undefined && monthValue !== "") {
                setShowAlert("Please fill in both Month(number) and Building Size")
                return
            }
        }

        // Prevent users from inputting negative months
        if (monthValue < 0) {
            setShowAlert("Month cannot be below 0")
            return
        }

        // Prevents users from inputting months after the analysis period
        if (monthValue > property.holdingPeriod*12) {
            setShowAlert("Cannot include months after the analysis period")
            return
        }

        // Delete Rows
        if (deleteValue.length !== 0) {
            let tempSizeArr = [...tempProperty.sizeByMonth.size]
            let tempMonthArr = [...tempProperty.sizeByMonth.month]
            deleteValue.forEach((index) => {
                tempSizeArr.splice(index, 1)
                tempMonthArr.splice(index, 1)
            })
            tempProperty = {...propertyValue, ["sizeByMonth"]: {["size"]: tempSizeArr, ["month"]: tempMonthArr}}
        }

        if (sizeValue !== undefined && sizeValue !== "" && monthValue !== undefined && monthValue !== "") {
            if (tempProperty.sizeByMonth.month.includes(parseInt(monthValue))) {
                setShowAlert("That month already exists. Please create a new month")
                return
            }

            // Sort month array
            let tempMonthArray = [...tempProperty.sizeByMonth.month, parseInt(monthValue)]
            tempMonthArray.sort((a, b) => a - b);
            let sortedMonthArrIndex= tempMonthArray.indexOf(parseInt(monthValue))

            // Set size array according to the sorted month array
            let tempSizeArray = [...tempProperty.sizeByMonth.size]
            tempSizeArray.splice(sortedMonthArrIndex, 0, parseInt(sizeValue))

            tempProperty = {...tempProperty, ["sizeByMonth"]: {["size"]: tempSizeArray, ["month"]: tempMonthArray}}
        }

        // Resetting everything
        try {
            const res = await dispatch(updateProperty({user, property: tempProperty}))
            setPropertyValue({...unwrapResult(res)})
        } catch (rejectedValueOrSerializedError) {
            // handle error here
            console.log(rejectedValueOrSerializedError)
        }

        setCheckBoxStatus(new Array(property.sizeByMonth.size.length).fill(false))
        setDeleteValue([])
        setShowSaveBtn(true)
        timer()
        setShowAlert(null)
        saveBtn.current = false
        setSizeValue("")
        setMonthValue("")
    }

    return (
        <section id="EditProperty" className="container-fluid section-top-padding">
            <div className="row">
                <div className="col-12">
                    <div className="card card-margin">
                        <div className="card-body">
                            <h2 className="header-margin">Update property data</h2>
                            <input value={propertyValue.name} onChange={handleChange} type="text" className="form-control form-group" placeholder="Property Name" name="name"/>
                            <ul className="nav nav-tabs">
                                <li className="nav-item">
                                    <a className="nav-link active" id="building-size-tab" data-bs-toggle="tab" href="#building-size" role="tab" aria-controls="home" aria-selected="true">Building Size</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" id="analysis-tab" data-bs-toggle="tab" href="#analysis" role="tab" aria-controls="home" aria-selected="true">Analysis</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" id="address-tab" data-bs-toggle="tab" href="#address" role="tab" aria-controls="home" aria-selected="true">Address</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" id="setting-tab" data-bs-toggle="tab" href="#setting" role="tab" aria-controls="home" aria-selected="true">Settings</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" id="note-tab" data-bs-toggle="tab" href="#note" role="tab" aria-controls="home" aria-selected="true">Notes</a>
                                </li>
                            </ul>
                            <div className="tab-content" id="myTabContent">
                                <div className="tab-pane fade active show" id="building-size" role="tabpanel" aria-labelledby="building-size-tab">
                                    <div className="alert alert-primary" role="alert">
                                        Enter physical sizes of your property below. You must include one entry for month 1, which will provide a starting size used for occupancy rates. If your property’s size will change over the course of one holding
                                        period you can add additional months with new sizes. (your proforma spans <b>{property.holdingPeriod*12}</b> total months)
                                    </div>
                                    {showAlert &&
                                        <div className="alert alert-danger" role="alert">
                                            {showAlert}
                                        </div>
                                    }
                                    <div className="row">
                                        <div className="col-3">
                                            <label className="form-label form-group">Month (number)</label>
                                        </div>
                                        <div className="col-3">
                                            <label className="form-label form-group">Month (Date)</label>
                                        </div>
                                        <div className="col-6">
                                            <label className="form-label form-group">Building Size</label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        {/* Month (number) */}
                                        <div className="col-3">
                                            {propertyValue.sizeByMonth.month.map((m, index) => {
                                                return <input key={index} value={m} type="number" className="form-control form-group" disabled/>
                                            })}
                                            <input value={monthValue} onChange={handleMonthChange} type="number" min={1} name="month" className="form-control form-group"/>
                                        </div>
                                        {/* Month (Date) */}
                                        <div className="col-3">
                                            {propertyValue.sizeByMonth.month.map((m, index) => {
                                                return <input key={index} value={new Date(analysisDate.getFullYear(), analysisDate.getMonth() + m, analysisDate.getDate()).toDateString()}type="text" className="form-control form-group" disabled/>
                                            })}
                                            <input value={new Date(analysisDate.getFullYear(), analysisDate.getMonth() + parseInt(monthValue), analysisDate.getDate()).toDateString()} type="text" className="form-control form-group" disabled/>
                                        </div>
                                        {/* Building Size */}
                                        <div className="col-6">
                                            {propertyValue.sizeByMonth.size.map((s, index) => {
                                                return  <div key={index} className="row">
                                                            <div className="col-6">
                                                                <div className="input-group form-group">
                                                                    <input value={s} onChange={(e) =>handleChange(e, index)} name="size" type="number" className="form-control" aria-label="property size" aria-describedby="size"/>
                                                                    <span className="input-group-text">{property.sizeUnit}</span>
                                                                </div>
                                                            </div>
                                                            <div className="col-6 d-flex align-items-center">
                                                                {index !== 0 &&
                                                                    <div className="form-check">
                                                                        <input checked={checkBoxStatus[index]} onChange={(e) => handleDeleteChange(e, index)} className="form-check-input" type="checkbox" id={`deleteCheck${index}`} />
                                                                        <label className="form-check-label" htmlFor={`deleteCheck${index}`}>
                                                                            Delete
                                                                        </label>
                                                                    </div>
                                                                }
                                                            </div>
                                                        </div>
                                            })}
                                            <div className="row">
                                                <div className="col-6">
                                                    <div className="input-group form-group">
                                                        <input value={sizeValue} onChange={handleSizeChange} type="number" name="size" id="size2" className="form-control" placeholder="Total area" aria-label="property size" aria-describedby="size"/>
                                                        <span className="input-group-text" id="size">{property.sizeUnit}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="analysis" role="tabpanel" aria-labelledby="analysis-tab">
                                    <div className="row row-cols-1">
                                        <div className="col-3">
                                            <div className="col">
                                                <label htmlFor="analysisStart">Analysis start date</label>
                                                <input value={propertyValue.analysisStart} onChange={handleChange} type="date" name="analysisStart"/>
                                            </div>
                                            <div className="col">
                                                <label htmlFor="holdingPeriod">Holding period</label>
                                                <div className="input-group mb-3">
                                                    <input value={propertyValue.holdingPeriod} onChange={handleChange} name="holdingPeriod" type="number" className="form-control" aria-label="Holding period" aria-describedby="Holding period"/>
                                                    <span className="input-group-text">Years</span>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <label htmlFor="propType">Property type</label>
                                                <div className="input-group mb-3">
                                                    <select value={propertyValue.propType} onChange={handleChange} name="propType" className="form-select" aria-label="Default select example">
                                                        <option value="Industrial">Industrial</option>
                                                        <option value="Office">Office</option>
                                                        <option value="Multifamily">Multifamily</option>
                                                        <option value="Self-storage">Self-storage</option>
                                                        <option value="Retail">Retail</option>
                                                        <option value="Other">Other</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="address" role="tabpanel" aria-labelledby="address-tab">
                                    <div className="row row-cols-1">
                                        <div className="col-3">
                                            <div className="col">
                                                <label htmlFor="address">Address</label>
                                                <input value={propertyValue.address} onChange={handleChange} type="text" name="address"/>
                                            </div>
                                            <div className="col">
                                                <label htmlFor="city">City</label>
                                                <input value={propertyValue.city} onChange={handleChange} type="text" name="city"/>
                                            </div>
                                            <div className="col">
                                                <label htmlFor="zipCode">Zip code</label>
                                                <input value={propertyValue.zipCode} onChange={handleChange} type="text" name="zipCode"/>
                                            </div>
                                            <div className="col">
                                                <label htmlFor="state">State</label>
                                                <input value={propertyValue.state} onChange={handleChange} type="text" name="state"/>
                                            </div>
                                            <div className="col">
                                                <label htmlFor="country">Country</label>
                                                <input value={propertyValue.country} onChange={handleChange} type="text" name="country"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="setting" role="tabpanel" aria-labelledby="setting-tab">
                                    <div className="row row-cols-1">
                                        <div className="col-3">
                                            <div className="col">
                                                <label htmlFor="currencyUnit">Currency preference</label>
                                                <select value={propertyValue.currencyUnit} onChange={handleChange} name="currencyUnit" className="form-select" aria-label="Default select example">
                                                    <option value="$">$</option>
                                                    <option value="€">€</option>
                                                    <option value="£">£</option>
                                                    <option value="¥">¥</option>
                                                </select>
                                            </div>
                                            <div className="col">
                                                <label htmlFor="sizeUnit">Unit preference</label>
                                                <select value={propertyValue.sizeUnit} onChange={handleChange} name="sizeUnit" className="form-select" aria-label="Default select example">
                                                    <option value="SF">Square Feet</option>
                                                    <option value="SQM">Square Meters</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="note" role="tabpanel" aria-labelledby="note-tab">
                                    <textarea value={propertyValue.notes} onChange={handleChange} name="notes" className="form-control" rows="10" placeholder="Notes"></textarea>
                                </div>
                            </div>
                            {/* Save Btn */}
                            {showSaveBtn && <p>Changes saved</p>}
                            {<button type="button" onClick={handleSubmit} className="btn btn-success">Save</button>}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
 
export default EditProperty;