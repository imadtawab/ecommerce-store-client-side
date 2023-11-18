import { createSlice , createAsyncThunk } from "@reduxjs/toolkit"
import { clientAPI } from "../API/axios-global"
import axios, { formToJSON } from "axios";
import { BsWindowSidebar } from "react-icons/bs";


export const client_getProducts = createAsyncThunk("products",
async (_, thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    return clientAPI.get("/products").then((docs) => {
        return docs.data
    }).catch(err => rejectWithValue(err))

})
// export const productDetails = createAsyncThunk("productDetails",
// async (id, thunkAPI) => {
//     const {rejectWithValue} = thunkAPI
//     return adminAPI.get("/products/"+id).then((docs) => {
//         console.log(docs,8529);
//         return docs.data
//     }).catch(err => rejectWithValue(err))

// })





const initState = {allProducts: [],
    client_getProductsStatus:{isLoading: false , error: false , success: false},
    }

const client_ProductsSlice = createSlice({
    name: "client_products",
    initialState: initState,
    reducers: {},
    extraReducers: {
        // GET products
        [client_getProducts.pending]: (state, action) => {
            console.log(action)
            state.client_getProductsStatus = {
                isLoading: true,
                error: false,
                success: false
            }
        },
        [client_getProducts.fulfilled]: (state, action) => {
            state.allProducts = action.payload
            state.client_getProductsStatus = {
                ...state.client_getProductsStatus,
                isLoading: false,
                success: action.payload
            }
        },
        [client_getProducts.rejected]: (state, action) => {
            console.log(action)
            state.client_getProductsStatus = {
                ...state.client_getProductsStatus,
                isLoading: false,
                error: action.payload.message
            }
        },
    }
})


export const counterActions = client_ProductsSlice.actions
export default client_ProductsSlice.reducer
