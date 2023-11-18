import { NavLink } from 'react-router-dom'
import ClientSectionStructure from '../ClientSectionStructure/ClientSectionStructure'
import './ClientProducts.scss'

export default function ClientProducts({products}) {
    const productss = [
        {
            _id: "1",
            media : {images : ["https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"]},
            categorie: "MEN'S CLOTHING",
            name: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
            prices: {
                originalPrice : 200,
                salePrice: 109.95,
                discount: 20
            }
        },        {
            _id: "2",
            media : {images : ["https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg"]},
            categorie: "MEN'S CLOTHING",
            name: "Mens Cotton Jacket",
            prices: {
                originalPrice : 100,
                salePrice: 55.99,
                discount: 30
            }
        },        {
            _id: "3",
            media : {images : ["https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg"]},
            categorie: "JEWELERY",
            name: "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
            prices: {
                originalPrice : 1000,
                salePrice: 695,
                discount: 0
            }
        },        {
            _id: "4",
            media : {images : ["https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg"]},
            categorie: "MEN'S CLOTHING",
            name: "Mens Cotton Jacket",
            prices: {
                originalPrice : 100,
                salePrice: 55.99,
                discount: 30
            }
        },        {
            _id: "5",
            media : {images : ["https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg"]},
            categorie: "MEN'S CLOTHING",
            name: "Mens Cotton Jacket",
            prices: {
                originalPrice : 100,
                salePrice: 55.99,
                discount: 30
            }
        },
    ]
  return (
    <ClientSectionStructure subTitle="Products" title="MOST POPULAR PRODUCTS">
        <div className='ClientProducts'>
            {products.map(prod => (
                <NavLink to={`/products/${prod._id}`} className="box-product">
                    {prod.prices.discount ? (
                        <>
                                            <span className='kanba'></span>
                    <div className="promo">{prod.prices.discount}%</div>
                    </>
                    ) : false}
                    <div className="image">
                        {/* <img src={prod.media.images[0]} alt={prod.name} /> */}
                        <img src={"http://localhost:3500/media/"+prod.media.images[0]} alt={prod.name} />
                    </div>
                    <p>{prod.categorie}</p>
                    <h2>{prod.name}</h2>
                    <div className="prices">
                    <div className="originalPrice">{prod.prices.originalPrice}<span>mad</span></div>
                    <div className="salePrice">{prod.prices.salePrice}<span>mad</span></div>
                    </div>
                    <div className="buy">Ajouter au panier</div>
                </NavLink>
            ))}
        </div>
    </ClientSectionStructure>
  )
}
