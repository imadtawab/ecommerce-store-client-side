import { BsBagCheckFill, BsBagXFill, BsCalendar2Day, BsCheck2All, BsCheckAll, BsCheckLg, BsClockHistory, BsFillBasket2Fill, BsFillCalendar2DayFill, BsFillPauseFill, BsHourglassSplit, BsTelephone, BsTelephoneFill, BsTrash, BsTruck, BsZoomIn } from 'react-icons/bs'
import './Orders.scss'
import { BiDetail, BiEdit, BiZoomIn } from 'react-icons/bi'
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
import { SelectBox } from '../../Components/InputBox/InputBox'
import { useDispatch, useSelector } from 'react-redux'
import Alert from '../../Components/Alert/Alert'
import { useEffect, useState } from 'react'
import { changeOrderStatus, deleteManyStatus_orders, deleteOrder, getOrders, updateManyStatus_orders } from '../../store/orderSlice'
import Loading from '../../Components/Loading/Loading'
import Btn from '../../Components/Btn/Btn'
import ShadowLoading from '../../Components/ShadowLoading/ShadowLoading'
import EmptyErrorSection from '../../Components/EmptyErrorSection/EmptyErrorSection'
export default function Orders() {
    const {getOrdersStatus} = useSelector(s => s.orders)
    const dispatch = useDispatch()
    useEffect(() => {
      dispatch(getOrders())
    }, [dispatch])
    
  return (
<>
{getOrdersStatus.error && (
        <Alert type={"danger"}>{getOrdersStatus.error}</Alert>
    )}
    <PageStructure title="Orders" >
        <div className="actions-head">
        {/* <Btn element="button" onClick="" btnStyle="bg" color="danger">Delete Many</Btn>
        <Btn element="button" onClick="" btnStyle="bg" color="success"></Btn> */}
        </div>
    <div className='Orders'>
    <Loading status={getOrdersStatus}>
    <TableOrders orders={getOrdersStatus.success.data}/>
        </Loading>     

    </div>
</PageStructure>
  </>
  )
}


export function TableOrders({orders , boxActiveHandle=false}) {
    const {changeOrderStatus_Status,deleteOrder_Status , updateManyStatus_orders_Status , deleteManyStatus_orders_Status} = useSelector(s => s.orders)

    const [itemDeletedId, setItemDeletedId] = useState([])
    const [itemsSelected , setItemsSelected] = useState([])

    const dispatch = useDispatch()
    console.log(orders);
    const changeOrderStatusHandle = (status , orderId) => {
        dispatch(changeOrderStatus({status , orderId}))
    }
    const deleteOrderHandle = (orderId) => {
        dispatch(deleteOrder(orderId))
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
      const UpdateManyHandle = (e) => {
        dispatch(updateManyStatus_orders({items: itemsSelected, status: e.target.value})).then((docs) => {
          console.log(docs);
          if(docs.type === "updateManyStatus_orders/fulfilled"){
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
      useEffect(() => {
        if(boxActiveHandle !== false){
            boxActiveHandle()
        }
      }, [changeOrderStatus_Status,deleteOrder_Status , updateManyStatus_orders_Status , deleteManyStatus_orders_Status])
      
  return (
    <>
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
    
    {orders.length ? (
        <>
    <div className="actions-head">
        <Btn disabled={!itemsSelected.length} style={{position:"relative"}} element="button" btnStyle="bg" color="primary">
        <div className="icon"><BiEdit /></div> Update Many
                <select onChange={(e) => UpdateManyHandle(e)} disabled={!itemsSelected.length} name="selectManyBtn" id="selectManyBtn">
                    <option selected disabled value="">Status :</option>
                    {["pending" , "confirmed" , "shipped" , "delivered" , "cancelled" , "on_hold" , "delayed" , "returned"].map(s => (
                        <option value={s}>{s}</option>
                    ))}
                </select>
        </Btn>
        <Btn onClick={deleteManyHandle} disabled={!itemsSelected.length} element="button" btnStyle="bg" color="danger"><div className="icon"><BsTrash/></div> Delete Many</Btn>
        </div>
        
        
    <SectionStructure pd="none">
        
    <div className="TableOrders">
        <table>
            <thead>
                <tr>
                    <td>
                        <CheckBox onChange={() => selectItemHandle("selectAll")}  name={"selectAll"} id="selectAll"/>
                    </td>
                    <td>ORDER</td>
                    <td>CUSTUMOR</td>
                    <td>QUANTITE</td>
                    <td>TOTAL</td>
                    <td>DATE</td>
                    <td>STATUS</td>
                    <td>ACTIONS</td>
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
                {orders.map((order,ind) => (
                    <>
                <tr>
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
                                {order.shoppingCard.map(p => (
                            <div style={{width: order.shoppingCard.length > 1 ? "25px" : "50px",
                                height: order.shoppingCard.length > 1 ? "25px" : "50px",
                                display: "grid",
                                placeContent: "center",}} className="img">
                                    <img style={{    maxWidth: "100%",
                                    maxHeight: order.shoppingCard.length > 1 ? "25px" : "50px",}} src={`http://localhost:3500/media/${p.media.images[0]}`} alt="" />
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
                            {order.shoppingCard.map(p => [0,...p.variants.map(v => v.quantiteUser)].reduce((a,b) => a+b)).reduce((a,b) => a+b)}
                        </div>
                    </td>
                    <td>
                        <div className="total price">
                        {order.shoppingCard.map(p => [0,...p.variants.map(v => v.quantiteUser * v.salePrice)].reduce((a,b) => a+b)).reduce((a,b) => a+b)}<span>mad</span>
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
                            <div className={"select " + order.status[order.status.length - 1].name}>
                                <SelectBox onChange={(e) => changeOrderStatusHandle(e.target.value , order._id)} style={{margin:"0"}} name="status" id="status" >
                                    {["pending" , "confirmed" , "shipped" , "delivered" , "cancelled" , "on_hold" , "delayed" , "returned"].map((opt , i) => (
                                        <option key={boxActiveHandle ? Date.now() * i : "123456789"} selected={opt === order.status[order.status.length - 1].name} value={opt}>{opt}</option>
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
                                <BsTrash onClick={() => deleteOrderHandle(order._id)}/>
                            </div>
                        </div>
                    </td>
                </tr>
                    </>
                ))}
            </tbody>
                
        </table>
        {/* {orders.length ? (false
        ) : (
            <EmptyErrorSection/>
        )} */}
    </div>
    </SectionStructure>
    </>
    ) : (
        <EmptyErrorSection/>
    )} 
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
