import CategoriesSection from '../../../Components/Client/Categories/CategoriesSection'
import ClientProducts from '../../../Components/Client/ClientProducts/ClientProducts'
import './ProductsPage.scss'

export default function ProductsPage() {
  return (
    <div className='ProductsPage'>
        <CategoriesSection/>
        <ClientProducts/>
    </div>
  )
}
