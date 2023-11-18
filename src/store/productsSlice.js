import { createSlice , createAsyncThunk } from "@reduxjs/toolkit"
import { adminAPI } from "../API/axios-global"
import axios, { formToJSON } from "axios";
import { BsWindowSidebar } from "react-icons/bs";

export const newProduct = createAsyncThunk("newProduct",
async (newProduct, thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    console.log(newProduct,10);
    return adminAPI.post("/products/new-product",newProduct,{
        headers:{
            'Content-Type': 
            `multipart/form-data;`,
        }
    }).then((docs) => {
        return {docs ,mss:"added product successefully"}
    }).catch(err => rejectWithValue(err))

})
export const updateProduct = createAsyncThunk("updateProduct",
async ({myId,data,oldImages,allImagesForDelete}, thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    let oldImagesArr = oldImages.map(old => `oldImages=${old}`).join("&")
    let allImagesForDeleteArr = allImagesForDelete.map(old => `allImages=${old}`).join("&")    
    return adminAPI.patch(`/products/editProduct/${myId}?${oldImagesArr}&oldImages=undefined&${allImagesForDeleteArr}&allImages=undefined}`,data,{
        headers:{
            'Content-Type': 
            `multipart/form-data;`,
        }
    }).then((docs) => {
        return {docs , mss:"update product successefully"}
    }).catch(err => rejectWithValue(err))

})
export const products = createAsyncThunk("products",
async (_, thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    return adminAPI.get("/products").then((docs) => {
        return docs.data
    }).catch(err => rejectWithValue(err))

})
export const productDetails = createAsyncThunk("productDetails",
async (id, thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    return adminAPI.get("/products/"+id).then((docs) => {
        console.log(docs,8529);
        return docs.data
    }).catch(err => rejectWithValue(err))

})
export const deleteProduct = createAsyncThunk("deleteProduct",
async (id, thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    return adminAPI.delete("/products/delete/"+id).then((docs) => {
        return id
    }).catch(err => rejectWithValue(err))

})
export const changeProductVisibility = createAsyncThunk("changeProductVisibility",
async ({id , visibility}, thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    return adminAPI.put("/products/change-visibility",{
        visibility , id
    }).then((docs) => {
        console.log(docs.data);
        return docs.data
    }).catch(err => rejectWithValue(err))

})
export const addVariants = createAsyncThunk("addVariants",
async ({id , variants , attributes}, thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    console.log(attributes,9996);
    return adminAPI.put("/products/add-variants",{
        variants , id , attributes
    }).then((docs) => {
        console.log(docs.data);
        return docs.data
    }).catch(err => rejectWithValue(err))

})
export const updateManyStatus_products = createAsyncThunk("updateManyStatus_products",
async ({items, status}, thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    return adminAPI.put("/products/update-many-status",{items, status}).then((docs) => {
        if(!docs.data.success){
            return rejectWithValue({message: docs.data.error})
          }
        return docs.data
    }).catch(err => rejectWithValue(err))
})
export const deleteManyStatus_products = createAsyncThunk("deleteManyStatus_products",
async (items, thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    return adminAPI.put("/products/delete-many-status",{items}).then((docs) => {
        if(!docs.data.success){
            return rejectWithValue({message: docs.data.error})
          }
        return docs.data
    }).catch(err => rejectWithValue(err))
})

const initState = {
    allProducts:[] ,
     newProductStatus:{isLoading: false , error: false , success: false},
     productsStatus:{isLoading: false , error: false , success: false},
     deleteProductStatus:{isLoading: false , error: false , success: false},
     changeProductVisibilityStatus:{isLoading: false , error: false , success: false},
     productDetailsStatus:{isLoading: false , error: false , success: false},
     updateProductStatus:{isLoading: false , error: false , success: false},
     addVariantsStatus:{isLoading: false , error: false , success: false},
     updateManyStatus_products_Status:{isLoading: false , error: false , success: false},
     deleteManyStatus_products_Status:{isLoading: false , error: false , success: false},
    }

const productsSlice = createSlice({
    name: "porducts",
    initialState: initState,
    reducers: {},
    extraReducers: {
        // POST new product
        [newProduct.pending]: (state, action) => {
            state.newProductStatus = {
                isLoading: true,
                error: false,
                success: false
            }
        },
        [newProduct.fulfilled]: (state, action) => {
            state.newProductStatus = {
                ...state.newProductStatus,
                isLoading: false,
                success: action.payload
            }
        },
        [newProduct.rejected]: (state, action) => {
            console.log(action.payload,"err");
            state.newProductStatus = {
                ...state.newProductStatus,
                isLoading: false,
                error: action.payload.message
            }
        },
        // GET products
        [products.pending]: (state, action) => {
            console.log(action)
            state.productsStatus = {
                isLoading: true,
                error: false,
                success: false
            }
        },
        [products.fulfilled]: (state, action) => {
            state.allProducts = action.payload
            state.productsStatus = {
                ...state.productsStatus,
                isLoading: false,
                success: true
            }
        },
        [products.rejected]: (state, action) => {
            console.log(action)
            state.productsStatus = {
                ...state.productsStatus,
                isLoading: false,
                error: action.payload.message
            }
        },
        // GET product details
        [productDetails.pending]: (state, action) => {
            console.log(action)
            state.productDetailsStatus = {
                isLoading: true,
                error: false,
                success: false
            }
        },
        [productDetails.fulfilled]: (state, action) => {
            state.productDetailsStatus = {
                ...state.productDetailsStatus,
                isLoading: false,
                success: action.payload
            }
            
        },
        [productDetails.rejected]: (state, action) => {
            console.log(action)
            state.productDetailsStatus = {
                ...state.productDetailsStatus,
                isLoading: false,
                error: action.payload.message
            }
        },
        // DELETE product
        [deleteProduct.pending]: (state, action) => {
            console.log(action)
            state.deleteProductStatus = {
                isLoading: true,
                error: false,
                success: false
            }
        },
        [deleteProduct.fulfilled]: (state, action) => {
            console.log(state.allProducts[0]._id,action.payload);
            state.allProducts  = state.allProducts.filter(prd => prd._id !== action.payload)
            state.deleteProductStatus = {
                ...state.deleteProductStatus,
                isLoading: false,
                success: true
            }
        },
        [deleteProduct.rejected]: (state, action) => {
            console.log(action)
            state.deleteProductStatus = {
                ...state.deleteProductStatus,
                isLoading: false,
                error: action.payload.message
            }
        },
        // PUT product visibility
        [changeProductVisibility.pending]: (state, action) => {
            console.log(action)
            state.changeProductVisibilityStatus = {
                isLoading: true,
                error: false,
                success: false
            }
        },
        [changeProductVisibility.fulfilled]: (state, action) => {
            state.allProducts = state.allProducts.map((prod) => {
                console.log(action.payload._id , action.payload.productStatus.visibility)
                if(prod._id === action.payload._id){
                    prod.productStatus.visibility = action.payload.productStatus.visibility
                }
                return prod
            })
            state.changeProductVisibilityStatus = {
                ...state.changeProductVisibilityStatus,
                isLoading: false,
                success: true
            }
        },
        [changeProductVisibility.rejected]: (state, action) => {
            state.changeProductVisibilityStatus = {
                ...state.changeProductVisibilityStatus,
                isLoading: false,
                error: action.payload.message
            }
        },
        // update Many Status product
        [updateManyStatus_products.pending]: (state, action) => {
            console.log(action)
            state.updateManyStatus_products_Status = {
                isLoading: true,
                error: false,
                success: false
            }
        },
        [updateManyStatus_products.fulfilled]: (state, action) => {
            state.allProducts = state.allProducts.map((prod) => {
                if(action.payload.data.items.indexOf(prod._id) !== -1){
                    return {
                        ...prod,
                        productStatus: {
                            ...prod.productStatus,
                            visibility: action.payload.data.status
                        }
                    }
                }
                return prod
            })
            // state.allProducts = state.allProducts.map((prod) => {
            //     console.log(action.payload._id , action.payload.productStatus.visibility)
            //     if(prod._id === action.payload._id){
            //         prod.productStatus.visibility = action.payload.productStatus.visibility
            //     }
            //     return prod
            // })
            console.log(action)
            state.updateManyStatus_products_Status = {
                ...state.updateManyStatus_products_Status,
                isLoading: false,
                success: action.payload.data.items.length + " Products Status Updated"
            }
        },
        [updateManyStatus_products.rejected]: (state, action) => {
            state.updateManyStatus_products_Status = {
                ...state.updateManyStatus_products_Status,
                isLoading: false,
                error: action.payload.message
            }
        },
        // delete Many product
        [deleteManyStatus_products.pending]: (state, action) => {
            console.log(action)
            state.deleteManyStatus_products_Status = {
                isLoading: true,
                error: false,
                success: false
            }
        },
        [deleteManyStatus_products.fulfilled]: (state, action) => {
            state.allProducts = state.allProducts.filter(prod => action.payload.data.items.indexOf(prod._id) === -1)
            console.log(action)
            state.deleteManyStatus_products_Status = {
                ...state.deleteManyStatus_products_Status,
                isLoading: false,
                success: action.payload.data.items.length + " Products Deleted"
            }
        },
        [deleteManyStatus_products.rejected]: (state, action) => {
            state.deleteManyStatus_products_Status = {
                ...state.deleteManyStatus_products_Status,
                isLoading: false,
                error: action.payload.message
            }
        },
        // put update product
        [updateProduct.pending]: (state, action) => {
            console.log(action);
            state.updateProductStatus = {
                isLoading: true,
                error: false,
                success: false
            }
        },
        [updateProduct.fulfilled]: (state, action) => {
            console.log(action);
            state.updateProductStatus = {
                ...state.updateProductStatus,
                isLoading: false,
                success: action.payload
            }
        },
        [updateProduct.rejected]: (state, action) => {
            console.log(action);
            state.updateProductStatus = {
                ...state.updateProductStatus,
                isLoading: false,
                error: action.payload.message
            }
        },
        // PUT add variants
        [addVariants.pending]: (state, action) => {
            console.log(action)
            state.addVariantsStatus = {
                isLoading: true,
                error: false,
                success: false
            }
        },
        [addVariants.fulfilled]: (state, action) => {
            state.addVariantsStatus = {
                ...state.addVariantsStatus,
                isLoading: false,
                success: true
            }
        },
        [addVariants.rejected]: (state, action) => {
            state.addVariantsStatus = {
                ...state.addVariantsStatus,
                isLoading: false,
                error: action.payload.message
            }
        },
    }
})


export const counterActions = productsSlice.actions
export default productsSlice.reducer
