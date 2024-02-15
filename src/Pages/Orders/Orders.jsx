import { BsBagCheckFill, BsBagXFill, BsCalendar2Day, BsCaretLeft, BsCaretLeftFill, BsCheck2All, BsCheckAll, BsCheckLg, BsChevronLeft, BsClockHistory, BsFillBasket2Fill, BsFillCalendar2DayFill, BsFillCaretLeftSquareFill, BsFillCaretRightSquareFill, BsFillPauseFill, BsHourglassSplit, BsTelephone, BsTelephoneFill, BsTrash, BsTruck, BsZoomIn } from 'react-icons/bs'
import './Orders.scss'
import { BiChevronLeft, BiChevronRight, BiDetail, BiEdit, BiFilterAlt, BiSkipNext, BiSkipPrevious, BiSolidFilterAlt, BiZoomIn } from 'react-icons/bi'
import SectionStructure from '../../Components/SectionStructure/SectionStructure'
import PageStructure from '../../Components/PageStructure/PageStructure'
import productImg from '../../assets/profile.jpg'
import CheckBox from '../../Components/CheckBox/CheckBox'
import { NavLink } from 'react-router-dom'
import GridSections from '../../Components/GridSections/GridSections'
import { IconBase } from 'react-icons/lib'
import { FaShippingFast } from 'react-icons/fa'
import BoxSection from '../../Components/BoxSection/BoxSection'
import {MdCached, MdDownloadDone, MdEventRepeat, MdFileDownloadDone, MdHighlightOff, MdOutlineDensitySmall, MdReplyAll, MdUpdate, MdWifiProtectedSetup} from 'react-icons/md'
import InputBox, { SelectBox } from '../../Components/InputBox/InputBox'
import { useDispatch, useSelector } from 'react-redux'
import Alert from '../../Components/Alert/Alert'
import { useEffect, useState } from 'react'
import { changeOrderStatus, deleteManyStatus_orders, deleteOrder, filterOrders, getOrders, updateManyStatus_orders } from '../../store/orderSlice'
import Loading from '../../Components/Loading/Loading'
import Btn from '../../Components/Btn/Btn'
import ShadowLoading from '../../Components/ShadowLoading/ShadowLoading'
import EmptyErrorSection from '../../Components/EmptyErrorSection/EmptyErrorSection'
import ModalValidation from '../../Components/ModalValidation/ModalValidation'
import PaginationTable from '../../Components/PaginationTable/PaginationTable'
import FlexSections from '../../Components/FlexSections/FlexSections'

export default function Orders() {
    // const {getOrdersStatus} = useSelector(s => s.orders)
    const {getOrdersStatus} = useSelector(s => s.orders)
    // const {changeOrderStatus_Status,deleteOrder_Status , updateManyStatus_orders_Status , deleteManyStatus_orders_Status , getOrdersStatus} = ordersSelector
    const dispatch = useDispatch()
      
    
       // filtering
   const [activeFilter , setActiveFilter] = useState(false)
   const [dateFilter , setDateFilter] = useState({
    from: null,
    to: null
})
const [statusFilter , setStatusFilter] = useState("all")
const [searchFilter , setSearchFilter] = useState("")

// const [filterProps ,setFilterProps] = useState({})

const filteringHandle = (e) => {
    e.preventDefault();

    let filterObject = {}
    if(searchFilter) filterObject.search = searchFilter
    if(statusFilter !== "all" && statusFilter) filterObject.status = statusFilter
    if(dateFilter.from) filterObject.from = dateFilter.from
    if(dateFilter.to) filterObject.to = dateFilter.to
    
    let filters = ""
    if(Object.keys(filterObject).length === 0) window.history.replaceState(null, null, window.location.pathname);
    Object.keys(filterObject).forEach((f , i) => {
      filters = filters + (i === 0 ? "?" : "&") + f + "=" + filterObject[f]
  })
    window.history.pushState(null, null, filters);
    // return filterObject
    // setFilterProps(filterObject)
    dispatch(getOrders({count: 1, step: getOrdersStatus.success.pagination?.step}))
}

    const filterProps = {activeFilter,setActiveFilter,dateFilter,setDateFilter,statusFilter,setStatusFilter,searchFilter,setSearchFilter,filteringHandle}
// end filter
    // useEffect(() => {
    // //   dispatch(getOrders())
    
    //   dispatch(getOrders({count: getOrdersStatus.success.pagination?.currentPagination || 1, step: getOrdersStatus.success.pagination?.step || 5}))
    // //   dispatch(getOrders({
    // //     count: getOrdersStatus?.success?.pagination?.currentPagination || 1,
    // //     step: getOrdersStatus?.success?.pagination?.step || 5
    // // }))
    // }, [dispatch])
    useEffect(() => {
        dispatch({type: "orders/states" , payload: ["changeOrderStatus_Status","deleteOrder_Status" , "updateManyStatus_orders_Status" , "deleteManyStatus_orders_Status"]}) 
      }, [])
  return (
<>
{getOrdersStatus.error && (
        <Alert type={"danger"}>{getOrdersStatus.error}</Alert>
    )}
    <PageStructure key={"lastDance1"} title="Orders" >
        <div className="actions-head">
        {/* <Btn element="button" onClick="" btnStyle="bg" color="danger">Delete Many</Btn>
        <Btn element="button" onClick="" btnStyle="bg" color="success"></Btn> */}
        </div>
    <div className='Orders'>
    {/* <Loading status={getOrdersStatus}> */}
    <TableOrders page="tableInPageOrders" filterProps={filterProps} filterValues={getOrdersStatus.success.filterValues} key={"tableInPageOrders"} sub_data={getOrdersStatus.success.sub_data} pagination={getOrdersStatus.success.pagination} orders={getOrdersStatus.success.data}/>
        {/* </Loading>      */}

    </div>
</PageStructure>
  </>
  )
}


export function TableOrders({page,key , orders ,pagination, boxActiveHandle=false, sub_data,filterProps,filterValues}) {
    const {changeOrderStatus_Status,deleteOrder_Status , updateManyStatus_orders_Status , deleteManyStatus_orders_Status , getOrdersStatus} = useSelector(s => s.orders)
    // const [orders, setorders] = useState(orders)
    const [itemsSelected , setItemsSelected] = useState([])

    const dispatch = useDispatch()

    // filter
    const {activeFilter,setActiveFilter,dateFilter,setDateFilter,statusFilter,setStatusFilter,searchFilter,setSearchFilter,filteringHandle} = filterProps
    
    const changeOrderStatusHandle = (status , orderId) => {
        console.log(status,963);
        // return false
        dispatch(changeOrderStatus({status , orderId}))
    }
    const deleteOrderHandle = (orderId) => {
        
        dispatch(deleteOrder(orderId))
        .then((docs) => {
            if (docs.type === "deleteOrder/fulfilled") {
                if((orders.length - 1 ) === 0){
                    console.log(getOrdersStatus.success.pagination?.currentPagination , getOrdersStatus.success.pagination?.numberOfItems);
                    if(+getOrdersStatus.success.pagination?.currentPagination === +getOrdersStatus.success.pagination?.numberOfItems && +getOrdersStatus.success.pagination?.currentPagination - 1 !== 0){
                        dispatch(getOrders({
                            count:+getOrdersStatus.success.pagination?.currentPagination - 1,
                            step: +getOrdersStatus.success.pagination?.step
                        }))
                    }
                    if(+getOrdersStatus.success.pagination?.currentPagination < +getOrdersStatus.success.pagination?.numberOfItems){
                        dispatch(getOrders({
                            count:getOrdersStatus.success.pagination?.currentPagination,
                            step: getOrdersStatus.success.pagination?.step
                        }))
                    }
                }
            }
        })
    }

    const selectItemHandle = (selectType) => {
        let selectInputs = document.querySelectorAll(".CheckBox input[type='checkbox'][name='selectOne']")
        let selectAllInput = document.getElementById("selectAll")
        if (selectType === "selectAll") {
          console.log(selectAllInput.checked);
          selectInputs.forEach(ipt => {
            ipt.checked = selectAllInput.checked
          })
        }
        let selectInputsChecked = document.querySelectorAll(".CheckBox input[type='checkbox'][name='selectOne']:checked")
        // if(selectInputsChecked.length){
        //   setBtnDisabled(true)
        // }else{
        //   setBtnDisabled(false)
        // }
        let result = []
        selectInputsChecked.forEach(i => {
          result.push(i.id)
        })
        console.log(selectInputsChecked);
        setItemsSelected(result)
        console.log(itemsSelected);
      }
      const UpdateManyHandle = (status) => {
        dispatch(updateManyStatus_orders({items: itemsSelected, status: status})).then((docs) => {
          console.log(docs);
          if(docs.type === "updateManyStatus_orders/fulfilled"){
            console.log(getOrdersStatus.success.data,9999999999999999999999);
            let selectInputs = document.querySelectorAll(".CheckBox input[type='checkbox'][name='selectOne']")
            let selectAllInput = document.getElementById("selectAll")
    
              selectAllInput.checked = false
              selectInputs.forEach(ipt => {
                ipt.checked = false
              })
              document.getElementById("selectManyBtn").value = ""
              setItemsSelected([])
          }
        })
      }
      const deleteManyHandle = () => {
        dispatch(deleteManyStatus_orders(itemsSelected)).then((docs) => {
          console.log(docs);
          if(docs.type === "deleteManyStatus_orders/fulfilled"){
                if((orders.length - docs.payload.data.items.length ) === 0){
                    console.log(getOrdersStatus.success.pagination?.currentPagination , getOrdersStatus.success.pagination?.numberOfItems);
                    if(+getOrdersStatus.success.pagination?.currentPagination === +getOrdersStatus.success.pagination?.numberOfItems && +getOrdersStatus.success.pagination?.currentPagination - 1 !== 0){
                        dispatch(getOrders({
                            count:+getOrdersStatus.success.pagination?.currentPagination - 1,
                            step: +getOrdersStatus.success.pagination?.step
                        }))
                    }
                    if(+getOrdersStatus.success.pagination?.currentPagination < +getOrdersStatus.success.pagination?.numberOfItems){
                        dispatch(getOrders({
                            count:getOrdersStatus.success.pagination?.currentPagination,
                            step: getOrdersStatus.success.pagination?.step
                        }))
                    }
                }
            let selectInputs = document.querySelectorAll(".CheckBox input[type='checkbox'][name='selectOne']")
            let selectAllInput = document.getElementById("selectAll")
    
              selectAllInput.checked = false
              selectInputs.forEach(ipt => {
                ipt.checked = false
            })
            setItemsSelected([])
        }
    })
}
console.log(pagination,{count: (getOrdersStatus.success.pagination?.currentPagination || 1), step: (getOrdersStatus.success.pagination?.step || 5)});
    useEffect(() => {
      dispatch(getOrders({count: (getOrdersStatus.success.pagination?.currentPagination || 1), step: (getOrdersStatus.success.pagination?.step || 5)})).then((docs) => {
          if(docs.type === "getOrders/fulfilled") {
            setDateFilter({from:docs.payload.filterValues?.from, to:docs.payload.filterValues?.to})
            setStatusFilter(docs.payload.filterValues?.status)
            setSearchFilter(docs.payload.filterValues?.search)
          }
      })
    }, [dispatch])
    //   useEffect(() => {
    //     if(boxActiveHandle !== false){
    //         boxActiveHandle()
    //     }
    //     setDateFilter({from:filterValues.from, to:filterValues.to})
    //     setStatusFilter(filterValues.status)
    //     setSearchFilter(filterValues.search)
    //   }, [changeOrderStatus_Status,deleteOrder_Status , updateManyStatus_orders_Status , deleteManyStatus_orders_Status])
      const showModal = (show , nextFunc,modalInfo) => {
        const action = {
          type : "modal/show" ,
          payload : {
              showModal: show,
              nextFunc: nextFunc,
              modalInfo
            }
          }
          dispatch(action)
      }
      const allStatusModal = [
        changeOrderStatus_Status,
        deleteOrder_Status ,
        updateManyStatus_orders_Status ,
        deleteManyStatus_orders_Status ,
      ]

      const resetForm = () => {
    
        let filterObject = {}
        if(searchFilter) filterObject.search = searchFilter
        if(statusFilter !== "all" && statusFilter) filterObject.status = statusFilter
        if(dateFilter.from) filterObject.from = dateFilter.from
        if(dateFilter.to) filterObject.to = dateFilter.to
    
        if(Object.keys(filterObject).length !== 0){
          window.history.replaceState(null, null, window.location.pathname);
          dispatch(getOrders({count: 1, step: getOrdersStatus.success.pagination?.step})).then((docs) => {
            if(docs.type === "getOrders/fulfilled") {
            setDateFilter({from: "", to: ""})
            setStatusFilter("all")
            setSearchFilter("")
            setActiveFilter(false)
          }
          })
        }
      }

  return (
    <>
             <ModalValidation status={{
      success: allStatusModal.filter(a => a.success)[0] ? true : false,
      error: allStatusModal.filter(a => a.error)[0] ? true : false,
      isLoading: allStatusModal.filter(a => a.isLoading)[0] ? true : false
      }}/>
                         {deleteManyStatus_orders_Status.success && (
        <Alert type="success">{deleteManyStatus_orders_Status.success}</Alert>
      )}
                      {deleteManyStatus_orders_Status.error && (
        <Alert type="danger">{deleteManyStatus_orders_Status.error}</Alert>
      )}
                            {deleteManyStatus_orders_Status.isLoading && (
        <ShadowLoading/>
      )}
                   {updateManyStatus_orders_Status.success && (
        <Alert type="success">{updateManyStatus_orders_Status.success}</Alert>
      )}
                      {updateManyStatus_orders_Status.error && (
        <Alert type="danger">{updateManyStatus_orders_Status.error}</Alert>
      )}
                            {updateManyStatus_orders_Status.isLoading && (
        <ShadowLoading/>
      )}
    {changeOrderStatus_Status.success && (
        <Alert type="success">{changeOrderStatus_Status.success}</Alert>
    )}
     {changeOrderStatus_Status.error && (
        <Alert type="danger">{changeOrderStatus_Status.error}</Alert>
    )}
        {deleteOrder_Status.success && (
        <Alert type="success">{deleteOrder_Status.success}</Alert>
    )}
     {deleteOrder_Status.error && (
        <Alert type="danger">{deleteOrder_Status.error}</Alert>
    )}
    
    
    {/* {orders.length ? ( */}
        <>
    <div key={key+"head"} className="actions-head">
        <Btn disabled={!itemsSelected.length} style={{position:"relative"}} element="button" btnStyle="bg" color="primary">
            <div className="icon"><BiEdit /></div> Update Many
                <select value={""} onChange={(e) => {
                    let newStatus = e.target.value
                    showModal(true, () => UpdateManyHandle(newStatus) , {
                        title: "Update Many Orders",
                        message: "Vous voulez vraiment modifier les orders selectionés ?",
                        type: "info"
                        })
                }}
                    disabled={!itemsSelected.length} name="selectManyBtn" id="selectManyBtn">
                        <option disabled value="">Status :</option>
                        {["pending" , "confirmed" , "shipped" , "delivered" , "cancelled" , "on_hold" , "delayed" , "returned"].map((s,index) => (
                            <option key={s+"_test1"+index} value={s}>{s}</option>
                        ))}
                </select>
        </Btn>

        <Btn onClick={() =>  showModal(true, deleteManyHandle , {
      title: "Delete Many Orders",
      message: "Vous voulez vraiment modsupprimerifier les orders selectionés ?",
      type: "info"
    })} disabled={!itemsSelected.length} element="button" btnStyle="bg" color="danger"><div className="icon"><BsTrash/></div> Delete Many
    </Btn>
    <Btn onClick={()=>setActiveFilter(e => !e)} element="button" btnStyle="bg" color="success"><div className="icon"><BiFilterAlt/></div>{
    // (!activeFilter && Object.keys(filterProps).length)
    ((sub_data?.numberTotal || sub_data?.numberTotal === 0) && window.location.search !== "" && !activeFilter) ? ` ( ${sub_data?.numberTotal} )` : ""}</Btn>
        </div>
        {(page === "tableInPageOrders" && activeFilter) && (
        <SectionStructure>
            
            <form onSubmit={filteringHandle} method='GET' className="Filter">
            <FlexSections direction="column">
            <FlexSections wrap={true}>
            <InputBox value={searchFilter} onChange={(e) => {
                    setSearchFilter(e.target.value)
                    filteringHandle()
                    }} placeholder="Search ..." label="Search" pd="none" flex="1" type="search" />
            <InputBox flex="1" value={dateFilter.from} onChange={(e) => setDateFilter(prev => {return {...prev , from: e.target.value}})} pd="none" label="from" type="date" name="from"/>
            <InputBox flex="1" value={dateFilter.to} onChange={(e) => setDateFilter(prev => {return {...prev , to: e.target.value}})} pd="none" label="to" type="date" name="to"/>       
            </FlexSections>
            <FlexSections alignItems="end" wrap={true}>
            <SelectBox flex="1" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} pd="none" name="status" id="stautsSelect" label="Status">
                {["all" , "pending" , "confirmed" , "shipped" , "delivered" , "cancelled" , "on_hold" , "delayed" , "returned"].map(s => (
                    <option value={s}>{s}</option>
                ))}
            </SelectBox>
            <Btn flex="1" onClick={resetForm} width="full" btnStyle= "outline" color= "danger" element="div">Reset</Btn>
                <Btn flex="1" type="submit" width="full" btnStyle= "bg" color= "success" element="button">Filter{
                // (Object.keys(filterProps).length)
                ((sub_data?.numberTotal || sub_data?.numberTotal === 0) && window.location.search !== "") ? ` ( ${sub_data?.numberTotal} )` : ""}</Btn>
            </FlexSections>
            </FlexSections>
            {/* <div className="filtering-button"> */}
            {/* </div> */}
            </form>
        </SectionStructure>
        )}
        
        <Loading status={getOrdersStatus}>
    <SectionStructure key={key} pd="none">
    {orders?.length ? ( 
    <div key={"table"+key} className="TableOrders">
        <table>
            <thead>
                <tr>
                    <td>
                        <CheckBox onChange={() => selectItemHandle("selectAll")}  name={"selectAll"} id="selectAll"/>
                    </td>
                    <td>order</td>
                    <td>customer</td>
                    <td>quantity</td>
                    <td>total</td>
                    <td>date</td>
                    <td>status</td>
                    <td>actions</td>
                    {/* <td>PRODUCT NAME</td>
                    <td>CATEGORY</td>
                    <td>QUANTITE</td>
                    <td>TOTAL</td>
                    <td>DATE</td>
                    <td>STATUS</td>
                    <td>ACTIONS</td> */}
                </tr>
            </thead>
            
            <tbody>
            {console.log((orders))}
                {orders.map((order,ind) => (
                    <>
                <tr key={order._id+ind+"test2"}>
                    <td>
                        <CheckBox 
                            onChange={() => selectItemHandle("selectOne")}
                            name={"selectOne"}
                            id={`${order._id}`}
                        />
                    </td>
                    <td>
                        <div className="product-name">
                            <div style={{    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(25px, 1fr))",
    gap: "3px",
    width: "53px",}} className="images">
                                {order.shoppingCard.map((p,indexx) => (
                            <div  key={order._id+p._id+"_test3"+indexx} style={{width: order.shoppingCard.length > 1 ? "25px" : "50px",
                                height: order.shoppingCard.length > 1 ? "25px" : "50px",
                                display: "grid",
                                placeContent: "center",}} className="img">
                                    <img style={{    maxWidth: "100%",
                                    // ${p.media.images[0]} for delete
                                    maxHeight: order.shoppingCard.length > 1 ? "25px" : "50px",}} src={`http://localhost:3500/media/${p.main_image}`} alt="" />
                            </div>
                                ))}
                            </div>
                            {order.shoppingCard.length > 1 ? 
                            <h4 style={{    textAlign: "initial"}}>{order.shoppingCard[0].name} <div style={{fontWeight: "normal",fontSize: "15px",textTransform: "initial"}}>+{order.shoppingCard.length - 1} oder items</div></h4> :
                             <h4>{order.shoppingCard[0].name}</h4>}
                        </div>
                    </td>
                    <td>
                        <div className="custumor">
                            <div className="custumor-name">{order.firstName} {order.lastName}</div>
                            <div style={{    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "5px",
    color: "cornflowerblue"}} className="tel"><BsTelephoneFill/>{order.phone}</div>
                        </div>

                    </td>
                    <td>
                        <div className="qunatite ftw-n">
                            {/* {order.shoppingCard.map(p => [0,...p.variants.map(v => v.quantiteUser)].reduce((a,b) => a+b)).reduce((a,b) => a+b)} */}
                            {order.order_total_quantite}
                        </div>
                    </td>
                    <td>
                        <div className="total price">
                        {/* {order.shoppingCard.map(p => [0,...p.variants.map(v => v.quantiteUser * v.salePrice)].reduce((a,b) => a+b)).reduce((a,b) => a+b)}<span>mad</span> */}
                        {order.order_total_price}<span>mad</span>
                        {/* {console.log(order,"**************")} */}
                        </div>
                    </td>
                    <td>
                        <div className="date ftw-n">
                            {/* 2023-07-25 22:34 */}
                                                        {/* <Date date={order.addedIn}/> */}

                            {`${new Date(order.addedIn).getFullYear()}-${((new Date(order.addedIn).getMonth() + 1) < 10 ? "0" : "")+ (new Date(order.addedIn).getMonth() + 1)}-${(new Date(order.addedIn).getDate() < 10 ? "0" : "")+ new Date(order.addedIn).getDate()} ${(new Date(order.addedIn).getHours() < 10 ? "0" : "")+ new Date(order.addedIn).getHours()}:${(new Date(order.addedIn).getMinutes() < 10 ? "0" : "")+ new Date(order.addedIn).getMinutes()}`}
                        </div>
                    </td>
                    
                    <td>    
                            <div className={"select " + order.current_status.name}>
                                
                                <SelectBox value={order.current_status.name} onChange={(e) => {
                                    console.log(order.current_status);
                                    let newStatus = e.target.value
                                    showModal(true, () => changeOrderStatusHandle(newStatus, order._id) , {
                                        title: "Update Status",
                                        message: "Vous voulez vraiment modifier le status ?",
                                        type: "info"
                                      })
                                }} style={{margin:"0"}} name="status" id="status" >
                                    {["pending" , "confirmed" , "shipped" , "delivered" , "cancelled" , "on_hold" , "delayed" , "returned"].map((opt , i) => (
                                                        //   selected={opt === order.current_status.name}                                                                                  // 000
                                        <option key={order._id+i+opt+"test4"} value={opt}>{opt}</option>
                                    ))}
                                </SelectBox>
                        </div>

                    </td>
                    <td>
                        <div className="actions">
                        <NavLink to={'/admin/orders/'+order._id} className="views">
                                <BsZoomIn/>
                            </NavLink>
                            <div className="delete">
                                <BsTrash onClick={() => showModal(true, () => deleteOrderHandle(order._id) , {
      title: "Delete Order",
      message: "Vous voulez vraiment supprimer ce order ?",
      type: "info"
    })}/>
                            </div>
                        </div>
                    </td>
                </tr>
                    </>
                ))}
            </tbody>

        </table>
        {page === "tableInPageOrders" && (
            <PaginationTable itemsLength={orders.length} dispatchFunc={getOrders} pagination={pagination}/>
        )}
        {/* {orders.length ? (false
        ) : (
            <EmptyErrorSection/>
        )} */}
    </div>
    ) : (
        <EmptyErrorSection/>
    )} 
    </SectionStructure>
      </Loading>     
    </>
    {/* ) : (
        <EmptyErrorSection/>
    )}  */}
    {/* {orders.map((order,ind) => (
                    <>
                <tr>
                    <td>
                        <CheckBox name={"selectOne"} id={`selectOne_${order._id}`}/>
                    </td>
                    <td>
                        <div className="product-name">
                            <div className="img">
                                <img src={productImg} alt="" />
                            </div>
                            <h4>product</h4>
                        </div>
                    </td>
                    <td>
                        <div className="categorie ftw-n">
                            home
                        </div>
                    </td>
                    <td>
                        <div className="qunatite ftw-n">
                            12
                        </div>
                    </td>
                    <td>
                        <div className="total price">
                            100<span>mad</span>
                        </div>
                    </td>
                    <td>
                        <div className="date ftw-n">
                            2023-07-25 22:34
                        </div>
                    </td>
                    
                    <td>
                            <div className="select pending">
                                <SelectBox style={{margin:"0"}} name="status" id="status" >
                                    {["pending" , "confirmed" , "shipped" , "delivered" , "cancelled" , "on_hold" , "delayed" , "returned"].map(opt => (
                                        <option value={opt}>{opt}</option>
                                    ))}
                                </SelectBox>
                        </div>

                    </td>
                    <td>
                        <div className="actions">
                        <NavLink to='/admin/orders/1' className="views">
                                <BsZoomIn/>
                            </NavLink>
                            <div className="delete">
                                <BsTrash/>
                            </div>
                        </div>
                    </td>
                </tr>
                    </>
                ))} */}
</>
  )
}
