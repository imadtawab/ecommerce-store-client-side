import { createSlice , createAsyncThunk } from "@reduxjs/toolkit"
import { adminAPI } from "../API/axios-global"

export const addAuthToState = createAsyncThunk("addAuthToState",
async (_auth, thunkAPI) => {
  const {rejectWithValue} = thunkAPI
  return adminAPI.get("/account/auth/addAuthToState",{
    headers: {"Authorization" : _auth},
  }).then(docs => {
    console.log(docs);
    if(!docs.data.success){
      return rejectWithValue({message: docs.data.error})
    }
      return docs.data
  }).catch(err => rejectWithValue(err))
})
export const registerUser = createAsyncThunk("registerUser" ,
async (user, thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    return adminAPI.post("/account/register",user).then(docs => {
      console.log(docs);
      if(!docs.data.success){
        console.log("object");
        return rejectWithValue({message: docs.data.error})
      }
        return docs.data
    }).catch(err => rejectWithValue(err))
})

export const loginUser = createAsyncThunk("loginUser" ,
async (user, thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    return adminAPI.post("/account/login",user).then(docs => {
      if(!docs.data.success){
        return rejectWithValue({message: docs.data.error})
      }
        return docs.data
    }).catch(err => rejectWithValue(err))
})
export const logout = createAsyncThunk("logout" ,
async () => {
    // const {rejectWithValue} = thunkAPI
    // return adminAPI.post("/account/login",user).then(docs => {
    //   if(!docs.data.success){
    //     return rejectWithValue({message: docs.data.error})
    //   }
    //     return docs.data
    // }).catch(err => rejectWithValue(err))
    return true
})
export const addToCard = createAsyncThunk("addToCard",
async ({finalyProduct1,variant}, thunkAPI) => {
  const {rejectWithValue} = thunkAPI
    if(localStorage.getItem("shoppingCard")){
      let cardArray = JSON.parse(localStorage.getItem("shoppingCard"))
      let productExist = await cardArray.find(prod => prod.productId === finalyProduct1.productId)
      if(productExist){
        let variantExist = await productExist.variants.find(v => v.variantId === variant.variantId)
        let newProduct
        if (variantExist) {
          newProduct = {
            ...productExist,
            variants: productExist.variants.map(v => {
              if(v.variantId === variant.variantId){
                return variant
              }
              return v
            })
          }
        }else{
          newProduct = {
            ...productExist,
            variants: [...productExist.variants , variant]
          }
        }
        
        console.log(newProduct);
        let newArray = cardArray.map(prod => {
          if (prod.productId === finalyProduct1.productId) {
            return newProduct
          }
          return prod
        })
        localStorage.setItem("shoppingCard", JSON.stringify(newArray))
        console.log(newArray);
        return newArray
      }else{
        let newProduct = {
          ...finalyProduct1,
          variants: [variant]
        }
        localStorage.setItem("shoppingCard", JSON.stringify([...JSON.parse(localStorage.getItem("shoppingCard")),newProduct]))
        return [newProduct]
      }
    }else{
        let newProduct = {
          ...finalyProduct1,
          variants: [variant]
        }
        localStorage.setItem("shoppingCard", JSON.stringify([newProduct]))
        return [newProduct]
    }
  // if(localStorage.getItem("shoppingCard")){
  //   // let productExist = JSON.parse(localStorage.getItem("shoppingCard")).find(p => p.product._id === product.product._id)
  //   let variantExist = JSON.parse(localStorage.getItem("shoppingCard")).find(p => p.variant.variantId === product.variant.variantId)
  //   // console.log(result);
  // if(variantExist) return rejectWithValue({message: "This Product Is Exist In Card"})
    
  //   localStorage.setItem("shoppingCard", JSON.stringify([...JSON.parse(localStorage.getItem("shoppingCard")) , product]))
  //   return [...JSON.parse(localStorage.getItem("shoppingCard")) , product]
  // }else{
  //   localStorage.setItem("shoppingCard", JSON.stringify([product]))
  //   return [product]
  // }
})
export const getShoppingCard = createAsyncThunk("getShoppingCard",
async (product, thunkAPI) => {
  const {rejectWithValue} = thunkAPI
  if(localStorage.getItem("shoppingCard")){
    
    return JSON.parse(localStorage.getItem("shoppingCard"))
  }else{
    return []
  }
})
export const deleteProductFromCard = createAsyncThunk("deleteProductFromCard",
async ({productId,variantId}, thunkAPI) => {
  const {rejectWithValue} = thunkAPI
  let cardArray = await JSON.parse(localStorage.getItem("shoppingCard"))
  let newArray = cardArray.map(prod => {
    //  prod.productId !== prod.variants[0].variantId
    if (prod.productId === productId) {
      if (prod.variants.length === 1 && prod.variants[0].variantId === variantId) {
        return false
      }
      return {...prod, variants: prod.variants.filter(v => v.variantId !== variantId)}
    }
      return prod
  }).filter(p => p !== false)
  console.log(newArray);
  // console.log(newArray);
  localStorage.setItem("shoppingCard", JSON.stringify(newArray))
  // return cardArray
  return newArray
})
export const changeQuantite = createAsyncThunk("changeQuantite",
async ({type, variantId}, thunkAPI) => {
  const {rejectWithValue} = thunkAPI
  let cardArray = await JSON.parse(localStorage.getItem("shoppingCard"))
  let newArray = cardArray.map(prod => {
    return {
      ...prod,
      variants: prod.variants.map(v => {
        if (v.variantId === variantId) {
          return {
            ...v,
            quantiteUser: type === "plus" ? v.quantiteUser < 10 ? v.quantiteUser + 1 : v.quantiteUser : v.quantiteUser > 1 ? v.quantiteUser - 1 : v.quantiteUser
          }
        }
        return v
      })
    }
  })
  // let newArray = cardArray.map(prod => {
  //   if (prod.productId === variantId) {
  //     if (prod.variants.length === 1 && prod.variants[0].variantId === variantId) {
  //       return false
  //     }
  //     return {...prod, variants: prod.variants.filter(v => v.variantId !== variantId)}
  //   }
  //     return prod
  // }).filter(p => p !== false)
  console.log(newArray);
  // console.log(newArray);
  localStorage.setItem("shoppingCard", JSON.stringify(newArray))
  // return cardArray
  return newArray
})
export const newOrder = createAsyncThunk("newOrder",
async ({userInformation,product} , thunkAPI) => {
  const {rejectWithValue} = thunkAPI
  await adminAPI.post("/orders/new-order",{userInformation,product}).then(docs => {
    console.log(docs);
    if(!docs.data.success){
      return rejectWithValue({message: docs.data.error})
    }
    return docs.data
  }).catch(err => rejectWithValue(err))
})
// ATTRIBUTES START
export const createAttributes = createAsyncThunk("createAttributes" , 
async ({token,form}, thunkAPI) => {
  const {rejectWithValue} = thunkAPI
  return adminAPI.post("/account/attributes/new/"+token,form).then(docs => {
    if(!docs.data.success){
      return rejectWithValue({message: docs.data.error})
    }
      return docs.data
  }).catch(err => rejectWithValue(err))
})
export const getAttributes = createAsyncThunk("getAttributes",
async (_, thunkAPI) => {
  const {rejectWithValue} = thunkAPI
  return adminAPI.get("/account/attributes").then(docs => {
    if(!docs.data.success){
      return rejectWithValue({message: docs.data.error})
    }
      return docs.data
  }).catch(err => rejectWithValue(err))
})
export const deleteAttribute = createAsyncThunk("deleteAttribute",
async (id, thunkAPI) => {
  const {rejectWithValue} = thunkAPI
  return adminAPI.delete("/account/attributes/delete/"+id).then(docs => {
    if(!docs.data.success){
      return rejectWithValue({message: docs.data.error})
    }
      return docs.data
  }).catch(err => rejectWithValue(err))
})
export const changeAttributeVisibility = createAsyncThunk("changeAttributeVisibility",
async ({id,visibility}, thunkAPI) => {
  const {rejectWithValue} = thunkAPI
  return adminAPI.put("/account/attributes/change-visibility",{id,visibility}).then(docs => {
    if(!docs.data.success){
      return rejectWithValue({message: docs.data.error})
    }
      return docs.data
  }).catch(err => rejectWithValue(err))
})
export const updateAttribute = createAsyncThunk("updateAttribute",
async (form, thunkAPI) => {
  const {rejectWithValue} = thunkAPI
  return adminAPI.put("/account/attributes/update",form).then(docs => {
    if(!docs.data.success){
      return rejectWithValue({message: docs.data.error})
    }
      return docs.data
  }).catch(err => rejectWithValue(err))
})
export const updateManyStatus_attributes = createAsyncThunk("updateManyStatus_attributes",
async ({items, status}, thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    return adminAPI.put("/account/attributes/update-many-status",{items, status}).then((docs) => {
        if(!docs.data.success){
            return rejectWithValue({message: docs.data.error})
          }
        return docs.data
    }).catch(err => rejectWithValue(err))
})
export const deleteManyStatus_attributes = createAsyncThunk("deleteManyStatus_attributes",
async (items, thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    return adminAPI.put("/account/attributes/delete-many-status",{items}).then((docs) => {
        if(!docs.data.success){
            return rejectWithValue({message: docs.data.error})
          }
        return docs.data
    }).catch(err => rejectWithValue(err))
})
// ATTRIBUTES END
// CATEGORIES START
export const createCategories = createAsyncThunk("createCategories" , 
async ({token,form}, thunkAPI) => {
  const {rejectWithValue} = thunkAPI
  console.log(form)
  return adminAPI.post("/account/categories/new/"+token,form).then(docs => {
    if(!docs.data.success){
      return rejectWithValue({message: docs.data.error})
    }
      return docs.data
  }).catch(err => rejectWithValue(err))
})
export const getCategories = createAsyncThunk("getCategories",
async (_, thunkAPI) => {
  const {rejectWithValue} = thunkAPI
  return adminAPI.get("/account/categories").then(docs => {
    if(!docs.data.success){
      return rejectWithValue({message: docs.data.error})
    }
      return docs.data
  }).catch(err => rejectWithValue(err))
})
export const deleteCategorie = createAsyncThunk("deleteCategorie",
async (id, thunkAPI) => {
  const {rejectWithValue} = thunkAPI
  return adminAPI.delete("/account/categories/delete/"+id).then(docs => {
    if(!docs.data.success){
      return rejectWithValue({message: docs.data.error})
    }
      return docs.data
  }).catch(err => rejectWithValue(err))
})
export const changeCategorieVisibility = createAsyncThunk("changeCategorieVisibility",
async ({id,visibility}, thunkAPI) => {
  const {rejectWithValue} = thunkAPI
  return adminAPI.put("/account/categories/change-visibility",{id,visibility}).then(docs => {
    if(!docs.data.success){
      return rejectWithValue({message: docs.data.error})
    }
      return docs.data
  }).catch(err => rejectWithValue(err))
})
export const updateCategorie = createAsyncThunk("updateCategorie",
async (form, thunkAPI) => {
  const {rejectWithValue} = thunkAPI
  return adminAPI.put("/account/categories/update",form).then(docs => {
    if(!docs.data.success){
      return rejectWithValue({message: docs.data.error})
    }
      return docs.data
  }).catch(err => rejectWithValue(err))
})
export const updateManyStatus_categories = createAsyncThunk("updateManyStatus_categories",
async ({items, status}, thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    return adminAPI.put("/account/categories/update-many-status",{items, status}).then((docs) => {
        if(!docs.data.success){
            return rejectWithValue({message: docs.data.error})
          }
        return docs.data
    }).catch(err => rejectWithValue(err))
})
export const deleteManyStatus_categories = createAsyncThunk("deleteManyStatus_categories",
async (items, thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    return adminAPI.put("/account/categories/delete-many-status",{items}).then((docs) => {
        if(!docs.data.success){
            return rejectWithValue({message: docs.data.error})
          }
        return docs.data
    }).catch(err => rejectWithValue(err))
})
// CATEGORIES END
const initState = {user: null, shoppingCard: [],
  registerUserStatus: {isLoading: false, error:false , success:false},
  loginUserStatus: {isLoading: false, error:false , success:false},
  addAuthToStateStatus: {isLoading: false, error:false , success:false},
  addToCardStatus :{isLoading: false, error:false , success:false},
  getShoppingCardStatus :{isLoading: false, error:false , success:false},
  deleteProductFromCardStatus :{isLoading: false, error:false , success:false},
  changeQuantiteStatus :{isLoading: false, error:false , success:false},
  newOrderStatus :{isLoading: false, error:false , success:false},
  
  createAttributesStatus :{isLoading: false, error:false , success:false},
  getAttributesStatus :{isLoading: false, error:false , success:false},
  deleteAttributeStatus :{isLoading: false, error:false , success:false},
  updateAttributeStatus :{isLoading: false, error:false , success:false},
  changeAttributeVisibilityStatus :{isLoading: false, error:false , success:false},
  updateManyStatus_attributes_Status:{isLoading: false , error: false , success: false},
  deleteManyStatus_attributes_Status:{isLoading: false , error: false , success: false},

  createCategoriesStatus :{isLoading: false, error:false , success:false},
getCategoriesStatus :{isLoading: false, error:false , success:false},
deleteCategorieStatus :{isLoading: false, error:false , success:false},
updateCategorieStatus :{isLoading: false, error:false , success:false},
changeCategorieVisibilityStatus :{isLoading: false, error:false , success:false},
updateManyStatus_categories_Status:{isLoading: false , error: false , success: false},
deleteManyStatus_categories_Status:{isLoading: false , error: false , success: false},
}

const usersSlice = createSlice({
    name: "users",
    initialState: initState,
    reducers: {},
    extraReducers: {
        // Register user
        [addAuthToState.pending]: (state,action) => {
                    console.log(action);
          state.addAuthToStateStatus={
            isLoading : true,
            error: false,
            success: false
          }
        },
        [addAuthToState.fulfilled]: (state,action) => {
          state.user = {
            userName: action.payload.user.userName,
            email: action.payload.user.email,
            token: action.payload.token
          }
          state.addAuthToStateStatus={
            ...state.addAuthToStateStatus,
            isLoading : false,
            success: "Authorisation Success!"
          }
        },
        [addAuthToState.rejected]: (state,action) => {
          state.addAuthToStateStatus={
            ...state.addAuthToStateStatus,
            isLoading : false,
            error: action.payload.message
          }  
          window.location.href = "/admin/account/login"
        },
        // Register user
        [registerUser.pending]: (state,action) => {
          console.log(action);
          state.registerUserStatus={
            isLoading : true,
            error: false,
            success: false
          }
        },
        [registerUser.fulfilled]: (state,action) => {
          console.log(action);  
          // state.user = action.payload
          state.registerUserStatus={
            ...state.registerUserStatus,
            isLoading : false,
            success: "Register Successefully"
          }
        },
        [registerUser.rejected]: (state,action) => {
          console.log(action);
          state.registerUserStatus={
            ...state.registerUserStatus,
            isLoading : false,
            error: action.payload.message
          }  
        },
        // Login user
        [loginUser.pending]: (state,action) => {
          console.log(action);
          state.loginUserStatus={
            isLoading : true,
            error: false,
            success: false
          }
        },
        [loginUser.fulfilled]: (state,action) => {
          // window.localStorage.setItem("token", action.payload.token)
          console.log(action);  
          state.user = {
            userName: action.payload.user.userName,
            email: action.payload.user.email,
            token: action.payload.token
          }
          state.loginUserStatus={
            ...state.loginUserStatus,
            isLoading : false,
            success: "Login Success!"
          }
        },
        [loginUser.rejected]: (state,action) => {
          console.log(action);
          state.loginUserStatus={
            ...state.loginUserStatus,
            isLoading : false,
            error: action.payload.message
          }  
        },
        // create attribute user
        [createAttributes.pending]: (state,action) => {
          console.log(action);
          state.createAttributesStatus={
            isLoading : true,
            error: false,
            success: false
          }
        },
        [createAttributes.fulfilled]: (state,action) => {
          console.log(action.payload);
          state.getAttributesStatus.success = action.payload.data
          state.createAttributesStatus={
            ...state.createAttributesStatus,
            isLoading : false,
            success: "Create Attribute Success"
          }
        },
        [createAttributes.rejected]: (state,action) => {
          console.log(action);
          state.createAttributesStatus={
            ...state.createAttributesStatus,
            isLoading : false,
            error: action.payload.message
          }  
        },
        // get Attributes
        [getAttributes.pending]: (state,action) => {
          console.log(action);
          state.getAttributesStatus={
            isLoading : true,
            error: false,
            success: false
          }
        },
        [getAttributes.fulfilled]: (state,action) => {
          state.getAttributesStatus={
            ...state.getAttributesStatus,
            isLoading : false,
            success: action.payload.data
          }
        },
        [getAttributes.rejected]: (state,action) => {
          console.log(action);
          state.getAttributesStatus={
            ...state.getAttributesStatus,
            isLoading : false,
            error: action.payload.message
          }  
        },
        // delete attribute
        [deleteAttribute.pending]: (state,action) => {
          console.log(action);
          state.deleteAttributeStatus={
            isLoading : true,
            error: false,
            success: false
          }
        },
        [deleteAttribute.fulfilled]: (state,action) => {
          state.getAttributesStatus.success = action.payload.data
          state.deleteAttributeStatus={
            ...state.deleteAttributeStatus,
            isLoading : false,
            success: "Attribute Deleted !"
          }
        },
        [deleteAttribute.rejected]: (state,action) => {
          console.log(action);
          state.deleteAttributeStatus={
            ...state.deleteAttributeStatus,
            isLoading : false,
            error: action.payload.message
          }  
        },
        // change visibility attribute
        [changeAttributeVisibility.pending]: (state,action) => {
          console.log(action);
          state.changeAttributeVisibilityStatus={
            isLoading : true,
            error: false,
            success: false
          }
        },
        [changeAttributeVisibility.fulfilled]: (state,action) => {
          console.log(action);
          state.getAttributesStatus.success = action.payload.data
          state.changeAttributeVisibilityStatus={
            ...state.changeAttributeVisibilityStatus,
            isLoading : false,
            success: "Visibility Changed !"
          }
        },
        [changeAttributeVisibility.rejected]: (state,action) => {
          console.log(action);
          state.changeAttributeVisibilityStatus={
            ...state.changeAttributeVisibilityStatus,
            isLoading : false,
            error: action.payload.message
          }  
        },
        // update Many Status product
        [updateManyStatus_attributes.pending]: (state, action) => {
          console.log(action)
          state.updateManyStatus_attributes_Status = {
              isLoading: true,
              error: false,
              success: false
          }
      },
      [updateManyStatus_attributes.fulfilled]: (state, action) => {
        state.getAttributesStatus.success = action.payload.data
        // state.getAttributesStatus.success = state.getAttributesStatus.success.map((att) => {
        //       if(action.payload.data.items.indexOf(att._id) !== -1){
        //           return {
        //               ...att,
        //               publish: action.payload.data.status
        //           }
        //       }
        //       return att
        //   })
          console.log(action)
          state.updateManyStatus_attributes_Status = {
              ...state.updateManyStatus_attributes_Status,
              isLoading: false,
              success: action.payload.items.length + " Orders Status Updated"
          }
      },
      [updateManyStatus_attributes.rejected]: (state, action) => {
          state.updateManyStatus_attributes_Status = {
              ...state.updateManyStatus_attributes_Status,
              isLoading: false,
              error: action.payload.message
          }
      },
      // delete Many product
      [deleteManyStatus_attributes.pending]: (state, action) => {
          console.log(action)
          state.deleteManyStatus_attributes_Status = {
              isLoading: true,
              error: false,
              success: false
          }
      },
      [deleteManyStatus_attributes.fulfilled]: (state, action) => {
        state.getAttributesStatus.success = action.payload.data
        // state.getAttributesStatus.success = state.getAttributesStatus.success.filter(att => action.payload.data.items.indexOf(att._id) === -1)
          console.log(action)
          state.deleteManyStatus_attributes_Status = {
              ...state.deleteManyStatus_attributes_Status,
              isLoading: false,
              success: action.payload.items.length + " Attributes Deleted"
          }
      },
      [deleteManyStatus_attributes.rejected]: (state, action) => {
          state.deleteManyStatus_attributes_Status = {
              ...state.deleteManyStatus_attributes_Status,
              isLoading: false,
              error: action.payload.message
          }
      },
        // update attribute
        [updateAttribute.pending]: (state,action) => {
          console.log(action);
          state.updateAttributeStatus={
            isLoading : true,
            error: false,
            success: false
          }
        },
        [updateAttribute.fulfilled]: (state,action) => {
          state.getAttributesStatus.success = action.payload.data
          state.updateAttributeStatus={
            ...state.updateAttributeStatus,
            isLoading : false,
            success: "Attribute Updated !"
          }
        },
        [updateAttribute.rejected]: (state,action) => {
          console.log(action);
          state.updateAttributeStatus={
            ...state.updateAttributeStatus,
            isLoading : false,
            error: action.payload.message
          }  
        },
        // ATTRIBUTES START
         // create categorie user
         [createCategories.pending]: (state,action) => {
          console.log(action);
          state.createCategoriesStatus={
            isLoading : true,
            error: false,
            success: false
          }
        },
        [createCategories.fulfilled]: (state,action) => {
          console.log(action.payload);
          state.getCategoriesStatus.success = action.payload.data
          state.createCategoriesStatus={
            ...state.createCategoriesStatus,
            isLoading : false,
            success: "Create Categorie Success"
          }
        },
        [createCategories.rejected]: (state,action) => {
          console.log(action);
          state.createCategoriesStatus={
            ...state.createCategoriesStatus,
            isLoading : false,
            error: action.payload.message
          }  
        },
        // get Categories
        [getCategories.pending]: (state,action) => {
          console.log(action);
          state.getCategoriesStatus={
            isLoading : true,
            error: false,
            success: false
          }
        },
        [getCategories.fulfilled]: (state,action) => {
          state.getCategoriesStatus={
            ...state.getCategoriesStatus,
            isLoading : false,
            success: action.payload.data
          }
        },
        [getCategories.rejected]: (state,action) => {
          console.log(action);
          state.getCategoriesStatus={
            ...state.getCategoriesStatus,
            isLoading : false,
            error: action.payload.message
          }  
        },
        // delete categorie
        [deleteCategorie.pending]: (state,action) => {
          console.log(action);
          state.deleteCategorieStatus={
            isLoading : true,
            error: false,
            success: false
          }
        },
        [deleteCategorie.fulfilled]: (state,action) => {
          state.getCategoriesStatus.success = action.payload.data
          state.deleteCategorieStatus={
            ...state.deleteCategorieStatus,
            isLoading : false,
            success: "Categorie Deleted !"
          }
        },
        [deleteCategorie.rejected]: (state,action) => {
          console.log(action);
          state.deleteCategorieStatus={
            ...state.deleteCategorieStatus,
            isLoading : false,
            error: action.payload.message
          }  
        },
        // change visibility categorie
        [changeCategorieVisibility.pending]: (state,action) => {
          console.log(action);
          state.changeCategorieVisibilityStatus={
            isLoading : true,
            error: false,
            success: false
          }
        },
        [changeCategorieVisibility.fulfilled]: (state,action) => {
          console.log(action);
          state.getCategoriesStatus.success = action.payload.data
          state.changeCategorieVisibilityStatus={
            ...state.changeCategorieVisibilityStatus,
            isLoading : false,
            success: "Visibility Changed !"
          }
        },
        [changeCategorieVisibility.rejected]: (state,action) => {
          console.log(action);
          state.changeCategorieVisibilityStatus={
            ...state.changeCategorieVisibilityStatus,
            isLoading : false,
            error: action.payload.message
          }  
        },
        // update Many Status product
        [updateManyStatus_categories.pending]: (state, action) => {
          console.log(action)
          state.updateManyStatus_categories_Status = {
              isLoading: true,
              error: false,
              success: false
          }
      },
      [updateManyStatus_categories.fulfilled]: (state, action) => {
        state.getCategoriesStatus.success = action.payload.data
        // state.getCategoriesStatus.success = state.getCategoriesStatus.success.map((att) => {
        //       if(action.payload.data.items.indexOf(att._id) !== -1){
        //           return {
        //               ...att,
        //               publish: action.payload.data.status
        //           }
        //       }
        //       return att
        //   })
          console.log(action)
          state.updateManyStatus_categories_Status = {
              ...state.updateManyStatus_categories_Status,
              isLoading: false,
              success: action.payload.items.length + " Orders Status Updated"
          }
      },
      [updateManyStatus_categories.rejected]: (state, action) => {
          state.updateManyStatus_categories_Status = {
              ...state.updateManyStatus_categories_Status,
              isLoading: false,
              error: action.payload.message
          }
      },
      // delete Many product
      [deleteManyStatus_categories.pending]: (state, action) => {
          console.log(action)
          state.deleteManyStatus_categories_Status = {
              isLoading: true,
              error: false,
              success: false
          }
      },
      [deleteManyStatus_categories.fulfilled]: (state, action) => {
        state.getCategoriesStatus.success = action.payload.data
        // state.getCategoriesStatus.success = state.getCategoriesStatus.success.filter(att => action.payload.data.items.indexOf(att._id) === -1)
          console.log(action)
          state.deleteManyStatus_categories_Status = {
              ...state.deleteManyStatus_categories_Status,
              isLoading: false,
              success: action.payload.items.length + " Categories Deleted"
          }
      },
      [deleteManyStatus_categories.rejected]: (state, action) => {
          state.deleteManyStatus_categories_Status = {
              ...state.deleteManyStatus_categories_Status,
              isLoading: false,
              error: action.payload.message
          }
      },
        // update categorie
        [updateCategorie.pending]: (state,action) => {
          console.log(action);
          state.updateCategorieStatus={
            isLoading : true,
            error: false,
            success: false
          }
        },
        [updateCategorie.fulfilled]: (state,action) => {
          state.getCategoriesStatus.success = action.payload.data
          state.updateCategorieStatus={
            ...state.updateCategorieStatus,
            isLoading : false,
            success: "Categorie Updated !"
          }
        },
        [updateCategorie.rejected]: (state,action) => {
          console.log(action);
          state.updateCategorieStatus={
            ...state.updateCategorieStatus,
            isLoading : false,
            error: action.payload.message
          }  
        },

        // ATTRIBUTES END

        // add to Card
        [addToCard.pending]: (state , action) => {
          console.log(action);
          state.addToCardStatus = {
            isLoading: true,
            error:false,
            success : false
          }
        },
        [addToCard.fulfilled]: (state , action) => {
          console.log(action);
          state.shoppingCard = action.payload
          state.addToCardStatus = {
            ...state.addToCardStatus,
            isLoading: false,
            success : "Product Added To Card ."
          }
        },
        [addToCard.rejected]: (state , action) => {
          console.log(action);
          state.addToCardStatus = {
            ...state.addToCardStatus,
            isLoading: false,
            error : action.payload.message || "Failed To Add Product"
          }
        },
        // delete product from card
        [deleteProductFromCard.pending]: (state , action) => {
          console.log(action);
          state.deleteProductFromCardStatus = {
            isLoading: true,
            error:false,
            success : false
          }
        },
        [deleteProductFromCard.fulfilled]: (state , action) => {
          console.log(action);
          // state.shoppingCard = []
          state.shoppingCard = action.payload
          state.deleteProductFromCardStatus = {
            ...state.deleteProductFromCardStatus,
            isLoading: false,
            success : "Product Delete From Card"
          }
        },
        [deleteProductFromCard.rejected]: (state , action) => {
          console.log(action);
          state.deleteProductFromCardStatus = {
            ...state.deleteProductFromCardStatus,
            isLoading: false,
            error : action?.payload?.message || "Failed To Delete Product"
          }
        },
        // changeQuantite
        [changeQuantite.pending]: (state , action) => {
          console.log(action);
          state.changeQuantiteStatus = {
            isLoading: true,
            error:false,
            success : false
          }
        },
        [changeQuantite.fulfilled]: (state , action) => {
          console.log(action);
          state.shoppingCard = action.payload
          state.changeQuantiteStatus = {
            ...state.changeQuantiteStatus,
            isLoading: false,
            success : "Quantite Updated"
          }
        },
        [changeQuantite.rejected]: (state , action) => {
          console.log(action);
          state.changeQuantiteStatus = {
            ...state.changeQuantiteStatus,
            isLoading: false,
            error : action?.payload?.message || "Failed To Change Quantite"
          }
        },
        // get shopping card
        [getShoppingCard.pending]: (state , action) => {
          // console.log(action);
          state.getShoppingCardStatus = {
            isLoading: true,
            error:false,
            success : false
          }
        },
        [getShoppingCard.fulfilled]: (state , action) => {
          // console.log(action);
          state.shoppingCard = action.payload
          state.getShoppingCardStatus = {
            ...state.getShoppingCardStatus,
            isLoading: false,
            success : "products ......"
          }
        },
        [getShoppingCard.rejected]: (state , action) => {
          // console.log(action);
          state.getShoppingCardStatus = {
            ...state.getShoppingCardStatus,
            isLoading: false,
            error : action.payload.message
          }
        },
        // newOrder
        [newOrder.pending]: (state , action) => {
          console.log(action);
          state.newOrderStatus = {
            isLoading: true,
            error:false,
            success : false
          }
        },
        [newOrder.fulfilled]: (state , action) => {
          console.log(action);
          // state.shoppingCard = []
          state.newOrderStatus = {
            ...state.newOrderStatus,
            isLoading: false,
            success : "Place Order Success"
          }
        },
        [newOrder.rejected]: (state , action) => {
          console.log(action);
          state.newOrderStatus = {
            ...state.newOrderStatus,
            isLoading: false,
            error : action.payload.message
          }
        },
        // logout
        [logout.fulfilled]: (state,action) => {
          state.user = null
        },
       
                
    }
})


export const counterActions = usersSlice.actions
export default usersSlice.reducer
