import { useEffect } from 'react'
import Alert from '../Alert/Alert'
import CercleLoading from '../CercleLoading/CercleLoading'
import './Loading.scss'

export default function Loading({status, children}) {
    const {isLoading , success , error } = status
    // if(isLoading) (
    //     return 
    //         <div className='Loading'>
    //         <CercleLoading/>
    //     </div>
        
    // )
    // if(error){
    //     <Alert type={"danger"}>{error}</Alert>
    // }
    // if(!isLoading && success) {
    //     return children
    // }
    return (
        <>
        {isLoading && (
                       <div className='Loading'>
            <CercleLoading/>
        </div> 
        )}
        {error && <Alert type={"danger"}>{error}</Alert>}
        {(!isLoading && success) && (children)}
        </>
    )
}
