import PageStructure from "../../Components/PageStructure/PageStructure";
import SectionStructure from "../../Components/SectionStructure/SectionStructure";
import "./Products.scss";
import { BiEdit, BiLogoZoom, BiPlusCircle, BiSolidZoomIn, BiZoomIn } from "react-icons/bi";
import productImg from "../../assets/profile.jpg";
import { BsCheckLg, BsTrash, BsTrash2, BsTrash3 } from "react-icons/bs";
import CheckBox from "../../Components/CheckBox/CheckBox";
import { useDispatch, useSelector } from "react-redux";
import Alert from "../../Components/Alert/Alert";
import Loading from "../../Components/Loading/Loading";
import ShadowLoading from "../../Components/ShadowLoading/ShadowLoading";
import { useEffect, useState } from "react";
import {changeProductVisibility, deleteManyStatus_products, deleteProduct, products, updateManyStatus_products} from "../../store/productsSlice";
import CercleLoading from "../../Components/CercleLoading/CercleLoading";
import { NavLink } from "react-router-dom";
import Btn from "../../Components/Btn/Btn";
import EmptyErrorSection from "../../Components/EmptyErrorSection/EmptyErrorSection";

export default function Products() {
  const dispatch = useDispatch();
  const { newProductStatus, allProducts, productsStatus ,deleteProductStatus , changeProductVisibilityStatus , updateProductStatus , addVariantsStatus , updateManyStatus_products_Status , deleteManyStatus_products_Status} = useSelector(
    (state) => state.products
  );
  const [itemDeletedId, setItemDeletedId] = useState([])
  
  const [itemsSelected , setItemsSelected] = useState([])

  const publishedHandle = (eo ,id, visibility) => {
    // console.log(eo.target.className);
        console.log(eo.target,id,visibility,9);
    dispatch(changeProductVisibility({id,visibility}))
  };
  const deleteProductHandle = (id) => {
    dispatch(deleteProduct(id)).then(docs => {
        console.log(docs.payload);
        setItemDeletedId(itemDeletedId.filter(id => id !== docs.payload))
    })
    setItemDeletedId([...itemDeletedId , id])
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
    dispatch(updateManyStatus_products({items: itemsSelected, status: e.target.value})).then((docs) => {
      console.log(docs);
      if(docs.type === "updateManyStatus_products/fulfilled"){
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
    dispatch(deleteManyStatus_products(itemsSelected)).then((docs) => {
      console.log(docs);
      if(docs.type === "deleteManyStatus_products/fulfilled"){
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
    dispatch(products());
  }, [dispatch]);


  return (
    <>
      {changeProductVisibilityStatus.isLoading && (
        <ShadowLoading/>
      )}
      {newProductStatus.success && (
        <Alert type="success">{newProductStatus.success.mss}</Alert>
      )}
          {updateProductStatus.success && (
        <Alert type="success">{updateProductStatus.success.mss}</Alert>
      )}
      {deleteProductStatus.success && (
        <Alert type="success">
            {/* {deleteProductStatus.success}  */}
            Deleted Successfully!</Alert>
      )}
      {changeProductVisibilityStatus.success && (
        <Alert type="success">Product Status Changed</Alert>
      )}
          {addVariantsStatus.success && (
        <Alert type="success">Product Variants Changed</Alert>
      )}
                {updateManyStatus_products_Status.success && (
        <Alert type="success">{updateManyStatus_products_Status.success}</Alert>
      )}
                      {updateManyStatus_products_Status.error && (
        <Alert type="danger">{updateManyStatus_products_Status.error}</Alert>
      )}
                            {updateManyStatus_products_Status.isLoading && (
        <ShadowLoading/>
      )}
                      {deleteManyStatus_products_Status.success && (
        <Alert type="success">{deleteManyStatus_products_Status.success}</Alert>
      )}
                      {deleteManyStatus_products_Status.error && (
        <Alert type="danger">{deleteManyStatus_products_Status.error}</Alert>
      )}
                            {deleteManyStatus_products_Status.isLoading && (
        <ShadowLoading/>
      )}
      <Loading status={productsStatus}>
        <PageStructure
          button={{ icon: <BiPlusCircle/> , href: "/admin/new-product", name: "New Product" }}
          title="Products"
        >
             <div className="actions-head">
        <Btn disabled={!itemsSelected.length} style={{position:"relative"}} element="button" btnStyle="bg" color="primary">
        <div className="icon"><BiEdit /></div> Update Many
                <select onChange={(e) => UpdateManyHandle(e)} disabled={!itemsSelected.length} name="selectManyBtn" id="selectManyBtn">
                    <option selected disabled value="">Status :</option>
                    <option value="true">Publish</option>
                    <option value="false">Private</option>
                </select>
        </Btn>
        <Btn onClick={deleteManyHandle} disabled={!itemsSelected.length} element="button" btnStyle="bg" color="danger"><div className="icon"><BsTrash/></div> Delete Many</Btn>
        </div>

          <div className="Products">
            <SectionStructure pd="none">
              <div className="products-table">
                <table>
                  <thead>
                    <tr>
                      <td>
                        {/* <input type="checkbox" name='selectAll' id="selectAll"/>
                                    <label htmlFor="selectAll" className='checkbox'>
                                        <BsCheckLg/>
                                    </label> */}
                        <CheckBox onChange={() => selectItemHandle("selectAll")} name={"selectAll"} id="selectAll" />
                      </td>
                      <td>PRODUCT NAME</td>
                      <td>CATEGORY</td>
                      <td>PRICE</td>
                      <td>SALE PRICE</td>
                      <td>STOCK</td>
                      <td>STATUS</td>
                      <td>VIEW</td>
                      <td>PUBLISHED</td>
                      <td>ACTIONS</td>
                    </tr>
                  </thead>
                  <tbody>
                    {allProducts.map((prod, ind) => (
                        <tr key={prod._id}>
                          <td>
                            {/* <input type="checkbox" name='selectOne' id={ind+"one"}/>
                                    <label htmlFor={ind+"one"} className='checkbox'>
                                        <BsCheckLg/>
                                    </label> */}
                            <CheckBox
                              onChange={() => selectItemHandle("selectOne")}
                              name={"selectOne"}
                              id={`${prod._id}`}
                            />
                          </td>
                          <td>
                            <div className="product-name">
                              <div className="img">
                                <img src={"http://localhost:3500/media/"+prod.media.images[0]} alt="" />
                              </div>
                              <h4>{prod.name}</h4>
                            </div>
                          </td>
                          <td>
                            <div className="categorie">{prod.categorie}</div>
                          </td>
                          <td>
                            <div className="original-price price">
                              {prod.prices.originalPrice}<span>mad</span>
                            </div>
                          </td>
                          <td>
                            <div className="sale-price price">
                            {prod.prices.salePrice}<span>mad</span>
                            </div>
                          </td>
                          <td>
                            <div className="stock">{prod.quantite}</div>
                          </td>
                          <td>
                            {/* outOfStock */}
                            <div className={`status ${prod.productStatus.status === "true" ? "inStock" : "outOfStock"}`}>
                              <div className="circle"></div>
                              <div className="status-name">{prod.productStatus.status === "true" ? "in stock" : "outOfStock"}</div>
                            </div>
                          </td>
                          <td>
                            <div className="view">
                              <BiZoomIn />
                              {/* <BsZoomIn/> */}
                            </div>
                          </td>
                          <td>
                            <div
                              onClick={(eo) => publishedHandle(eo ,prod._id, `${prod.productStatus.visibility}`)}
                              className={`published ${prod.productStatus.visibility === "true" ? "checked" : "notChecked"}`}
                            >
                              <div className="btnForClick"></div>
                            </div>
                          </td>
                          <td>
                            <div className="actions">
                              <NavLink to={`/admin/products/edit/${prod._id}`} className="edit">
                                <BiEdit />
                              </NavLink>
                              <div className="delete">
                                {deleteProductStatus.isLoading && itemDeletedId.indexOf(prod._id) !== -1 ? <CercleLoading size="l"/> : <BsTrash onClick={() => deleteProductHandle(prod._id)} /> }
                                
                                {/* <BsTrash onClick={() => deleteProductHandle(prod._id)} /> */}
                              </div>
                            </div>
                          </td>
                        </tr>
                    ))}
                  </tbody>
                </table>
                {allProducts.length ? (false
        ) : (
            <EmptyErrorSection/>
        )}
              </div>
            </SectionStructure>
          </div>
        </PageStructure>
      </Loading>
    </>
  );
}
