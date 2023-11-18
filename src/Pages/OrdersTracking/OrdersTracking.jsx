import { BsBagCheckFill, BsBagXFill, BsCalendar2Day, BsClockHistory, BsFillBasket2Fill, BsFillPauseFill, BsHourglassSplit } from 'react-icons/bs'
import BoxSection from '../../Components/BoxSection/BoxSection'
import GridSections from '../../Components/GridSections/GridSections'
import PageStructure from '../../Components/PageStructure/PageStructure'
import './OrdersTracking.scss'
import { MdFileDownloadDone, MdWifiProtectedSetup } from 'react-icons/md'
import { FaShippingFast } from 'react-icons/fa'
import { TableOrders } from '../Orders/Orders'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { filterOrdersByStatus, getOrders } from '../../store/orderSlice'
import Loading from '../../Components/Loading/Loading'

export default function OrdersTracking() {
  const {getOrdersStatus , filterOrdersByStatus_Status , statusSelectInFilter} = useSelector(s => s.orders)
  const [statusChecked, setStatusChecked] = useState({status:false , time:false})
  const dispatch = useDispatch()
  const [valuesForStatus , setValuesForStatus] = useState({
    all: "...",
    today: "...",
    pending: "...",
    confirmed: "...",
    shipped: "...",
    delivered: "...",
    cancelled: "...",
    on_hold: "...",
    delayed: "...",
    returned: "...",
  })

  const boxActiveHandle = (status , time) => {
    console.log(statusChecked.status , status , statusChecked.time  , time);
    if(statusChecked.status !== status || statusChecked.time !== time){
      // dispatch(filterOrdersByStatus(status))
    // dispatch(getOrders())
    if(status || time){
      setStatusChecked({status , time})
    }
    if(time === "all"){
      dispatch(filterOrdersByStatus({status , time}))
      return
    }
    if(status || time){
      dispatch(filterOrdersByStatus({status , time}))
      return
    }
    // if(statusChecked?.status && statusChecked?.time){
      dispatch(filterOrdersByStatus({status: statusChecked.status , time: statusChecked.time}))
    // }
    }
  }

  const valuesForStatusHandle = (orders) => {
    let statusArray = ["pending","confirmed","shipped","delivered","cancelled","on_hold","delayed","returned"]
    // let orders = getOrdersStatus.success
    Object.keys(valuesForStatus).forEach((status) => {
          if(status === "all"){
            setValuesForStatus((prev) => {return {...prev , [status]: orders.length}})
            return
          }
          if(status === "today"){
            let startTime = new Date().setHours(0,0,0,0)
            setValuesForStatus((prev) => {return {...prev , [status]: orders.filter(order => order.addedIn >= startTime).length}})
          }
          if(statusArray.indexOf(status) !== -1){
            setValuesForStatus((prev) => {return {...prev , [status]: orders.filter(order => order.status[order.status.length - 1].name === status).length}})
          }
    })
  }
  useEffect(() => {
    dispatch(getOrders()).then((docs) => {
      if(docs.type === "getOrders/fulfilled"){
        console.log(docs.payload);
        valuesForStatusHandle(docs.payload.data)
      }
    })
    // boxActiveHandle(false , "all")
  }, [])

  useEffect(() => {
    if(getOrdersStatus?.success?.subData?.length){
      valuesForStatusHandle(getOrdersStatus.success.subData)
    }
  }, [getOrdersStatus])

  useEffect(() => {
    if(statusSelectInFilter?.status || statusSelectInFilter?.time){
      setStatusChecked(statusSelectInFilter)
    }
  }, [statusSelectInFilter])
  return (
    <PageStructure title={"Orders Tracking"}>
        <div className='OrdersTracking'>
        <GridSections>
          <BoxSection active={statusChecked.time === "alll"} onClick={() => boxActiveHandle(false , "all")} icon={<BsFillBasket2Fill/>} title="All Orders" value={valuesForStatus["all"]} />
          <BoxSection active={statusChecked.time === "today"} onClick={() => boxActiveHandle(false ,"today")} icon={<BsCalendar2Day/>} title="Today orders" value={valuesForStatus["today"]} />
          <BoxSection active={statusChecked.status === "pending"} onClick={() => boxActiveHandle("pending" , false)} icon={<BsHourglassSplit/>} status={"pending"} title="Pending" value={valuesForStatus["pending"]}/>
          <BoxSection active={statusChecked.status === "confirmed"} onClick={() => boxActiveHandle("confirmed" , false)} icon={<MdFileDownloadDone/>} status={"confirmed"} title="Confirmed" value={valuesForStatus["confirmed"]}/>
          <BoxSection active={statusChecked.status === "shipped"} onClick={() => boxActiveHandle("shipped" , false)} icon={<FaShippingFast/>} status={"shipped"} title="Shipped" value={valuesForStatus["shipped"]}/>
          <BoxSection active={statusChecked.status === "delivered"} onClick={() => boxActiveHandle("delivered" , false)} icon={<BsBagCheckFill/>} status={"delivered"} title="Delivered" value={valuesForStatus["delivered"]}/>
          <BoxSection active={statusChecked.status === "cancelled"} onClick={() => boxActiveHandle("cancelled" , false)} icon={<BsBagXFill/>} status={"cancelled"} title="Cancelled" value={valuesForStatus["cancelled"]}/>
          <BoxSection active={statusChecked.status === "on_hold"} onClick={() => boxActiveHandle("on_hold" , false)} icon={<BsFillPauseFill/>} status={"on_hold"} title="On Hold" value={valuesForStatus["on_hold"]}/>
          <BoxSection active={statusChecked.status === "delayed"} onClick={() => boxActiveHandle("delayed" , false)} icon={<BsClockHistory/>} status={"delayed"} title="Delayed" value={valuesForStatus["delayed"]}/>
          <BoxSection active={statusChecked.status === "returned"} onClick={() => boxActiveHandle("returned" , false)} icon={<MdWifiProtectedSetup/>} status={"returned"} title="Returned" value={valuesForStatus["returned"]}/>
    </GridSections>
    <Loading status={getOrdersStatus}>
    {/* valuesForStatusHandle={valuesForStatusHandle} valuesForStatus={valuesForStatus} setValuesForStatus={setValuesForStatus} */}
    {console.log(getOrdersStatus.success,99999)}
    <TableOrders boxActiveHandle={boxActiveHandle} orders={getOrdersStatus.success.data}/>
        </Loading>     

        </div>
    </PageStructure>
  )
}





// import { BsBagCheckFill, BsBagXFill, BsCalendar2Day, BsClockHistory, BsFillBasket2Fill, BsFillPauseFill, BsHourglassSplit } from 'react-icons/bs'
// import BoxSection from '../../Components/BoxSection/BoxSection'
// import GridSections from '../../Components/GridSections/GridSections'
// import PageStructure from '../../Components/PageStructure/PageStructure'
// import './OrdersTracking.scss'
// import { MdFileDownloadDone, MdWifiProtectedSetup } from 'react-icons/md'
// import { FaShippingFast } from 'react-icons/fa'
// import { TableOrders } from '../Orders/Orders'
// import { useDispatch, useSelector } from 'react-redux'
// import { useEffect, useState } from 'react'
// import { filterOrdersByStatus, getOrders } from '../../store/orderSlice'
// import Loading from '../../Components/Loading/Loading'

// export default function OrdersTracking() {
//   const {getOrdersStatus , filterOrdersByStatus_Status} = useSelector(s => s.orders)
//   const [statusChecked, setStatusChecked] = useState(false)
//   const [targetStatus , setTargetStatus] = useState(false)
//   const dispatch = useDispatch()
//   const [valuesForStatus , setValuesForStatus] = useState({
//     all: "...",
//     today: "...",
//     pending: "...",
//     confirmed: "...",
//     shipped: "...",
//     delivered: "...",
//     cancelled: "...",
//     on_hold: "...",
//     delayed: "...",
//     returned: "...",
//   })

//   const boxActiveHandle = (status , time) => {
//     // dispatch(filterOrdersByStatus(status))
//     dispatch(getOrders())
//     setStatusChecked(time ? time : status)
//     if(time === "all"){
//       dispatch(getOrders())
//     }
//     if(status || time){
//       dispatch(filterOrdersByStatus({status , time}))
//       return
//     }
//   }

//   const valuesForStatusHandle = (orders) => {
//     let statusArray = ["pending","confirmed","shipped","delivered","cancelled","on_hold","delayed","returned"]
//     // let orders = getOrdersStatus.success
//     Object.keys(valuesForStatus).forEach((status) => {
//           if(status === "all"){
//             setValuesForStatus((prev) => {return {...prev , [status]: orders.length}})
//             return
//           }
//           if(status === "today"){
//             let startTime = new Date().setHours(0,0,0,0)
//             setValuesForStatus((prev) => {return {...prev , [status]: orders.filter(order => order.addedIn >= startTime).length}})
//           }
//           if(statusArray.indexOf(status) !== -1){
//             setValuesForStatus((prev) => {return {...prev , [status]: orders.filter(order => order.status[order.status.length - 1].name === status).length}})
//           }
//     })
//   }
//   useEffect(() => {
//     dispatch(getOrders()).then((docs) => {
//       if(docs.type === "getOrders/fulfilled"){
//         valuesForStatusHandle(docs.payload.data)
//       }
//     })
//   }, [dispatch])
//   useEffect(() => {
//     if(getOrdersStatus.success.length){
//       valuesForStatusHandle(getOrdersStatus.success)
//     }
//     if(statusChecked.time === "all"){
//       dispatch(getOrders())
//     }
//     if(statusChecked.status || statusChecked.time){
//       dispatch(filterOrdersByStatus({status: statusChecked.status , time: statusChecked.time}))
//       return
//     }
//   }, [getOrdersStatus.success , filterOrdersByStatus_Status,statusChecked])
//   return (
//     <PageStructure title={"Orders Tracking"}>
//         <div className='OrdersTracking'>
//         <GridSections>
//           <BoxSection active={statusChecked === "all"} onClick={() => boxActiveHandle(false , "all")} icon={<BsFillBasket2Fill/>} title="All Orders" value={valuesForStatus["all"]} />
//           <BoxSection active={statusChecked === "today"} onClick={() => boxActiveHandle(false ,"today")} icon={<BsCalendar2Day/>} title="Today orders" value={valuesForStatus["today"]} />
//           <BoxSection active={statusChecked === "pending"} onClick={() => boxActiveHandle("pending")} icon={<BsHourglassSplit/>} status={"pending"} title="Pending" value={valuesForStatus["pending"]}/>
//           <BoxSection active={statusChecked === "confirmed"} onClick={() => boxActiveHandle("confirmed")} icon={<MdFileDownloadDone/>} status={"confirmed"} title="Confirmed" value={valuesForStatus["confirmed"]}/>
//           <BoxSection active={statusChecked === "shipped"} onClick={() => boxActiveHandle("shipped")} icon={<FaShippingFast/>} status={"shipped"} title="Shipped" value={valuesForStatus["shipped"]}/>
//           <BoxSection active={statusChecked === "delivered"} onClick={() => boxActiveHandle("delivered")} icon={<BsBagCheckFill/>} status={"delivered"} title="Delivered" value={valuesForStatus["delivered"]}/>
//           <BoxSection active={statusChecked === "cancelled"} onClick={() => boxActiveHandle("cancelled")} icon={<BsBagXFill/>} status={"cancelled"} title="Cancelled" value={valuesForStatus["cancelled"]}/>
//           <BoxSection active={statusChecked === "on_hold"} onClick={() => boxActiveHandle("on_hold")} icon={<BsFillPauseFill/>} status={"on_hold"} title="On Hold" value={valuesForStatus["on_hold"]}/>
//           <BoxSection active={statusChecked === "delayed"} onClick={() => boxActiveHandle("delayed")} icon={<BsClockHistory/>} status={"delayed"} title="Delayed" value={valuesForStatus["delayed"]}/>
//           <BoxSection active={statusChecked === "returned"} onClick={() => boxActiveHandle("returned")} icon={<MdWifiProtectedSetup/>} status={"returned"} title="Returned" value={valuesForStatus["returned"]}/>
//     </GridSections>
//     <Loading status={statusChecked ? filterOrdersByStatus_Status : getOrdersStatus}>
//     <TableOrders valuesForStatusHandle={valuesForStatusHandle} valuesForStatus={valuesForStatus} setValuesForStatus={setValuesForStatus} orders={statusChecked ? filterOrdersByStatus_Status.success : getOrdersStatus.success}/>
//         </Loading>     

//         </div>
//     </PageStructure>
//   )
// }
