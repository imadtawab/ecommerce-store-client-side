import { useEffect, useState } from 'react';
import './Cart.scss'
import {BiMinus , BiPlus} from 'react-icons/bi'
import {useDispatch , useSelector } from "react-redux";
import { changeQuantite, deleteProductFromCard, getShoppingCard } from '../../../store/usersSlice';
import { BsTrash } from 'react-icons/bs';
import Alert from '../../../Components/Alert/Alert';
import CheckOutPage from '../CheckOutPage/CheckOutPage';

export default function Cart() {
  const {shoppingCard,deleteProductFromCardStatus} = useSelector(s => s.users)
  const {newOrderStatus} = useSelector(s => s.orders)
  const [numberOfCard , setNumberOfCard] = useState(0)
  const [totalPrice , setTotalPrice] = useState(0)
  const [showCheckOutPage , setShowCheckOutPage] = useState(false)
  const dispatch = useDispatch()
  // const [shoppingCard1, setShoppingCard1] = useState([])
  const deleteProductFromHandle = (productId, variantId) => {
    console.log(productId,variantId);
    dispatch(deleteProductFromCard({productId,variantId}))
  }
  // useEffect(() => {
  //   console.log("object");
  //   console.log(shoppingCard);
  //   setShoppingCard1(shoppingCard)
  // }, [shoppingCard])
  
  useEffect(() => {
    dispatch(getShoppingCard())
  }, [dispatch])
  useEffect(() => {
    // setNumberOfCard(shoppingCard.reduce((a,b) => a.variants.length + b.variants.length))
    setNumberOfCard([...shoppingCard.map(p => p.variants.length),0,0].reduce((a,b) => a + b))
    setTotalPrice([...shoppingCard.map(p => p.variants.map(v => v.quantiteUser * v.salePrice)).map(a => a.reduce((a,b) => a+b)),0,0].reduce((a,b) => a+b))
  }, [shoppingCard])
  const changeQuantiteHandle = (type, variantId) => {
    dispatch(changeQuantite({type, variantId}))
  }
  const checkOutHandle = () => {
    setShowCheckOutPage(true)
  }
  return (
    <>
                {newOrderStatus.success && (
      <Alert type="success">{newOrderStatus.success}</Alert>
    )}
             {deleteProductFromCardStatus.success && (
              <Alert type={"success"}>{deleteProductFromCardStatus.success}</Alert>
            )}
                {deleteProductFromCardStatus.error && (
              <Alert type={"danger"}>{deleteProductFromCardStatus.error}</Alert>
            )}
            
            {!showCheckOutPage ? (
                  shoppingCard.length > 0 ? (
                    <div className='Cart'>
                    <div className="shopping-cart">
                  <div className="head">
                  <div className='title'>Shopping Cart</div>
                  <div className="items">{numberOfCard} items</div>
                  </div>
                  <div className="content">
                  <table>
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
                       {/* <div className="quantite">
                           <div className="minus">
                               <BiMinus/>
                           </div>
                           <input type="number" disabled value={shoppingCard[1].quantite} />
                           <div className="plus">
                             <BiPlus/>
                           </div>
                         </div> */}
                  
                       </td>
                       <td>
                         {/* <div className="price">
                           {shoppingCard[1].variant.salePrice}<span>mad</span>
                         </div> */}
                       </td>
                       <td>
                       <div className="price">
                         {/*shoppingCard[1].variant.salePrice*shoppingCard[1].quantite*/}{prod.variants.map(p => p.quantiteUser * p.salePrice).reduce((a,b) => a+b)}<span>mad</span>
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
                             {/* <div className="price">
                               {shoppingCard[1].variant.salePrice*shoppingCard[1].quantite}<span>mad</span>
                               </div> */}
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
                  
                  
                  </table>
                  </div>
                  </div>
                  <div className="order-summary">
                    <div className="head">
                      <div className='title'>Order Summary</div>
                    </div>
                  <div className="content">
                  <div className="box head">
                   <div className="title">{numberOfCard} items</div>
                   <div className="total">{totalPrice}<span>mad</span></div>
                  </div>
                  <div className="box shipping">
                   <div className="title">Shipping</div>
                   <select name="shipping" id="shipping">
                     <option value="10">Standard shipping 10 mad</option>
                   </select>
                  </div>
                  <div className="box promo">
                   <div className="title">Promo Code</div>
                   <input type="text" placeholder='Enter your code' />
                   <div className="apply">Apply</div>
                  </div>
                  <div className="box footer">
                   <div className="title">Total Cost</div>
                   <div className="total">{totalPrice}<span>mad</span></div>
                  </div>
                  <div onClick={checkOutHandle} className="checkout">Checkout</div>
                  </div>
                  </div>
                  </div>
                        ): <h3 style={{minHeight: "400px",
                          display: "grid",
                          placeContent: "center",
                          padding: "10px"}}>Card Is Empty</h3>
                        
            ) :(
            <CheckOutPage totalPrice={totalPrice} shoppingCard={shoppingCard} numberOfCard={numberOfCard} setShowCheckOutPage={setShowCheckOutPage}/>
            )}
    </>
  )
}
