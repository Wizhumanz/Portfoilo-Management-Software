import { configureStore } from '@reduxjs/toolkit'
import loginReducer from './features/auth.js'
import propertyReducer from './features/property.js'

export const store = configureStore({
  reducer: {
      loginAuth: loginReducer,
      property: propertyReducer,
  },
})