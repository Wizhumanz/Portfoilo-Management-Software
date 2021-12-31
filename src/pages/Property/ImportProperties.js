import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios'

import { getPropertyList } from '../../redux/features/property'

const ImportProperties = () => {
    const dispatch = useDispatch()
    const ref = useRef();
    const {user} = useSelector((state) => state.loginAuth)

    const [selectedFile, setSelectedFile] = useState(null);
    const [showError, setShowError] = useState("")
    const [showSubmit, setShowSubmit] = useState("")

    const timer = () => {
        setTimeout(() => {
            setShowError(null)
            setShowSubmit(null)
        }, 3000);
    }

    const handleChange = (e) => {
        setSelectedFile(e.target.files[0])
    }

    const handleSubmit = () => {
        if (selectedFile === null) {
            return
        }

        const fileFormat = selectedFile.name.split(".")[selectedFile.name.split(".").length - 1]

        if (fileFormat !== "csv" && fileFormat !== "xlsx") {
            setShowError(["Incorrect format. Must be CSV or XLSX file."])
            ref.current.value = "";
            timer()
            return
        }

        let url
        let formData = new FormData();
        
        if (fileFormat === "csv") {
            url = process.env.REACT_APP_API_URL + `/api/property/importCSV`
            formData.append("csv", selectedFile);
        } else {
            url = process.env.REACT_APP_API_URL + `/api/property/importXLSX`
            formData.append("xlsx", selectedFile);
        }

        axios
            .post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    "Authorization": "Bearer " + user.jwt
                },
            })
            .then(async (res) => {
                setShowSubmit(res.data.message)
                ref.current.value = "";
                
                try {
                    // Fetch property list from database
                    await dispatch(getPropertyList(user))
                } catch (rejectedValueOrSerializedError) {
                    // handle error here
                    console.log(rejectedValueOrSerializedError)
                }

                timer()
            })
            .catch(err => {
                ref.current.value = "";
                setShowError(err.response.data.message)
                timer()
            })
    }

    return (
        <main>
            <div className="container">
                <div className="row row-center">
                    <div className="card card-center">
                        <div className="card-body">
                            {showSubmit && <div className="alert alert-success" role="alert">{showSubmit}</div>}
                            {showError && showError.map((message) => <div className="alert alert-danger" role="alert">{message}</div>)}
                            <h1 className="header-margin">Import Properties</h1>
                            <div className="text-center">
                                <div className="input-group mb-3">
                                    <input type="file" className="form-control" ref={ref} onChange={handleChange} />
                                </div>
                                <button type="button" className="primary-button" onClick={handleSubmit}>Import</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
 
export default ImportProperties;