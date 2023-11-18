import './CercleLoading.scss'

export default function CercleLoading({type , size,theme}) {
    // type : btn
    // size : l
  return (
    <div className={`CercleLoading ${type ? type : ""} ${size ? size : ""}`}>
        <div className="cercle"></div>
    </div>
  )
}
