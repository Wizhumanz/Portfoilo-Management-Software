import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    user: null,
    updateEmail: ''
}

initialState.user = JSON.parse(localStorage.getItem('user'))
initialState.updateEmail = JSON.parse(localStorage.getItem('updateEmail'))

export const getUser = createAsyncThunk(
  "user/get",
  async (loginValue) => {
      const url = process.env.REACT_APP_API_URL + `/api/user/signin`
      return axios
          .post(url, loginValue, {
              headers: {
                  'Content-Type': 'application/json',
              },
          })
          .then(res => {
              return res.data
          })
          .catch(err => {
              throw err.response.data.message
          })
  }
);

export const updateUser = createAsyncThunk(
  "user/update",
  async ({user, editProfileValue}) => {
      const url = process.env.REACT_APP_API_URL + `/api/user/profile`
      return axios
          .put(url, editProfileValue, {
              headers: {
                  'Content-Type': 'application/json',
                  "Authorization": "Bearer " + user.jwt
              },
          })
          .then(res => {
              return res.data.user
          })
          .catch(err => {
              throw err.response.data.message;
          })
  }
);

export const loginSlice = createSlice({
  name: 'loginAuth',
  initialState,
  reducers: {
    login: (state, action) => {
        state.user = action.payload
        localStorage.setItem('user', JSON.stringify(state.user));
    },
    logout: (state) => {
        state.user = null
        localStorage.removeItem('user');
        localStorage.removeItem('updateEmail');
        localStorage.removeItem('propertyList');
    },
    updateUserDetail: (state, action) => {
        state.user = {...state.user, ...action.payload};
        localStorage.setItem('user', JSON.stringify(state.user));
    },
    setEmail: (state, action) => {
        state.updateEmail = action.payload
        localStorage.setItem('updateEmail', JSON.stringify(state.updateEmail));
    },
  },
  extraReducers: {
      [getUser.fulfilled]: (state, action) => {
          state.user = action.payload
          localStorage.setItem('user', JSON.stringify(state.user));
      },
      [updateUser.fulfilled]: (state, action) => {
          state.user = action.payload
          localStorage.setItem('user', JSON.stringify(state.user));
      }
  }
})

// Action creators are generated for each case reducer function
export const { login, logout, updateUserDetail, setEmail } = loginSlice.actions

export default loginSlice.reducer