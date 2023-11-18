import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../../Components/Loading/Loading'
import NewProduct from '../NewProduct/NewProduct'
import { useParams } from 'react-router'
import { productDetails } from '../../store/productsSlice'

export default function EditProduct() {
    const params = useParams()
    const dispatch = useDispatch()
    const {productDetailsStatus} = useSelector(state => state.products)
    useEffect(() => {
      dispatch(productDetails(params.id))
    }, [dispatch,params.id])
    
  return (
    <>
        <Loading status={productDetailsStatus}>
            <NewProduct editProduct={true} productData={productDetailsStatus.success}/>
        </Loading>
    </>
  )
}
