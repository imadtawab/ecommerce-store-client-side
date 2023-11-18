import { createSlice , createAsyncThunk } from "@reduxjs/toolkit"
import { adminAPI } from "../API/axios-global"

export const newOrder = createAsyncThunk("newOrder",
async ({userInformation,shoppingProducts} , thunkAPI) => {
  const {rejectWithValue} = thunkAPI
  return adminAPI.post("/orders/new-order",{userInformation,shoppingProducts}).then(docs => {
    // console.log(JSON.stringify(docs.data.data));
    if(!docs.data.success){
      return rejectWithValue({message: docs.data.error})
    }
    return docs.data
  }).catch(err => rejectWithValue(err))
})
export const getOrders = createAsyncThunk("getOrders",
async (_,thunkAPI) => {
  const {rejectWithValue} = thunkAPI
  return adminAPI.get("/orders").then((docs) => {
    if(!docs.data.success){
      return rejectWithValue({message: docs.data.error})
    }
    return docs.data
  }).catch(err => rejectWithValue(err))
})
export const filterOrdersByStatus = createAsyncThunk("filterOrdersByStatus",
async ({status , time},thunkAPI) => {
  const {rejectWithValue} = thunkAPI
  return adminAPI.get(`/orders/filter?status=${status}&time=${time}`).then((docs) => {
    if(!docs.data.success){
      return rejectWithValue({message: docs.data.error})
    }
    
    return {data: docs.data , arg: {status , time}}
  }).catch(err => rejectWithValue(err))
})
export const deleteOrder = createAsyncThunk("deleteOrder",
async (orderId,thunkAPI) => {
  const {rejectWithValue} = thunkAPI
  return adminAPI.delete("/orders/delete-order/"+orderId).then((docs) => {
    if(!docs.data.success){
      return rejectWithValue({message: docs.data.error})
    }
    return orderId
  }).catch(err => rejectWithValue(err))
})

export const getOrderDetails = createAsyncThunk("getOrderDetails",
async (id, thunkAPI) => {
  const {rejectWithValue} = thunkAPI
  return adminAPI.get("/orders/"+id).then((docs) => {
    if(!docs.data.success){
      return rejectWithValue({message: docs.data.error})
    }
    return docs.data
  }).catch(err => rejectWithValue(err))
})
export const changeOrderStatus = createAsyncThunk("changeOrderStatus",
async ({status , orderId}, thunkAPI) => {
  const {rejectWithValue} = thunkAPI;
  return adminAPI.put("/orders/change-order-status",{status , orderId}).then((docs) => {
    if(!docs.data.success){
      return rejectWithValue({message: docs.data.error})
    }
    return docs.data
  }).catch(err => rejectWithValue(err)) 
})
export const deleteOrderStatus = createAsyncThunk("deleteOrderStatus",
async ({statusIndex , orderId}, thunkAPI) => {
  const {rejectWithValue} = thunkAPI;
  return adminAPI.put("/orders/delete-order-status",{statusIndex , orderId}).then((docs) => {
    if(!docs.data.success){
      return rejectWithValue({message: docs.data.error})
    }
    return docs.data
  }).catch(err => rejectWithValue(err)) 
})
export const newPersonalNote = createAsyncThunk("newPersonalNote",
async ({personalNotes, orderId}, thunkAPI) => {
  const {rejectWithValue} = thunkAPI;
  return adminAPI.put("/orders/new-personal-note",{personalNotes, orderId}).then((docs) => {
    if(!docs.data.success){
      return rejectWithValue({message: docs.data.error})
    }
    return docs
  }).catch(err => rejectWithValue(err)) 
})
export const updateManyStatus_orders = createAsyncThunk("updateManyStatus_orders",
async ({items, status}, thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    return adminAPI.put("/orders/update-many-status",{items, status}).then((docs) => {
        if(!docs.data.success){
            return rejectWithValue({message: docs.data.error})
          }
        return docs.data
    }).catch(err => rejectWithValue(err))
})
export const deleteManyStatus_orders = createAsyncThunk("deleteManyStatus_orders",
async (items, thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    return adminAPI.put("/orders/delete-many-status",{items}).then((docs) => {
        if(!docs.data.success){
            return rejectWithValue({message: docs.data.error})
          }
        return docs.data
    }).catch(err => rejectWithValue(err))
})
export const dashboard_OrderData = createAsyncThunk("dashboard_OrderData" , 
async (_, thunkAPI) => {
  const {rejectWithValue} = thunkAPI
  return adminAPI.get("/orders/dashboard-order-data").then((docs) => {
    if(!docs.data.success){
        return rejectWithValue({message: docs.data.error})
    }
    return docs.data
  }).catch(err => rejectWithValue({message: err}))
})
const initState = {
  newOrderStatus :{isLoading: false, error:false , success:false},
  statusSelectInFilter : {status: false , time: false},
  getOrdersStatus :{isLoading: false, error:false , success:false},
  getOrderDetailsStatus :{isLoading: false, error:false , success:false},
  changeOrderStatus_Status :{isLoading: false, error:false , success:false},
  deleteOrderStatus_Status :{isLoading: false, error:false , success:false},
  newPersonalNote_Status :{isLoading: false, error:false , success:false},
  deleteOrder_Status :{isLoading: false, error:false , success:false},
  updateManyStatus_orders_Status:{isLoading: false , error: false , success: false},
  deleteManyStatus_orders_Status:{isLoading: false , error: false , success: false},
  filterOrdersByStatus_Status:{isLoading: false , error: false , success: false},
  dashboard_OrderData_Status:{isLoading: false , error: false , success: false},
}

const ordersSlice = createSlice({
    name: "orders",
    initialState: initState,
    reducers: {},
    extraReducers: {
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
          localStorage.removeItem("shoppingCard")
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
        // get orders
        [getOrders.pending]: (state , action) => {
          console.log(action);
          state.getOrdersStatus = {
            isLoading: true,
            error:false,
            success : false
          }
        },
        [getOrders.fulfilled]: (state , action) => {
          console.log(action);
          state.getOrdersStatus = {
            ...state.getOrdersStatus,
            isLoading: false,
            success : action.payload
            // success : action.payload.data
          }
        },
        [getOrders.rejected]: (state , action) => {
          state.getOrdersStatus = {
            ...state.getOrdersStatus,
            isLoading: false,
            error : action.payload.message
          }
        },
        // Filter Order By Status
        [filterOrdersByStatus.pending]: (state , action) => {
          console.log(action);
          state.filterOrdersByStatus_Status = {
            isLoading: true,
            error:false,
            success : false
          }
        },
        [filterOrdersByStatus.fulfilled]: (state , action) => {
          console.log(action);
          state.filterOrdersByStatus_Status = {
            ...state.filterOrdersByStatus_Status,
            isLoading: false,
            success : action.payload.data.data
          }
          state.getOrdersStatus = {
            ...state.getOrdersStatus,
            success : action.payload.data
          }
          console.log(action.payload.arg);
          state.statusSelectInFilter = action?.payload?.arg || {status:false,time:false}
        },
        [filterOrdersByStatus.rejected]: (state , action) => {
          state.filterOrdersByStatus_Status = {
            ...state.filterOrdersByStatus_Status,
            isLoading: false,
            error : action.payload.message
          }
        },
        // delete order
        [deleteOrder.pending]: (state , action) => {
        console.log(action);
        state.deleteOrder_Status = {
          isLoading: true,
          error:false,
          success : false
        }
      },
      [deleteOrder.fulfilled]: (state , action) => {
        console.log(action);
        state.getOrdersStatus = {
          ...state.getOrdersStatus,
          success : {
            ...state.getOrdersStatus.success,
            data: state.getOrdersStatus.success.data.filter(o => o._id !== action.payload)
          }
          // success : state.getOrdersStatus.success.filter(o => o._id !== action.payload)
        }
        state.deleteOrder_Status = {
          ...state.deleteOrder_Status,
          isLoading: false,
          success : "Order Deleted ..."
        }
      },
      [deleteOrder.rejected]: (state , action) => {
        state.deleteOrder_Status = {
          ...state.deleteOrder_Status,
          isLoading: false,
          error : action.payload.message
        }
      },
        // getOrderDetails
        [getOrderDetails.pending]: (state , action) => {
          console.log(action);
          state.getOrderDetailsStatus = {
            isLoading: true,
            error:false,
            success : false
          }
        },
        [getOrderDetails.fulfilled]: (state , action) => {
          console.log(action.payload.data);
          state.getOrderDetailsStatus = {
            ...state.getOrderDetailsStatus,
            isLoading: false,
            success : action.payload
          }
        },
        [getOrderDetails.rejected]: (state , action) => {
          state.getOrderDetailsStatus = {
            ...state.getOrderDetailsStatus,
            isLoading: false,
            error : action.payload.message
          }
        },
        // change order status
        [changeOrderStatus.pending]: (state , action) => {
          console.log(action);
          state.changeOrderStatus_Status = {
            isLoading: true,
            error:false,
            success : false
          }
        },
        [changeOrderStatus.fulfilled]: (state , action) => {
          console.log(action.payload,7777);
          state.getOrderDetailsStatus = {
            ...state.getOrderDetailsStatus,
            // success : action.payload
            success : {
              ...state.getOrderDetailsStatus,
              data: action.payload.data
            }
          }
          state.changeOrderStatus_Status = {
            ...state.changeOrderStatus_Status,
            isLoading: false,
            success : "Order Status Changed ...."
          }
        },
        [changeOrderStatus.rejected]: (state , action) => {
          console.log(action, 6666666666)
          state.changeOrderStatus_Status = {
            ...state.changeOrderStatus_Status,
            isLoading: false,
            error : action.payload.message
          }
        },
        // delete order status
        [deleteOrderStatus.pending]: (state , action) => {
          console.log(action);
          state.deleteOrderStatus_Status = {
            isLoading: true,
            error:false,
            success : false
          }
        },
        [deleteOrderStatus.fulfilled]: (state , action) => {
          console.log(action);
          state.getOrderDetailsStatus = {
            ...state.getOrderDetailsStatus,
            success : action.payload
            // success : action.payload.data
          }
          state.deleteOrderStatus_Status = {
            ...state.deleteOrderStatus_Status,
            isLoading: false,
            success : "Order Status Deleted ..."
          }
        },
        [deleteOrderStatus.rejected]: (state , action) => {
          state.deleteOrderStatus_Status = {
            ...state.deleteOrderStatus_Status,
            isLoading: false,
            error : action.payload.message
          }
        },
        // add new personal note
        [newPersonalNote.pending]: (state , action) => {
          console.log(action);
          state.newPersonalNote_Status = {
            isLoading: true,
            error:false,
            success : false
          }
        },
        [newPersonalNote.fulfilled]: (state , action) => {
          console.log(action);
          state.getOrderDetailsStatus = {
            ...state.getOrderDetailsStatus,
            success : action.payload.data
          }
          state.newPersonalNote_Status = {
            ...state.newPersonalNote_Status,
            isLoading: false,
            success : "Order Status Deleted ..."
          }
        },
        [newPersonalNote.rejected]: (state , action) => {
          state.newPersonalNote_Status = {
            ...state.newPersonalNote_Status,
            isLoading: false,
            error : action.payload.message
          }
        },
        // update Many Status order
        [updateManyStatus_orders.pending]: (state, action) => {
          console.log(action)
          state.updateManyStatus_orders_Status = {
              isLoading: true,
              error: false,
              success: false
          }
      },
      [updateManyStatus_orders.fulfilled]: (state, action) => {
        state.getOrdersStatus.success.data = state.getOrdersStatus.success.data.map(order => {
          if(action.payload.data.items.indexOf(order._id) !== -1){
            return {
              ...order,
              status: [...order.status , {
                name: action.payload.data.status,
                addenIn: false
              }]
            }
          }
          return order
        })
          // state.allProducts = state.allProducts.map((prod) => {
          //     if(action.payload.data.items.indexOf(prod._id) !== -1){
          //         return {
          //             ...prod,
          //             productStatus: {
          //                 ...prod.productStatus,
          //                 visibility: action.payload.data.status
          //             }
          //         }
          //     }
          //     return prod
          // })
          console.log(action)
          state.updateManyStatus_orders_Status = {
              ...state.updateManyStatus_orders_Status,
              isLoading: false,
              success: action.payload.data.items.length + " Orders Status Updated"
          }
      },
      [updateManyStatus_orders.rejected]: (state, action) => {
          state.updateManyStatus_orders_Status = {
              ...state.updateManyStatus_orders_Status,
              isLoading: false,
              error: action.payload.message
          }
      },
        // delete Many product
        [deleteManyStatus_orders.pending]: (state, action) => {
          console.log(action)
          state.deleteManyStatus_orders_Status = {
              isLoading: true,
              error: false,
              success: false
          }
      },
      [deleteManyStatus_orders.fulfilled]: (state, action) => {
        state.getOrdersStatus.success = state.getOrdersStatus.success.filter(order => action.payload.data.items.indexOf(order._id) === -1)
          console.log(action)
          state.deleteManyStatus_orders_Status = {
              ...state.deleteManyStatus_orders_Status,
              isLoading: false,
              success: action.payload.data.items.length + " Orders Deleted"
          }
      },
      [deleteManyStatus_orders.rejected]: (state, action) => {
          state.deleteManyStatus_orders_Status = {
              ...state.deleteManyStatus_orders_Status,
              isLoading: false,
              error: action.payload.message
          }
      },

      // dashboard_OrderData_Status

      [dashboard_OrderData.pending]: (state , action) => {
        console.log(action);
        state.dashboard_OrderData_Status = {
          isLoading: true,
          error:false,
          success : false
        }
      },
      [dashboard_OrderData.fulfilled]: (state , action) => {
        console.log(action);
        state.dashboard_OrderData_Status = {
          ...state.dashboard_OrderData_Status,
          isLoading: false,
          success : action.payload
          // success : action.payload.data
        }
      },
      [dashboard_OrderData.rejected]: (state , action) => {
        state.dashboard_OrderData_Status = {
          ...state.dashboard_OrderData_Status,
          isLoading: false,
          error : action.payload.message
        }
      },
        
    }
})


export const counterActions = ordersSlice.actions
export default ordersSlice.reducer
