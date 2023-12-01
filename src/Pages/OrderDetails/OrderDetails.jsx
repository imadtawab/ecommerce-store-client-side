import './OrderDetails.scss'
import PageStructure from '../../Components/PageStructure/PageStructure'
import SectionStructure from '../../Components/SectionStructure/SectionStructure'
import productImg from "../../assets/profile.jpg"
import { BsFillCaretLeftSquareFill, BsFillCaretRightSquareFill, BsFillPersonFill, BsFillTelephoneFill, BsMap, BsMapFill, BsPinMap, BsPinMapFill, BsX } from 'react-icons/bs'
import { BiMapAlt, BiSolidMap } from 'react-icons/bi'
import InputBox, { TextAreaBox } from '../../Components/InputBox/InputBox'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { changeOrderStatus, deleteOrderStatus, getOrderDetails, newPersonalNote } from '../../store/orderSlice'
import Loading from '../../Components/Loading/Loading'
import Btn from '../../Components/Btn/Btn'
import Alert from '../../Components/Alert/Alert'
import { MdEmail } from 'react-icons/md'

export default function OrderDetails() {
    const {getOrderDetailsStatus} = useSelector(s => s.orders)
    const params = useParams()
    const dispatch = useDispatch()
  
    useEffect(() => {
        dispatch(getOrderDetails(params.id)).then((docs) => {
            if(docs.type === "getOrderDetails/fulfilled"){
                // setOrder(docs.payload.data)
            }
        })
    },[dispatch])

  return (
    <>
        <Loading status={getOrderDetailsStatus}>
            {getOrderDetailsStatus.success && <OrderDetailsHandle order={getOrderDetailsStatus.success.data}/>}
        </Loading>
    </>
  )
}

export function OrderDetailsHandle({order}) {
    const [statusArray , setStatusArray] = useState(["pending" , "confirmed" , "shipped" , "delivered" , "cancelled" , "on_hold" , "delayed" , "returned"])
    const [nextStatus , setNextStatus]  =useState("")
    const [backStatus , setBackStatus]  =useState("")
    const [nowStatus , setNowStatus] = useState("")
    const {changeOrderStatus_Status , deleteOrderStatus_Status , newPersonalNote_Status} = useSelector(s => s.orders)
    const dispatch = useDispatch()
    const changeOrderStatusHandle = (status , orderId) => {
        dispatch(changeOrderStatus({status , orderId}))
    }
    const changeOrderStatusBySquare = (action,oldStatus,orderId) => {
        if(action === "next"){
            if (oldStatus !== nextStatus && statusArray.indexOf(nextStatus) !== -1) {
                console.log(oldStatus , nextStatus);
                dispatch(changeOrderStatus({status:nextStatus , orderId}))
            }
            return false                
        }
        if(action === "back"){
            if (oldStatus !== backStatus && statusArray.indexOf(backStatus) !== -1) {
                console.log(oldStatus , backStatus);
                dispatch(changeOrderStatus({status:backStatus , orderId}))
            }
            return false                
        }
        // let statusArray = ["pending" , "confirmed" , "shipped" , "delivered" , "cancelled" , "on_hold" , "delayed" , "returned"]
        // console.log(oldStatus);
        // if(action === "next"){
            //     let status = statusArray.indexOf(oldStatus) <= statusArray.length - 2 ? statusArray[statusArray.indexOf(oldStatus) + 1] : false
            //     if (status) {
        //         dispatch(changeOrderStatus({status , orderId}))
        //     }
        //     return false                
        // }
        // if(action === "back"){
        //     let status = statusArray.indexOf(oldStatus) >= 1 ? statusArray[statusArray.indexOf(oldStatus) - 1] : false
        //     if (status) {
        //         dispatch(changeOrderStatus({status , orderId}))
        //     }
        //     return false                
        // }
    }
    const deleteOrderStatusHandle = (statusName , statusIndex , orderId) => {
        dispatch(deleteOrderStatus({statusName , statusIndex , orderId}))
    }
    const [personalNotes , setPersonalNotes] = useState({
        value: "",
        error: false
    })
    const addNewPersonalNote = (orderId) => {
        if(personalNotes.value === ""){
            console.log("object");
            setPersonalNotes(prev => {
                return {...prev, error: true}
            })
            console.log(personalNotes);
            return false
        }
        dispatch(newPersonalNote({personalNotes: personalNotes.value, orderId})).then((docs) => {
            if(docs.type === "newPersonalNote/fulfilled"){
                setPersonalNotes({
                    value: "",
                    error: false
                })
            }
        })
    }
        useEffect(() => {
                                        // 000 
            let now = order.current_status?.name
            let next = statusArray.indexOf(now) <= statusArray.length - 2 ? statusArray[statusArray.indexOf(now) + 1] : now
            let back = statusArray.indexOf(now) >= 1 ? statusArray[statusArray.indexOf(now) - 1] : now
            setNowStatus(now)
            setNextStatus(next)
            setBackStatus(back)
            console.log(back," < ",now," > ",next);
        },[order,nowStatus,statusArray])
    return (
        <>
        {changeOrderStatus_Status.success && (
        <Alert type="success">{changeOrderStatus_Status.success}</Alert>
        )}
     {changeOrderStatus_Status.error && (
        <Alert type="danger">{changeOrderStatus_Status.error}</Alert>
    )}
            {deleteOrderStatus_Status.success && (
        <Alert type="success">{deleteOrderStatus_Status.success}</Alert>
        )}
     {deleteOrderStatus_Status.error && (
        <Alert type="danger">{deleteOrderStatus_Status.error}</Alert>
    )}
                {newPersonalNote_Status.success && (
        <Alert type="success">{newPersonalNote_Status.success}</Alert>
        )}
     {newPersonalNote_Status.error && (
        <Alert type="danger">{newPersonalNote_Status.error}</Alert>
    )}
    <PageStructure title="Order Details">
            <div className='OrderDetails'>
                <div className="left-section">
                <SectionStructure pd="none">
                    <div className="order-variant-table">
                        <table>
                            <thead>
                                <tr>
                                    <td>PRODUCT NAME</td>
                                    <td>PRICE</td>
                                    <td>QUANTITE</td>
                                    <td>TOTAL</td>
                                </tr>
                            </thead>
                            <tbody>
                            
                                {/**************************/}
                                {console.log(order)}
                                {order.shoppingCard.map((prod , ind) => (
                                    <>
                                    {prod?.variants[0]?.variantId === prod._id ? (
                                        <tr>
                                        <td>
                                            <div className="product-name">
                                                <div className="img">
                                                    <img src={`http://localhost:3500/media/${prod.media.images[0]}`} alt="" />
                                                </div>
                                                <div className="info">
                                                    <h4>{prod?.name}</h4>
                                                    <div className='quantite'>{prod.categorie}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="price">
                                                {prod.prices.salePrice}<span>mad</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="qunatite ftw-n">
                                                {prod.variants[0].quantiteUser}
                                            </div>
                                        </td>
                                        <td>
                                            <div className="total price">
                                                {prod.prices.salePrice * prod.variants[0].quantiteUser}<span>mad</span>
                                            </div>
                                        </td>
                                    </tr>
                                    ) : (
                                        prod.variants.map((v , index) => (
                                            prod.variants.length === 1 ? (
                                                <tr>
                                                <td>
                                                    <div className="product-name">
                                                        <div className="img">
                                                            <img src={`http://localhost:3500/media/${v.image}`} alt="" />
                                                        </div>
                                                        <div className="info">
                                                            <h4>{prod?.name}</h4>
                                                            <div className='category'>{prod.categorie}</div>
                                                            <div className='variants'>{v.variantName}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="price">
                                                    {v.salePrice}<span>mad</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="qunatite ftw-n">
                                                        {/* console.log(prod.variants) */}
                                                        {/* {prod.variants.map(v => v.quantiteUser).reducer((a,b) => a+b)} */}
                                                        {v.quantiteUser}
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="total price">
                                                   {/* {prod.variants.map(v => v.quantiteUser * v.salePrice).reduce((a,b) => a+b)}<span>mad</span> */}
                                                        {v.quantiteUser * v.salePrice}<span>mad</span>
                                                        
                                                    </div>
                                                </td>
                                            </tr>
                                            ) : (
                                                index === 0 ? (
                                                    <>
                                                    <tr className="sub-product-head">
                                                    <td>
                                                        <div className="product-name">
                                                            <div className="img">
                                                                <img src={`http://localhost:3500/media/${prod.media.images[0]}`} alt="" />
                                                            </div>
                                                            <div className="info">
                                                                <h4>{prod?.name}</h4>
                                                                <div className='category'>{prod.categorie}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        {/* <div className="price">
                                                            {prod.prices.salePrice}<span>mad</span>
                                                        </div> */}
                                                    </td>
                                                    <td>
                                                        <div className="qunatite ftw-n">
                                                            {/* console.log(prod.variants) */}
                                                            {/* {prod.variants.map(v => v.quantiteUser).reducer((a,b) => a+b)} */}
                                                            {prod.variants.map(v => v.quantiteUser).reduce((a,b) => a+b)}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="total price">
                                                       {prod.variants.map(v => v.quantiteUser * v.salePrice).reduce((a,b) => a+b)}<span>mad</span>
                                                            {/* {prod.prices.salePrice * prod.variants[0].quantiteUser}<span>mad</span> */}
                                                        </div>
                                                    </td>
                                                </tr>
                                                        <tr className='sub-product'>
                                                    <td>
                                                        <div className="product-name">
                                                            <div className="sub-variants">
                                                                <div className="sub-image">
                                                                <img src={`http://localhost:3500/media/${v.image}`} alt="" />
                                                                </div>
                                                            
                                                                {/* <h4>{prod.name}</h4> */}
                                                                <div className='variants'>{v.variantName}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="price">
                                                        {v.salePrice}<span>mad</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="qunatite ftw-n">
                                                            {/* console.log(prod.variants) */}
                                                            {/* {prod.variants.map(v => v.quantiteUser).reducer((a,b) => a+b)} */}
                                                            {v.quantiteUser}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="total price">
                                                       {/* {prod.variants.map(v => v.quantiteUser * v.salePrice).reduce((a,b) => a+b)}<span>mad</span> */}
                                                            {v.quantiteUser * v.salePrice}<span>mad</span>
                                                            
                                                        </div>
                                                    </td>
                                                </tr>
                                                </>
                                                ) : (
                                                    <tr  className='sub-product'>
                                                    <td>
                                                        <div className="product-name">
                                                            <div className="sub-variants">
                                                                <div className="sub-image">
                                                                <img src={`http://localhost:3500/media/${v.image}`} alt="" />
                                                                </div>
                                                                <div className="variants">
                                                                {v.variantName}
                                                                </div>
                                                            </div>
                                                            
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="price">
                                                        {v.salePrice}<span>mad</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="qunatite ftw-n">
                                                            {/* console.log(prod.variants) */}
                                                            {/* {prod.variants.map(v => v.quantiteUser).reducer((a,b) => a+b)} */}
                                                            {v.quantiteUser}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="total price">
                                                       {/* {prod.variants.map(v => v.quantiteUser * v.salePrice).reduce((a,b) => a+b)}<span>mad</span> */}
                                                            {v.quantiteUser * v.salePrice}<span>mad</span>
                                                            
                                                        </div>
                                                    </td>
                                                </tr>
                                                )
                                            )
                                        ))
                                    )}
                                    </>
                                ))}
                                
                            </tbody>
                        </table>
                    </div>
                </SectionStructure>
                <SectionStructure title="Payment Summary">
                    <div className="payment-summary">
                    <div className="box">
                            <div>Subtotal</div>
                            <div>{order.shoppingCard.map(p => [0,...p.variants.map(v => v.quantiteUser)].reduce((a,b) => a+b)).reduce((a,b) => a+b)} items</div>
                            <div className="price">{order.shoppingCard.map(p => [0,...p.variants.map(v => v.quantiteUser * v.salePrice)].reduce((a,b) => a+b)).reduce((a,b) => a+b)}<span>MAD</span></div>
                        </div>
                        <div className="box">
                            <div>Shipping</div>
                            <div>free//</div>
                            <div className="price">0//<span>MAD</span></div>
                        </div>
                        <div className="box">
                            <div>Discount</div>
                            <div>20%//</div>
                            <div className="price">60//<span>MAD</span></div>
                        </div>
                        <div className="box">
                            <div>Tax</div>
                            <div className="price">200//<span>MAD</span></div>
                        </div>
                        <div className="box last">
                            <div>Paid by customer</div>
                            <div className="price">{order.shoppingCard.map(p => [0,...p.variants.map(v => v.quantiteUser * v.salePrice)].reduce((a,b) => a+b)).reduce((a,b) => a+b)}<span>MAd</span></div>
                        </div>
                    </div>
                </SectionStructure>
                <SectionStructure title="personal notes">
                    <div className="personal-notes">
                    <div className="box-input">
                        {/* <textarea placeholder="Add personal note"></textarea> */}
                        <TextAreaBox error={personalNotes.error && "Please enter a value"} onChange={(e) => setPersonalNotes({value: e.target.value , error: false})} name="myNotes" id="myNotes" placeholder="Add personal note" value={personalNotes.value} />
                       
                            <Btn onClick={() => addNewPersonalNote(order._id)} style={{marginLeft: "auto"}} element="button" btnStyle="bg" color="primary" >Add Note</Btn>
                        
                    </div>
                        <ul>
                            {order.personal_Notes.map(n => (
                                <li>{n}</li>
                            ))}
                        </ul>
                    </div>
                </SectionStructure>
                </div>
                <div className="right-section">
                    <SectionStructure title="Customer notes">
                        <div className="customer-notes">
                            <p>{order.customer_Notes ? order.customer_Notes : "No notes from customer"}</p>
                        </div>
                    </SectionStructure>
                <SectionStructure title="Customer Information">
                    <div className="customer-information">
                        <div className="box">
                            <BsFillPersonFill/>
                            {/* userName : */}
                            <div>{order.firstName} {order.lastName}</div>
                        </div>
                        <div className="box">
                            <BsFillTelephoneFill/>
                            {/* phone */}
                            <a href="tel:0620654250">{order.phone}</a>
                        </div>
                        <div className="box">
                            <MdEmail/>
                            <div style={{textTransform:"lowercase"}}>{order.email}</div>
                        </div>
                        <div className="box">
                            <BiMapAlt/>
                            <div>{order.city}</div>
                        </div>
                        <div className="box">
                            <BsPinMapFill/>
                            <div>{order.address}</div>
                        </div>
                    </div>
                
                </SectionStructure>
                <SectionStructure title="Status Timeline" controlls={
                    <div className="status-controlls">
                        <div data-status_name={backStatus} className={`back ${nowStatus === statusArray[0] ? "disabled" : ""}`}>
                            <BsFillCaretLeftSquareFill className={nowStatus === statusArray[0] ? "disabled" : ""} onClick={() => changeOrderStatusBySquare("back",nowStatus, order._id)}/>
                        </div>
                        <div data-status_name={nextStatus} className={`next ${nowStatus === statusArray[statusArray.length - 1] ? "disabled" : ""}`}>
                            <BsFillCaretRightSquareFill className={nowStatus === statusArray[statusArray.length - 1] ? "disabled" : ""} onClick={() => changeOrderStatusBySquare("next",nowStatus, order._id)}/>
                            <div className="status-hover"></div>
                        </div>
                    </div>
                }>
                    <div className="status-timeline">
                        <div className="timeline">
                            {order.status.map((s , index) => (
                                <div className={"status "+s?.name}>
                                    <h6>{s?.name}</h6>
                                    <p>{`${new Date(s.addedIn).getFullYear()}-${((new Date(s.addedIn).getMonth() + 1) < 10 ? "0" : "")+ (new Date(s.addedIn).getMonth() + 1)}-${(new Date(s.addedIn).getDate() < 10 ? "0" : "")+ new Date(s.addedIn).getDate()} ${(new Date(s.addedIn).getHours() < 10 ? "0" : "")+ new Date(s.addedIn).getHours()}:${(new Date(s.addedIn).getMinutes() < 10 ? "0" : "")+ new Date(s.addedIn).getMinutes()}`}</p>
                                    {index !== 0 &&<div onClick={() => deleteOrderStatusHandle(s?.name , index , order._id)} className="delete"><BsX/></div>}
                                </div>

                            ))}
                        </div>
                    <div className="status-select">
                        <select  onChange={(e) => changeOrderStatusHandle(e.target.value , order._id)} name="select" id="select">
                            {statusArray.map((item, index) => (
                                <option selected={item === nowStatus} key={`status-${index}`} value={item}>{item}</option>
                                ))}
                        </select>
                    </div>
                    </div>
                </SectionStructure>
                </div>
            </div>
            </PageStructure>
    </>
  )
}

// {order.shoppingCard.map((prod,i) => (
//     prod.variants.length === 1 ? (
//       <tr  key={Date.now()*i}>
//       <td>
//         <div className="product-details">
//           <div className="image">
//             <img src={`http://localhost:3500/media/${prod.variants[0].image}`} alt="" />
//           </div>
//           <div className="info">
//             <div className="title">{prod.name}</div>
//             <div className="categorie">{prod.categorie}</div>
//             <div className="variants">{prod.variants[0].variantName}</div>
//           </div>
//         </div>
//       </td>
//       {/* <td>
//       <div className="quantite">
//           <div onClick={() => changeQuantiteHandle("minus",prod.variants[0].variantId)} className="minus">
//               <BiMinus/>
//           </div>
//           <input type="number" disabled value={prod.variants[0].quantiteUser} />
//           <div onClick={() => changeQuantiteHandle("plus",prod.variants[0].variantId)} className="plus">
//             <BiPlus/>
//           </div>
//         </div>
//       </td> */}
//       <td>
//         <div className="price">
//           {prod.variants[0].salePrice}<span>mad</span>
//         </div>
//       </td>
//       <td>
//         <div className="price">
//         {prod.variants[0].salePrice * prod.variants[0].quantiteUser}<span>mad</span>
//         </div>
//       </td>
//       {/* <td>
//         <div className="delete">
//           <BsTrash onClick={() => deleteProductFromHandle(prod.productId,prod.variants[0].variantId)} />
//         </div>
//       </td> */}
//     </tr>
//     ) : (
//       <>
//       <tr className='sub-product-head' key={Date.now()*i*2}>
//       <td>
//         <div className="product-details">
//           <div className="image">
//             <img src={`http://localhost:3500/media/${prod.image}`} alt="" />
//           </div>
//           <div className="info">
//             <div className="title">{prod.name}</div>
//             <div className="categorie">{prod.categorie}</div>
//           </div>
//         </div>
//       </td>
//       <td>
//       {/* <div className="quantite">
//           <div className="minus">
//               <BiMinus/>
//           </div>
//           <input type="number" disabled value={shoppingCard[1].quantite} />
//           <div className="plus">
//             <BiPlus/>
//           </div>
//         </div> */}
 
//       </td>
//       <td>
//         {/* <div className="price">
//           {shoppingCard[1].variant.salePrice}<span>mad</span>
//         </div> */}
//       </td>
//       <td>
//       <div className="price">
//         {/*shoppingCard[1].variant.salePrice*shoppingCard[1].quantite*/}{prod.variants.map(p => p.quantiteUser * p.salePrice).reduce((a,b) => a+b)}<span>mad</span>
//         </div>
//       </td>
//     </tr>
   
    
//     <>
//        {   prod.variants.map(v => (
//             <tr className='sub-product' key={Date.now()*v.variantId}>
//             <td>
//               <div className="product-details">
//               <div className="info sub-variants">
//                     <div className="sub-image">
//                       <img src={`http://localhost:3500/media/${v.image}`} alt="" />
//                     </div>
//                     <div className="variants">{v.variantName}</div>
//                   </div>
//               </div>
//             </td>
//             {/* <td>
//             <div className="quantite">
//                 <div onClick={() => changeQuantiteHandle("minus",v.variantId)} className="minus">
//                     <BiMinus/>
//                 </div>
//                 <input type="number" disabled value={v.quantiteUser} />
//                 <div onClick={() => changeQuantiteHandle("plus",v.variantId)} className="plus">
//                   <BiPlus/>
//                 </div>
//               </div>
 
//             </td> */}
//             <td>
//               <div className="price">
//                 {v.salePrice}<span>mad</span>
//               </div>
//             </td>
//             <td>
//             {/* <div className="price">
//               {shoppingCard[1].variant.salePrice*shoppingCard[1].quantite}<span>mad</span>
//               </div> */}
//             </td>
//             {/* <td>
//               <div className="delete">
//                 <BsTrash onClick={() => deleteProductFromHandle(prod.productId,v.variantId)} />
//               </div>
//             </td> */}
//           </tr>
//           ))
//           }
//     </>
//     </>
//     )
//   ))}
 