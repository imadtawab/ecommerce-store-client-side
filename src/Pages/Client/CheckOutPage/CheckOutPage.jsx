import "./CheckOutPage.scss";
import InputBox, { TextAreaBox } from "../../../Components/InputBox/InputBox";
import ShadowLoading from "../../../Components/ShadowLoading/ShadowLoading";
import { BsArrowLeft } from "react-icons/bs";
import { useEffect, useState } from "react";
import { newOrder } from "../../../store/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import CercleLoading from "../../../Components/CercleLoading/CercleLoading";
import Alert from "../../../Components/Alert/Alert";
import { getShoppingCard } from "../../../store/usersSlice";
export default function CheckOutPage({shoppingCard,numberOfCard,setShowCheckOutPage,totalPrice}) {
  const {newOrderStatus} = useSelector(s => s.orders)
  const dispatch = useDispatch()
  const [firstName , setFirstName] = useState("")
  const [lastName , setLastName] = useState("")
  const [phone , setPhone] = useState({
    value: "",
    error: false
  })
  const [email , setEmail] = useState("")
  const [city , setCity] = useState("")
  const [address , setAddress] = useState("")
  const [customer_Notes , setCustomer_Notes] = useState("")
// useEffect(() => {
//   console.log(userProd,99);
//   userProd.forEach(user => {
//     let lastProducts = []
//     console.log(user,1111);
//     user.products.forEach(userP => {
//       console.log(userP,2222);
//       console.log(products,3333);
//       products.forEach(prod => {
//         console.log(prod._id , userP.productId,4444);
//         if(prod._id === userP.productId){
//           let lastVariants = userP.variants.map(v => v.variantId)
//           console.log(lastVariants,5555);
//           let lastProd = {
//               ...prod,
//               variants: prod.variants.map(v => {
//                 if(lastVariants.indexOf(v.variantId) !== -1) {
//                   return {...v, quantiteUser: lastVariants[lastVariants.indexOf(v.variantId)].quantiteUser}
//                   }
//                   return  false
//                 })
//           }
//           console.log(lastProd,6666);
//           lastProducts.push(lastProd)
//         }
//       })
//     })
//     console.log(lastProducts,7777);
//     console.log("-------------------")
//   })
//   console.log("^^^^^^^^^^^^^^^^^^^^");
// }, [])

  const placeOrderHandle = () => {
    console.log(shoppingCard);
    // if(phone.value === ""){
    //   setPhone({...phone, error: true})
    //   return false
    // }
    let userInformation = {
      firstName,
      lastName,
      phone: phone.value,
      email,
      city,
      address,
      customer_Notes
    }
    let shoppingProducts = shoppingCard.map((card, ind) => {
      return {
        productId: card.productId,
        userId: card.userId,
        variants: card.variants.map(v => {
          return {variantId:v.variantId,variantArr:v.variantArr,quantiteUser: v.quantiteUser}
        })
      }
    })
    dispatch(newOrder({userInformation,shoppingProducts})).then(docs => {
      if(docs.type === "newOrder/fulfilled"){
        setShowCheckOutPage(false)
        dispatch(getShoppingCard())
      }
    })
    // console.log({userInformation,product});
  }
  return (
    <>
    {newOrderStatus.isLoading && (
      <ShadowLoading/>
    )}
        {newOrderStatus.error && (
      <Alert type="danger">{newOrderStatus.error}</Alert>
    )}

    <div className="CheckOutPage">
      <div onClick={() => setShowCheckOutPage(false)} className="go-to-back"><BsArrowLeft/>Go To Back</div>
      <div className="shopping-cart">
        <div className="head">
          <div className="title">Check out</div>
          {/* <div className="items">{numberOfCard}2 items</div> */}
        </div>
        <div className="content">
          <div className="information-user">
            <div className="box">
              <InputBox
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                required
                error=""
                type="text"
                name="firstName"
                id="firstName"
                placeholder="First Name"
                label="First Name"
              />
              <InputBox
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                required
                error=""
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Last Name"
                label="Last Name"
              />
            </div>
            <div className="box">
              <InputBox
                error={phone.error ? "Please Enter Your Phone" : false}
                value={phone.value}
                onChange={e => setPhone(prev => {
                  return {error: false , value: e.target.value}
                })}
                required
                type="text"
                name="phone"
                id="phone"
                placeholder="Phone"
                label="Phone"
              />
              <InputBox
                value={email}
                onChange={e => setEmail(e.target.value)}
                error=""
                type="text"
                name="email"
                id="email"
                placeholder="Email"
                label="Email"
              />
            </div>
            <div className="box">
              <InputBox
                value={city}
                onChange={e => setCity(e.target.value)}
                required
                error=""
                type="text"
                name="city"
                id="city"
                placeholder="City"
                label="City"
              />
              <InputBox
                value={address}
                onChange={e => setAddress(e.target.value)}
                required
                error=""
                type="text"
                name="address"
                id="address"
                placeholder="Address"
                label="Address"
              />
            </div>
            <div className="box">
              <TextAreaBox          
                value={customer_Notes}
                onChange={e => setCustomer_Notes(e.target.value)}
                required
                error=""
                type="text"
                name="customer_Notes"
                id="customer_Notes"
                placeholder="Customer Notes"
                label="Customer Notes"/>
            </div>
            {/* <InputBox value="buy" type="button"/> */}
            <div onClick={placeOrderHandle} className="buyOrder">{newOrderStatus.isLoading ? (
              <div className="loadingBtn"><CercleLoading type="btn" size="l"/>Loading</div>
            ) : "Place Order" }</div>
            {/* <div className="footer-buttons">
              <div className="box">
                <Btn
                  btnStyle="outline"
                  color="danger"
                  element="a"
                  to={"/admin/products"}
                >
                  Go To Back
                </Btn>
              </div>
              <div className="box">
                <Btn
                  onClick={""}
                  loading={""}
                  btnStyle="bg"
                  color="success"
                  element="button"
                  type="submit"
                >
                  PLace Order
                </Btn>
              </div>
            </div> */}
          </div>
          {/* <table>
                    <tr>
                     <th>Product details</th>
                     <th>QUANTITY</th>
                     <th>PRICE</th>
                     <th>TOTAL</th>
                     <th>DELETE</th>
                   </tr>
                   {shoppingCard.map((prod,i) => (
                     prod.variants.length === 1 ? (
                       <tr  key={Date.now()*i}>
                       <td>
                         <div className="product-details">
                           <div className="image">
                             <img src={`http://localhost:3500/media/${prod.variants[0].image}`} alt="" />
                           </div>
                           <div className="info">
                             <div className="title">{prod.name}</div>
                             <div className="categorie">{prod.categorie}</div>
                             <div className="variants">{prod.variants[0].variantName}</div>
                           </div>
                         </div>
                       </td>
                       <td>
                       <div className="quantite">
                           <div onClick={() => changeQuantiteHandle("minus",prod.variants[0].variantId)} className="minus">
                               <BiMinus/>
                           </div>
                           <input type="number" disabled value={prod.variants[0].quantiteUser} />
                           <div onClick={() => changeQuantiteHandle("plus",prod.variants[0].variantId)} className="plus">
                             <BiPlus/>
                           </div>
                         </div>
                       </td>
                       <td>
                         <div className="price">
                           {prod.variants[0].salePrice}<span>mad</span>
                         </div>
                       </td>
                       <td>
                         <div className="price">
                         {prod.variants[0].salePrice * prod.variants[0].quantiteUser}<span>mad</span>
                         </div>
                       </td>
                       <td>
                         <div className="delete">
                           <BsTrash onClick={() => deleteProductFromHandle(prod.productId,prod.variants[0].variantId)} />
                         </div>
                       </td>
                     </tr>
                     ) : (
                       <>
                       <tr className='sub-product-head' key={Date.now()*i*2}>
                       <td>
                         <div className="product-details">
                           <div className="image">
                             <img src={`http://localhost:3500/media/${prod.image}`} alt="" />
                           </div>
                           <div className="info">
                             <div className="title">{prod.name}</div>
                             <div className="categorie">{prod.categorie}</div>
                           </div>
                         </div>
                       </td>
                       <td>
                  
                       </td>
                       <td>
                       </td>
                       <td>
                       <div className="price">
                         {prod.variants.map(p => p.quantiteUser * p.salePrice).reduce((a,b) => a+b)}<span>mad</span>
                         </div>
                       </td>
                     </tr>
                    
                     
                     <>
                        {   prod.variants.map(v => (
                             <tr className='sub-product' key={Date.now()*v.variantId}>
                             <td>
                               <div className="product-details">
                               <div className="info sub-variants">
                                     <div className="sub-image">
                                       <img src={`http://localhost:3500/media/${v.image}`} alt="" />
                                     </div>
                                     <div className="variants">{v.variantName}</div>
                                   </div>
                               </div>
                             </td>
                             <td>
                             <div className="quantite">
                                 <div onClick={() => changeQuantiteHandle("minus",v.variantId)} className="minus">
                                     <BiMinus/>
                                 </div>
                                 <input type="number" disabled value={v.quantiteUser} />
                                 <div onClick={() => changeQuantiteHandle("plus",v.variantId)} className="plus">
                                   <BiPlus/>
                                 </div>
                               </div>
                  
                             </td>
                             <td>
                               <div className="price">
                                 {v.salePrice}<span>mad</span>
                               </div>
                             </td>
                             <td>
                             </td>
                             <td>
                               <div className="delete">
                                 <BsTrash onClick={() => deleteProductFromHandle(prod.productId,v.variantId)} />
                               </div>
                             </td>
                           </tr>
                           ))
                           }
                     </>
                     </>
                     )
                   ))}
                  
                  
                  </table> */}
        </div>
      </div>
      <div className="order-summary">
        <div className="head">
          <div className="title">Order Summary</div>
        </div>
        <div className="content">
          <div className="content-head">
            <div className="box-head">
              <div className="title">{numberOfCard} items</div>
              <div className="total">{totalPrice}<span>mad</span></div>
            </div>
            <div className="box-head">
              <div className="title">Shipping</div>
              <div className="total">Free{/*<span>mad</span>*/}</div>
            </div>
            <div className="box-head">
              <div className="title">Total</div>
              <div className="total">{totalPrice}<span>mad</span></div>
            </div>
          </div>
          {shoppingCard.map(prod => (
            <div className="product-box">
                <div className="product-info">
                  <div className="info-image">
                    <img src={`http://localhost:3500/media/${prod.image}`}  alt="" />
                    <div className="quantite">{prod.variants.map(v => v.quantiteUser).reduce((a,b) => a + b)}</div>
                  </div>
                  <div className="info-text">
                    <h3>{prod.name}</h3>
                    <p>{prod.categorie}</p>
                  </div>
                </div>
                <div className="total-price">
                  <div className="price">{prod.variants.map(v => v.quantiteUser * v.salePrice).reduce((a,b) => a + b)}<span>mad</span></div>
                </div>
            </div>
          ))}
            <div className="footer-box">
              
                   {/* <div className="title">Total Cost</div> */}
                   {/* <div className="total">{shoppingCard.map(p => p.variants.map(v => v.quantiteUser * v.salePrice)).map(a => a.reduce((a,b) => a+b)).reduce((a,b) => a+b)}<span>mad</span></div> */}
            </div>
          {/* <div className="box head">
            <div className="title">{numberOfCard}2 items</div>
            <div className="total">
              {shoppingCard.map(p => p.variants.map(v => v.quantiteUser * v.salePrice)).map(a => a.reduce((a,b) => a+b)).reduce((a,b) => a+b)}
              252<span>mad</span>
            </div>
          </div>
          <div className="box shipping">
            <div className="title">Shipping</div>
            <select name="shipping" id="shipping">
              <option value="10">Standard shipping 10 mad</option>
            </select>
          </div>
          <div className="box promo">
            <div className="title">Promo Code</div>
            <input type="text" placeholder="Enter your code" />
            <div className="apply">Apply</div>
          </div>
          <div className="box footer">
            <div className="title">Total Cost</div>
            <div className="total">
              {shoppingCard.map(p => p.variants.map(v => v.quantiteUser * v.salePrice)).map(a => a.reduce((a,b) => a+b)).reduce((a,b) => a+b)}
              252<span>mad</span>
            </div>
          </div>
          <div onClick={"checkOutHandle"} className="checkout">
            Checkout
          </div> */}
        </div>
      </div>
    </div>
  </>
  );
  }
