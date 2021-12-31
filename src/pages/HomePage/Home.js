import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router';
import { VscWarning } from "react-icons/vsc";
import { Modal } from 'bootstrap';
import { GoTriangleDown } from "react-icons/go";
import { GoTriangleUp } from "react-icons/go";

import emptyPropertyList from '../../images/empty-propertylist.png'
import { updateMultipleProperties, deleteProperty } from '../../redux/features/property'

const Home = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const deleteModalRef = useRef()
    const groupModalRef = useRef()

    const { user } = useSelector((state) => state.loginAuth)
    const { propertyList } = useSelector((state) => state.property)

    const [showAlert, setShowAlert] = useState("")
    const [showPropertyList, setShowProperyList] = useState(propertyList)
    const [showDeleteCompleted, setShowDeleteCompleted] = useState(false)
    const [deleteModal, setDeleteModal] = useState(null)
    const [groupModal, setGroupModal] = useState(null)
    const [filterProp, setFilterProp] = useState({ name: "", propType: "", dateCreated: "", holdingPeriod: "", analysisStart: "", groupName: "" })
    const [deleteProp, setDeleteProp] = useState(false)
    const [showIcon, setShowIcon] = useState({})
    const [groupProp, setGroupProp] = useState(false)
    const [checkBoxStatus, setCheckBoxStatus] = useState(showPropertyList.reduce((acc, cur) => ({ ...acc, [cur.name]: false }), {}))
    const [selectGroupName, setSelectGroupName] = useState("custom")
    const [customGroupName, setCustomGroupName] = useState("")
    const [groupNames, setGroupNames] = useState([...new Set(propertyList.filter(({group}) => group.name !== "").map(({group}) => group.name))])

    useEffect(() => {
        // Create Bootstrap modal for delete modal
        setDeleteModal(
            new Modal(deleteModalRef.current, { keyboard: false })
        )

        // Create Bootstrap modal for group modal
        setGroupModal(
            new Modal(groupModalRef.current, { keyboard: false })
        )

        // Resets the options once the Group name modal is closed
        window.addEventListener('hidden.bs.modal', () => {
            setCustomGroupName("")
            setSelectGroupName("custom")
        });

        // cleanup this component
        return () => {
            window.removeEventListener('hidden.bs.modal', () => {
                setCustomGroupName("")
                setSelectGroupName("custom")
            });
        };
    }, [])

    useEffect(async () => {
        // Updates when propertyList is updated or filtered
        if(propertyList){
            setShowProperyList(propertyList.filter(({ name, propType, holdingPeriod, dateCreated, analysisStart, group }) => {
                return name.toLowerCase().includes(filterProp.name.toLowerCase()) &&
                    propType.includes(filterProp.propType) &&
                    (holdingPeriod === parseInt(filterProp.holdingPeriod) || !filterProp.holdingPeriod) &&
                    dateCreated.includes(filterProp.dateCreated) &&
                    analysisStart.includes(filterProp.analysisStart) &&
                    group.name.includes(filterProp.groupName)
            }))
            setShowIcon({})
        }

        // Update group names when propertyList is updated
        setGroupNames([...new Set(propertyList.filter(({group}) => group.name !== "").map(({group}) => group.name))])
    }, [propertyList, filterProp])

    const filter = (e) => {
        let prop = { ...filterProp, [e.target.name]: e.target.value }
        setFilterProp(prop)
    }

    const selectProperty = (property) => {
        // Managing checkbox status of each checkbox
        setCheckBoxStatus({...checkBoxStatus, [property.name]: !checkBoxStatus[property.name]});
    }

    const handleDeleteToggle = () => {
        setDeleteProp(!deleteProp)
        setGroupProp(false)
        setCheckBoxStatus(showPropertyList.reduce((acc, cur) => ({ ...acc, [cur.name]: false }), {}))
    }

    const handleGroupToggle = () => {
        setGroupProp(!groupProp)
        setDeleteProp(false)
        setCheckBoxStatus(showPropertyList.reduce((acc, cur) => ({ ...acc, [cur.name]: false }), {}))
    }

    const handleDelete = () => {
        // Don't submit if no checkboxes are checked
        if (Object.values(checkBoxStatus).filter((status) => status === true).length === 0) {
            return
        }

        // Delete popup show
        deleteModal.show()
    }

    const handleGroups = () => {
        // Don't submit if no checkboxes are checked
        if (Object.values(checkBoxStatus).filter((status) => status === true).length === 0) {
            return
        }

        // Group popup show
        groupModal.show()
    }

    const handleDeleteSubmit = () => {
        try {
            dispatch(deleteProperty({ user, propIdArr: { _id: propertyList.filter((property) => checkBoxStatus[property.name]).map((property) => { return property._id }) } }))
            
            // Reset everything
            setShowDeleteCompleted(true)
            setDeleteProp(false)
            setCheckBoxStatus(showPropertyList.reduce((acc, cur) => ({ ...acc, [cur.name]: false }), {}))
            timer()
            setShowIcon({})

            // Delete popup hide
            deleteModal.hide()
        } catch (rejectedValueOrSerializedError) {
            // handle error here
            console.log(rejectedValueOrSerializedError)
        }
    }

    const handleGroupSubmit = () => {
        try {
            // Cannot submit without writing custom group name if that was chosen
            if (selectGroupName === "custom" && customGroupName === "") {
                return
            }

            // Cannot input custom name that already exists
            if (groupNames.includes(customGroupName.trim())) {
                setShowAlert("Name already exists!")
                timer()
                return
            }

            let group = {"name": "", "backgroundColor": "", "color": ""}
            if (selectGroupName === "custom") {
                let {backgroundColor, color} = colorGeneratorForGroupName()
                group.name = customGroupName
                group.backgroundColor = backgroundColor
                group.color = color
            } else {
                let tempProp = propertyList.filter(({group}) => group.name === selectGroupName)[0]
                group.name = selectGroupName
                group.backgroundColor = tempProp.group.backgroundColor
                group.color = tempProp.group.color
            }

            dispatch(updateMultipleProperties({ user, info: { ids: propertyList.filter((property) => checkBoxStatus[property.name]).map((property) => { return property._id }), group: group } }))
            
            // Reset everything
            setCheckBoxStatus(showPropertyList.reduce((acc, cur) => ({ ...acc, [cur.name]: false }), {}))
            setGroupProp(false)
            setCustomGroupName("")
            setSelectGroupName("custom")
            setShowIcon({})

            // Group popup hide
            groupModal.hide()
        } catch (rejectedValueOrSerializedError) {
            // handle error here
            console.log(rejectedValueOrSerializedError)
        }
    }

    const handleSort = (e) => {
        const propField = e.target.className

        let sortProperty = JSON.parse(JSON.stringify(showPropertyList))

        sortProperty.forEach(prop => {
            prop["groupName"] = prop.group.name
        })

        if (showIcon[propField] === 1) {
            // Reverse sort
            switch(propField) {
                case "name": case "propType": case "groupName":
                    sortProperty.sort(function(a,b) {
                        if(a[propField].toLowerCase() < b[propField].toLowerCase()) { return 1; }
                        if(a[propField].toLowerCase() > b[propField].toLowerCase()) { return -1; }
                        return 0;
                    });
                    break;
                case "dateCreated": case "analysisStart":
                    sortProperty.sort(function(a,b) {
                        if(a[propField] < b[propField]) { return 1; }
                        if(a[propField] > b[propField]) { return -1; }
                        return 0;
                    });
                    break;
                case "holdingPeriod":
                    sortProperty.sort(function(a,b) {
                        return b[propField] - a[propField];
                    });
                    break
                default:
                    break
            }
            setShowIcon({[propField]: 2})

        } else {
            // Sort based on order
            switch(propField) {
                case "name": case "propType": case "groupName":
                    sortProperty.sort(function(a,b) {
                        if(a[propField].toLowerCase() < b[propField].toLowerCase()) { return -1; }
                        if(a[propField].toLowerCase() > b[propField].toLowerCase()) { return 1; }
                        return 0;
                    });
                    break;
                case "dateCreated": case "analysisStart":
                    sortProperty.sort(function(a,b) {
                        if(a[propField] < b[propField]) { return -1; }
                        if(a[propField] > b[propField]) { return 1; }
                        return 0;
                    });
                    break;
                case "holdingPeriod":
                    sortProperty.sort(function(a,b) {
                        return a[propField] - b[propField];
                    });
                    break
                default:
                    break
            }
            setShowIcon({[propField]: 1})
        }

        setShowProperyList(sortProperty)
    }

    const handleGroupSelect = (e) => {
        setSelectGroupName(e.target.value)
        setCustomGroupName("")
    }

    // After 2 seconds set the alert to false
    const timer = () => {
        setTimeout(() => {
            setShowDeleteCompleted(false);
            setShowAlert("")
        }, 2000);
    }

    const colorGeneratorForGroupName = () => {
        const randomNum = Math.random()
        return {backgroundColor: "hsl(" + randomNum * 360 + ", 40%, 85%)", color: "hsl(" + randomNum * 360 + ", 40%, 35%)"}
    }

    const renderTableContent = (property, index) => {
        return (
            <tr key={index}>
                <td><Link to={property._id} className="link">{property.name}</Link></td>
                <td>{property.dateCreated}</td>
                <td>{property.holdingPeriod}</td>
                <td>{property.analysisStart}</td>
                {groupNames.length !== 0 && <td><div className={`group`} style={{backgroundColor: `${property.group.backgroundColor}`, color : `${property.group.color}`}}><Link to={`/group/${property.group.name}`} className="group-link">{property.group.name}</Link></div></td>}
                <td><div className={`type type-${property.propType}`}>{property.propType}</div></td>
                {deleteProp && <td><input checked={checkBoxStatus[property.name]} type="checkbox" onChange={() => selectProperty(property)} /></td>}
                {groupProp && <td><input checked={checkBoxStatus[property.name]} type="checkbox" onChange={() => selectProperty(property)} /></td>}
            </tr>
        )
    }

    return (
        <>
            {showPropertyList &&
                <section id="Home" className="container-fluid section-top-padding open-property">
                    <div ref={deleteModalRef} className="modal" tabIndex="-1">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-body center-notification">
                                    <VscWarning className="icon" />
                                    <h2>Are You Sure?</h2>
                                    <p>You will not be able to recover {Object.values(checkBoxStatus).filter((value) => value === true).length > 1 ? "these properties" : "this property"}</p>
                                </div>
                                <div className="d-flex justify-content-center">
                                    <button type="button" className="secondary-button" data-bs-dismiss="modal">Close</button>
                                    <button onClick={handleDeleteSubmit} type="button" className="danger-button">Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div ref={groupModalRef} className="modal" tabIndex="-1">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-body center-notification">
                                    <h2>Group Name</h2>
                                    <div className="col-12 form-group">
                                        <label htmlFor="groups">Select group name</label>
                                        <div className="input-group mb-3">
                                            <select name="groups" className="form-select p-2" value={selectGroupName} onChange={handleGroupSelect} aria-label="Default select example">
                                                <option value="custom" defaultValue>Create Name</option>
                                                <option disabled>──────────────────────────────</option>
                                                {groupNames.map((groupName, index) => <option key={index} value={groupName}>{groupName}</option>)}
                                            </select>
                                            {selectGroupName === "custom" &&
                                                <div className="col-12 form-group">
                                                    <label htmlFor="createGroupName">Create Custom Name</label>
                                                    <input className="form-control p-2" value={customGroupName} onChange={(e) => setCustomGroupName(e.target.value)} type="text" name="createGroupName"/>
                                                </div>
                                            }
                                        </div>
                                        <div>
                                            {showAlert}
                                        </div>
                                    </div>                                        
                                </div>
                                <div className="d-flex justify-content-center">
                                    <button type="button" className="secondary-button" data-bs-dismiss="modal">Close</button>
                                    <button onClick={handleGroupSubmit} type="button" className="tertiary-button">Group</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {propertyList.length === 0 ? 
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-6">
                                                <h1 className="header-margin">All Properties</h1>
                                            </div>
                                            <div className="col-6 d-flex justify-content-end">
                                                <button type="button" className="primary-button" onClick={() => history.push("/add-property")}>Add Property</button>
                                                <button type="button" className="primary-button" onClick={() => history.push("/import-properties")}>Import Properties</button>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <table className="tables">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Property Name</th>
                                                        <th scope="col">Date Created</th>
                                                        <th scope="col">Holding Period</th>
                                                        <th scope="col">Analysis Start Date</th>
                                                        <th scope="col">Property Type</th>
                                                    </tr>
                                                </thead>
                                            </table>
                                            <img src={emptyPropertyList} draggable="false" className="empty-propertylist" alt="empty-propertylist" />
                                            <p className="body-margin text-center">No properties added yet.</p>
                                            <p className="text-center">Click on the Add Property button to add your first property.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        :
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-6">
                                                <h1 className="header-margin">All Properties</h1>
                                            </div>
                                            <div className="col-6 d-flex justify-content-end">
                                                <button type="button" className="primary-button" onClick={() => history.push("/add-property")}>Add Property</button>
                                                <button type="button" className="primary-button" onClick={() => history.push("/import-properties")}>Import Properties</button>
                                                <button type="button" className="secondary-button" onClick={handleDeleteToggle}>Delete Property</button>
                                            </div>
                                        </div>
                                        <div className="row mt-4">
                                            <div className="col-4 form-group">
                                                <label htmlFor="name">Property name</label>
                                                <input value={filterProp.name} onChange={filter} className="form-control me-2 p-2" type="search" placeholder="Search" aria-label="Search Property names" name="name" />
                                            </div>
                                            <div className="col-4 form-group">
                                                <label htmlFor="analysisStart">Date created</label>
                                                <input className="form-control p-2" value={filterProp.dateCreated} onChange={filter} type="date" name="dateCreated" />
                                            </div>
                                            <div className="col-4 form-group">
                                                <label htmlFor="analysisStart">Analysis start date</label>
                                                <input className="form-control p-2" value={filterProp.analysisStart} onChange={filter} type="date" name="analysisStart" />
                                            </div>
                                            <div className="col-4 form-group">
                                                <label htmlFor="holdingPeriod">Holding period</label>
                                                <input className="form-control p-2" value={filterProp.holdingPeriod} onChange={filter} min="1" type="number" name="holdingPeriod" />
                                            </div>
                                            <div className="col-4 form-group">
                                                <label htmlFor="propType">Property type</label>
                                                <select value={filterProp.propType} name="propType" onChange={filter} className="form-select p-2">
                                                    <option value="" defaultValue>--Select--</option>
                                                    <option value="Industrial">Industrial</option>
                                                    <option value="Office">Office</option>
                                                    <option value="Multifamily">Multifamily</option>
                                                    <option value="Self-storage">Self-storage</option>
                                                    <option value="Retail">Retail</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                            </div>
                                            <div className="col-4 form-group">
                                                <label htmlFor="propType">Group Name</label>
                                                <select value={filterProp.groupName} name="groupName" onChange={filter} className="form-select p-2">
                                                    <option value="" defaultValue>--Select--</option>
                                                    {groupNames.map((name) => <option value={name}>{name}</option>)}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="d-flex justify-content-start">
                                                    <button type="button" className="primary-button" onClick={handleGroupToggle}>Group Properties</button>
                                                </div>
                                                <div className="d-flex justify-content-end">
                                                    {groupProp && <button type="button" onClick={handleGroups} className="tertiary-button">Group All</button>}
                                                </div>
                                                <div className="d-flex justify-content-end">
                                                    {deleteProp && <button type="button" onClick={handleDelete} className="danger-button">Delete All</button>}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            {showDeleteCompleted && <div className="alert alert-success" role="alert">Successfully Deleted!</div>}
                                            <table className="tables">
                                                <thead>
                                                    <tr>
                                                        <th scope="col" className="name" onClick={handleSort}>{showIcon["name"] === undefined ? <>Property Name</> : (showIcon["name"] === 1 ? <>Property Name <GoTriangleDown className="name"/></> : <>Property Name <GoTriangleUp className="name"/></>)}</th>
                                                        <th scope="col" className="dateCreated" onClick={handleSort}>{showIcon["dateCreated"] === undefined ? <>Date Created</> : (showIcon["dateCreated"] === 1 ? <>Date Created <GoTriangleDown className="dateCreated"/></> : <>Date Created <GoTriangleUp className="dateCreated"/></>)}</th>
                                                        <th scope="col" className="holdingPeriod" onClick={handleSort}>{showIcon["holdingPeriod"] === undefined ? <>Holding Period</> : (showIcon["holdingPeriod"] === 1 ? <>Holding Period <GoTriangleDown className="holdingPeriod"/></> : <>Holding Period <GoTriangleUp className="holdingPeriod"/></>)}</th>
                                                        <th scope="col" className="analysisStart" onClick={handleSort}>{showIcon["analysisStart"] === undefined ? <>Analysis Start</> : (showIcon["analysisStart"] === 1 ? <>Analysis Start <GoTriangleDown className="analysisStart"/></> : <>Analysis Start <GoTriangleUp className="analysisStart"/></>)}</th>
                                                        {groupNames.length !== 0 && <th scope="col" className="groupName" onClick={handleSort}>{showIcon["groupName"] === undefined ? <>Group Name</> : (showIcon["groupName"] === 1 ? <>Group Name <GoTriangleDown className="groupName"/></> : <>Group Name <GoTriangleUp className="groupName"/></>)}</th>}
                                                        <th scope="col" className="propType" onClick={handleSort}>{showIcon["propType"] === undefined ? <>Property Type</> : (showIcon["propType"] === 1 ? <>Property Type <GoTriangleDown className="propType"/></> : <>Property Type <GoTriangleUp className="propType"/></>)}</th>
                                                        {deleteProp && <th scope="col">Delete</th>}
                                                        {groupProp && <th scope="col">Group</th>}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {showPropertyList.map(renderTableContent)}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </section>
            }
        </>
    );
}

export default Home;
