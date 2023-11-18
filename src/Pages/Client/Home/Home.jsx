import ClientProducts from '../../../Components/Client/ClientProducts/ClientProducts'
import MasterCleanse from '../../../Components/MasterCleanse/MasterCleanse'
import './Home.scss'
import Loading from '../../../Components/Loading/Loading'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { products } from '../../../store/productsSlice'
import { client_getProducts } from '../../../store/client_productsSlice'
import CategoriesSection from '../../../Components/Client/Categories/CategoriesSection'

export default function Home() {
  const dispatch = useDispatch()
  const { client_getProductsStatus , allProducts } = useSelector(state => state.client_products)
  console.log(client_getProductsStatus);
  useEffect(() => {
    dispatch(client_getProducts())
  }, [dispatch])
  
  return (
    <div className='Home'>
      <Loading status={client_getProductsStatus}>
        <CategoriesSection/>
        <ClientProducts products={allProducts} />
        <MasterCleanse/>
      </Loading>
    </div>
  )
}
