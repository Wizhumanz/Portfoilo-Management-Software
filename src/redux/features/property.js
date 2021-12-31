import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    propertyList: []
}

initialState.propertyList = JSON.parse(localStorage.getItem('propertyList'))

export const createProperty = createAsyncThunk(
    "property/create",
    async ({user, property}) => {
        const url = process.env.REACT_APP_API_URL + `/api/property/new`
        return axios
            .post(url, property, {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + user.jwt
                },
            })
            .then(res => {
                return res.data.message
            })
            .catch(err => {
                throw err.response.data.message;
            })
    }
);

export const getPropertyList = createAsyncThunk(
    "property/get",
    async (user) => {
        const url = process.env.REACT_APP_API_URL + `/api/property/all`
        return axios
            .get(url, {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + user.jwt
                },
            })
            .then(res => {
                return res.data.properties
            })
            .catch(err => {
                throw err.response.data.message;
            })
    }
);

export const updateProperty = createAsyncThunk(
    "property/update",
    async ({user, property}) => {
        const url = process.env.REACT_APP_API_URL + `/api/property/edit/${property._id}`
        return axios
            .put(url, property, {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + user.jwt
                },
            })
            .then(res => {
                return res.data.property
            })
            .catch(err => {
                throw err.response.data.message;
            })
    }
);

export const updateMultipleProperties = createAsyncThunk(
    "property/updateMultiple",
    async ({user, info}) => {
        const url = process.env.REACT_APP_API_URL + `/api/property/edit`
        return axios
            .put(url, info, {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + user.jwt
                },
            })
            .then(res => {
                return res.data.properties
            })
            .catch(err => {
                throw err.response.data.message;
            })
    }
);

export const deleteProperty = createAsyncThunk(
    "property/delete",
    async ({user, propIdArr}) => {
        const url = process.env.REACT_APP_API_URL + `/api/property/delete`
        return axios
            .delete(url, {
                data: propIdArr,
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + user.jwt
                }, 
            })
            .then(res => {
                return res.data.message
            })
            .catch(err => {
                throw err.response.data.message;
            })
    }
);

export const propertyInflation = createAsyncThunk(
    "inflation/get",
    async ({user, propertyId}) => {
        const url = process.env.REACT_APP_API_URL + `/api/property/${propertyId}/inflation`
        return axios
            .get(url, {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + user.jwt
                }, 
            })
            .then(res => {
                return res.data.message
            })
            .catch(err => {
                return err.response;
            })
    }
);

export const updatePropertyInflation = createAsyncThunk(
    "inflation/update",
    async ({user, propertyId, propertyInflations}) => {
        const url = process.env.REACT_APP_API_URL + `/api/property/${propertyId}/update-inflation`
        return axios
            .post(url, {
                inflations: propertyInflations,
            
            })
            .then(res => {
                return res.data.message
            })
            .catch(err => {
                return err.response;
            })
    }
);

export const propertySlice = createSlice({
    name: 'property',
    initialState,
    reducers: {
        setInitialState: (state, action) => {
            state.propertyList = action.payload
            localStorage.setItem('propertyList', JSON.stringify(state.propertyList));
        }
    },
    extraReducers: {
        [createProperty.fulfilled]: (state, action) => {
            state.propertyList.push(action.payload)
            localStorage.setItem('propertyList', JSON.stringify(state.propertyList));
        },
        [getPropertyList.fulfilled]: (state, action) => {
            state.propertyList = action.payload
            localStorage.setItem('propertyList', JSON.stringify(state.propertyList));
        },
        [updateProperty.fulfilled]: (state, action) => {
            let indexOfProp = state.propertyList.indexOf(state.propertyList.filter(({_id}) => _id === action.payload._id)[0])
            state.propertyList[indexOfProp] = action.payload
            localStorage.setItem('propertyList', JSON.stringify(state.propertyList));
        },
        [updateMultipleProperties.fulfilled]: (state, action) => {
            state.propertyList = action.payload
            localStorage.setItem('propertyList', JSON.stringify(state.propertyList));
        },
        [deleteProperty.fulfilled]: (state, action) => {
            state.propertyList = state.propertyList.filter(({_id}) => {
                return !action.payload._id.includes(_id)
            })
            localStorage.setItem('propertyList', JSON.stringify(state.propertyList));
        },
        [propertyInflation.fulfilled]: (state, action) => {
            state.inflations = action.payload;
        } 
    }
})

export const { setInitialState } = propertySlice.actions

export default propertySlice.reducer