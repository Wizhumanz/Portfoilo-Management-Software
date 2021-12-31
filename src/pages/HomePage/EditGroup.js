import { useState, useEffect, useRef } from 'react';
import { useParams, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Modal } from 'bootstrap';
import { CgTrashEmpty } from "react-icons/cg";
import { VscWarning } from "react-icons/vsc";

import { updateMultipleProperties } from '../../redux/features/property'

const EditGroup = () => {
    const { groupName } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()
    const deleteModalRef = useRef()
    
    const { user } = useSelector((state) => state.loginAuth)
    const { propertyList } = useSelector((state) => state.property)

    const [name, setName] = useState(groupName)
    const [notFound, setNotFound] = useState(false)
    const [showAlert, setShowAlert] = useState(null)
    const [deleteModal, setDeleteModal] = useState()
    const [deleteArray, setDeleteArray] = useState([])
    const [groupNames, setGroupNames] = useState([...new Set(propertyList.filter(({group}) => group.name !== "").map(({group}) => group.name))])
    const groupProperties = propertyList.filter(({group}) =>  group.name === groupName)

    useEffect(() => {
        if (propertyList.filter(({group}) => group.name === groupName).length === 0) {
            setNotFound(true)
            return
        }

        // Create Bootstrap modal for delete modal
        setDeleteModal(
            new Modal(deleteModalRef.current, { keyboard: false })
        )
    }, [])

    useEffect(async () => {
        // Update group names when propertyList is updated
        setGroupNames([...new Set(propertyList.filter(({group}) => group.name !== "").map(({group}) => group.name))])
    }, [propertyList])

    // 404 for incorrect group name
    if (notFound) {
        return <Redirect to="/404" />
    }
    
    // After 2 seconds set the alert to null
    const timer = () => {
        setTimeout(() => {
            setShowAlert(null);
        }, 2000);
    }

    const handleSubmit = (e) => {
        try {
            if (name === groupName || name === "") {
                return
            }

            if (groupNames.includes(name)) {
                setShowAlert("This group already exists!")
                timer()
                return
            }

            const group = {"name": name, "backgroundColor": groupProperties[0].group.backgroundColor, "color": groupProperties[0].group.color}
            
            dispatch(updateMultipleProperties({ user, info: { ids: groupProperties.map((property) => { return property._id }), group: group } }))
            history.push(`/group/${name}`)
            setShowAlert("Name Changed!")
            
            timer()

        } catch (rejectedValueOrSerializedError) {
            // handle error here
            console.log(rejectedValueOrSerializedError)
        }
    }

    const handleDelete = (id) => {
        setDeleteArray([id])

        // Delete popup show
        deleteModal.show()
    }

    const handleDeleteAll = () => {
        if (groupProperties.length === 0) {
            return
        }

        setDeleteArray(groupProperties.map((property) => { return property._id }))

        // Delete popup show
        deleteModal.show()
    }

    const handleDeleteSubmit = () => {
        try {
            const group = {"name": "", "backgroundColor": "", "color": ""}

            dispatch(updateMultipleProperties({ user, info: { ids: deleteArray, group: group } }))

            // Delete popup hide
            deleteModal.hide()
        } catch (rejectedValueOrSerializedError) {
            // handle error here
            console.log(rejectedValueOrSerializedError)
        }
    }

    return (
        <main>
            <div className="container">
                <div ref={deleteModalRef} className="modal" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-body center-notification">
                                <VscWarning className="icon" />
                                <h2>Are You Sure?</h2>
                                <p>The group name will be removed from {deleteArray.length > 1 ? "these properties" : "this property"}</p>
                            </div>
                            <div className="d-flex justify-content-center">
                                <button type="button" className="secondary-button" data-bs-dismiss="modal">Close</button>
                                <button onClick={handleDeleteSubmit} type="button" className="danger-button">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="card card-center mb-4">
                        <div className="card-body">
                            <h1 className="header-margin">Edit Group</h1>
                            <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="form-control form-group" name="name"/>
                            <button type="button" onClick={handleSubmit} className="primary-button">Save</button>
                        </div>
                        <div>
                            {showAlert}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="card card-center mt-0">
                        <div className="card-body">
                            <div className="d-flex justify-content-end">
                                <button className="primary-button" onClick={handleDeleteAll}>Clear All</button>
                            </div>
                            {propertyList.filter(({group}) => group.name === groupName).map((prop, index) => 
                                <div key={index} className="edit-group d-flex justify-content-between d-flex align-items-center">{prop.name}
                                    <button onClick={() => handleDelete(prop._id)} type="button" className="delete-btn">
                                        <CgTrashEmpty className="edit-icon"/>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
 
export default EditGroup;