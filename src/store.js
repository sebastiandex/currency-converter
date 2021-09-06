import { configureStore } from '@reduxjs/toolkit'
import currencyReducer from "./reducers/currencyReducer";
import {actions} from "./reducers/currencyReducer";

export default configureStore({
    reducer: currencyReducer
})
