import './VariantsTable.scss'
import SectionStructure from '../SectionStructure/SectionStructure'
import { BiEdit } from 'react-icons/bi'
import { BsTrash } from 'react-icons/bs'
import { useEffect, useState } from 'react'
import ShadowLoading from '../ShadowLoading/ShadowLoading'

export default function VariantsTable({productForVariants , mainData , setMainData}) {
    // const mainItems = {
    //     image : productForVariants.media.images[0],
    //     sku : productForVariants.sku,
    //     originalPrice : productForVariants.prices.originalPrice,
    //     salePrice : productForVariants.prices.salePrice,
    //     quantite : productForVariants.quantite
    // }
    // const ddd = data.map(v => {
    //     return {...mainItems,...{...v}}
    // })
    const [showImgCatalogue , setShowImgCatalogue ] = useState(false)
    const [varId , setVarId ] = useState(false)
    const [mainDataTest , setMainDataTest ] = useState([])

    // console.log(mainData);
    const changeImageHandle = (variantId) => {
        setShowImgCatalogue(true)
        setVarId(variantId)

    }
    const imgSelectedHAndle = (img) => {
            console.log(mainData,8);
            setMainData(prev => {
                return {...prev, variants: mainData.variants.map(v => {
                    console.log(v.variantId, varId,55);
                    if(v.variantId === varId){
                        let obj = Object.freeze(v);
                        obj = { ...v , image:img }; // replacing it with a new object works
                        return obj
                    }
                    return v
                })}
            })
            
        setShowImgCatalogue(false)
        setVarId(false)
        console.log(mainData,"ffffffffff");
    }
    const inputChangeHandle = (eo, id) => {
        setMainData(prev => {
            return {...prev, variants: prev.variants.map(v => {
                if(v.variantId === id){
                    let obj = Object.freeze(v);
                    obj = { ...v , [eo.target.name]: eo.target.value }; // replacing it with a new object works
                    return obj
                }
                return v
            })}
        })
        console.log(mainData,99);
    }
    // useEffect(() => {
    //   setMainDataTest(mainData)
    // }, [mainData])
    
  return (
    <div className='VariantsTable'>
        {showImgCatalogue && (
            <>
            <ShadowLoading/>
            <SectionStructure style={{position: "fixed",maxWidth: "100%",top: "50%",left: "50%",zIndex: "99999999",transform: "translate(-50%, -50%)",    boxShadow: "0px 0px 27px 11px rgb(111 111 111)",minWidth: "300px",minHeight: "50%"}} title={"Catalogue"}>
                <div className="catalogue">
                    {productForVariants.media.images.map((img , ind) => (
                        <div className="img">
                        <img onClick={() => imgSelectedHAndle(img)} key={ind+"catalogue"} src={`http://localhost:3500/media/${img}`} alt="" />
                    </div>
                    ))}
                </div>
            </SectionStructure>
            </>
        )}
           {mainData.variants.length ? (
                        <SectionStructure pd="none">
             <div className="products-table">
             <table>
                 <thead>
                     <tr>
                         <td>IMAGE</td>
                         <td>COMBINATION</td>
                         <td>SKU</td>
                         <td>PRICE</td>
                         <td>SALE PRICE</td>
                         <td>QUANTITY</td>
                         <td>ACTION</td>
                     </tr>
                 </thead>
                 <tbody>
                    {console.log(mainData)}
                     {mainData.variants.map((variant,ind) => (
                         <>
{/* {                         console.log(variant)} */}
                     <tr key={ind}>
                         <td>
                             <div className="product-name">
                                 <div className="img">
                                     <img src={`http://localhost:3500/media/${variant.image}`} alt="" />
                                 </div>
                                 <h4><BiEdit onClick={() => changeImageHandle(variant.variantId)}/></h4>
                                 
                             </div>
                         </td>
                         <td>
                             <div className="ftw-n">
                                 {variant.variantName}
                             </div>
                         </td>
                         <td>
                             <div className="input">
                                 <input onChange={(eo) => inputChangeHandle(eo,variant.variantId)} placeholder='SKU' value={variant.sku} type="text" name="sku" id="" />
                             </div>
                         </td>
                         <td>
                         <div className="input">
                                 <input onChange={(eo) => inputChangeHandle(eo,variant.variantId)} disabled value={variant.originalPrice} placeholder='Price' type="text" name="originalPrice" id="" />
                             </div>
                         </td>
                         <td>
                         <div className="input">
                                 <input onChange={(eo) => inputChangeHandle(eo,variant.variantId)} value={variant.salePrice} placeholder='Sale price' type="text" name="salePrice" id="" />
                             </div>
                         </td>
                         <td>
                         <div className="input">
                                 <input onChange={(eo) => inputChangeHandle(eo,variant.variantId)} value={variant.quantite} placeholder='Quantite' type="text" name="quantite" id="" />
                             </div>
                         </td>
                         <td>
                         <div className="delete">
                                     <BsTrash onClick={() => {
                                         setMainData(prev => {return {...prev , variants: mainData.variants.filter(v => v.variantId !== variant.variantId)}})
                                     }} />
                                 </div>
                         </td>
                     </tr>
     
                         </>
                     ))}
                     
                 </tbody>
             </table>
         </div>
               </SectionStructure>
           ) : (
            false
           )}
    </div>
  )
}
