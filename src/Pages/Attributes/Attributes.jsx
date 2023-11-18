import { NavLink } from 'react-router-dom'
import CheckBox from '../../Components/CheckBox/CheckBox'
import PageStructure from '../../Components/PageStructure/PageStructure'
import SectionStructure from '../../Components/SectionStructure/SectionStructure'
import './Attributes.scss'
import CercleLoading from '../../Components/CercleLoading/CercleLoading'
import { BsTrash } from 'react-icons/bs'
import { BiCloset, BiEdit, BiX } from 'react-icons/bi'
import ShadowLoading from '../../Components/ShadowLoading/ShadowLoading'
import Loading from '../../Components/Loading/Loading'
import { useEffect, useState } from 'react'
import InputBox, { SelectBox } from '../../Components/InputBox/InputBox'
import Btn from '../../Components/Btn/Btn'
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux'
import { changeAttributeVisibility, createAttributes, deleteAttribute, deleteManyStatus_attributes, getAttributes, updateAttribute, updateManyStatus_attributes } from '../../store/usersSlice'
import Alert from '../../Components/Alert/Alert'
import EmptyErrorSection from '../../Components/EmptyErrorSection/EmptyErrorSection'

export default function Attributes() {
  const {createAttributesStatus,getAttributesStatus,deleteAttributeStatus,changeAttributeVisibilityStatus,updateAttributeStatus , updateManyStatus_attributes_Status , deleteManyStatus_attributes_Status} = useSelector(s => s.users)
    const [addNewProductSection, setAddNewProductSection] = useState(false)
    const dispatch = useDispatch()
    const [itemDeletedId, setItemDeletedId] = useState([])
    const [oldAttribute, setOldAttribute] = useState(false)
    const [itemChecked, setItemChecked] = useState(null)
    const [itemsSelected , setItemsSelected] = useState([])
  useEffect(() => {
    dispatch(getAttributes())
  }, [])
  const publishedHandle = (eo ,id, visibility) => {
    // console.log(eo.target.className);
        console.log(eo.target,id,visibility,9);
    dispatch(changeAttributeVisibility({id,visibility}))
    setItemChecked(id)
  };
  const deleteProductHandle = (id) => {
    dispatch(deleteAttribute(id)).then(docs => {
        console.log(docs.payload);
        setItemDeletedId(itemDeletedId.filter(id => id !== docs.payload.id))
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
    dispatch(updateManyStatus_attributes({items: itemsSelected, status: e.target.value})).then((docs) => {
      console.log(docs);
      if(docs.type === "updateManyStatus_attributes/fulfilled"){
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
    dispatch(deleteManyStatus_attributes(itemsSelected)).then((docs) => {
      console.log(docs);
      if(docs.type === "deleteManyStatus_attributes/fulfilled"){
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
  return (
    <>
    {/* {changeAttributeVisibilityStatus.isLoading && (
      <ShadowLoading/>
    )} */}
            {createAttributesStatus.success && (
      <Alert type="success">{createAttributesStatus.success}</Alert>
    )}
    {deleteAttributeStatus.success && (
      <Alert type="success">{deleteAttributeStatus.success}</Alert>
    )}
        {deleteAttributeStatus.error && (
      <Alert type="danger">{deleteAttributeStatus.error}</Alert>
    )}
        {changeAttributeVisibilityStatus.success && (
      <Alert type="success">{changeAttributeVisibilityStatus.success}</Alert>
    )}
        {changeAttributeVisibilityStatus.error && (
      <Alert type="danger">{changeAttributeVisibilityStatus.error}</Alert>
    )}
            {updateAttributeStatus.success && (
      <Alert type="success">{updateAttributeStatus.success}</Alert>
    )}
        {updateAttributeStatus.error && (
      <Alert type="danger">{updateAttributeStatus.error}</Alert>
    )}
                    {updateManyStatus_attributes_Status.success && (
        <Alert type="success">{updateManyStatus_attributes_Status.success}</Alert>
      )}
                      {updateManyStatus_attributes_Status.error && (
        <Alert type="danger">{updateManyStatus_attributes_Status.error}</Alert>
      )}
                            {updateManyStatus_attributes_Status.isLoading && (
        <ShadowLoading/>
      )}
                      {deleteManyStatus_attributes_Status.success && (
        <Alert type="success">{deleteManyStatus_attributes_Status.success}</Alert>
      )}
                      {deleteManyStatus_attributes_Status.error && (
        <Alert type="danger">{deleteManyStatus_attributes_Status.error}</Alert>
      )}
                            {deleteManyStatus_attributes_Status.isLoading && (
        <ShadowLoading/>
      )}
    <PageStructure title={"Attributes"} button={!addNewProductSection && {onClick:()=>{
      setOldAttribute(false)
      setAddNewProductSection(true)
      },type:"button",name:"Add New Attribute"}}>
        <div className='Attributes'>
        {addNewProductSection ? (
        <AddNewAttributes setAddNewProductSection={setAddNewProductSection} oldAttribute={oldAttribute} setOldAttribute={setOldAttribute}/>
    ) : (
      <>
        <Loading status={getAttributesStatus}>
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
        <SectionStructure pd="none">
        
        <div className="products-table">
          <table>
            <thead>
              <tr>
                <td>
                  <CheckBox onChange={() => selectItemHandle("selectAll")} name={"selectAll"} id="selectAll"/>
                </td>
                <td style={{textAlign: "initial"}}>UNIQUE NAME</td>
                <td>NAME</td>
                <td>TYPE</td>
                <td>PUBLISHED</td>
                <td>ACTIONS</td>
              </tr>
            </thead>
            <tbody>
              {console.log(getAttributesStatus.success)}
              {(getAttributesStatus.success || []).map((att, ind) => (
                  <tr key={att._id}>
                    <td>
                      <CheckBox
                              onChange={() => selectItemHandle("selectOne")}
                              name={"selectOne"}
                              id={`${att._id}`}
                            />
                    </td>
                    <td>
                      <div className="product-name">
                        <h4>{att.uniqueName}</h4>
                      </div>
                    </td>
                    <td>
                      <div className="categorie">{att.name}</div>
                    </td>
                    <td>
                    <div className="categorie">{att.type}</div>
                    </td>
                    <td>
                      <div
                        onClick={(eo) => publishedHandle(eo ,att._id, `${att.publish}`)}
                        className={`published ${att.publish === "true" ? "checked" : "notChecked"}`}
                      >
                        {/* {changeAttributeVisibilityStatus.isLoading ? (
                          <div className={"btnForClick loading"}></div>
                        ): (
                          <div className={"btnForClick"}></div>
                        )} */}
                        <div className={"btnForClick" + ((changeAttributeVisibilityStatus.isLoading && itemChecked === att._id) ? " loading" : "")}></div>
                      </div>
                    </td>
                    <td>
                      <div className="actions">
                        <dev onClick={() => {
                          setOldAttribute(att)
                          setAddNewProductSection(true)
                        }} className="edit">
                          <BiEdit />
                        </dev>
                        <div className="delete">
                          {deleteAttributeStatus.isLoading && itemDeletedId.indexOf(att._id) !== -1 ? <CercleLoading size="l"/> : <BsTrash onClick={() => deleteProductHandle(att._id)} /> }
                          
                          {/* <BsTrash onClick={() => deleteProductHandle(prod._id)} /> */}
                        </div>
                      </div>
                    </td>
                  </tr>
              ))}
            </tbody>
          </table>
          {(getAttributesStatus.success || []).length ? (false
        ) : (
            <EmptyErrorSection/>
        )}
        </div>
      </SectionStructure>
        </Loading>
      </>
    )}

        </div>
    </PageStructure>
    </>
  )
}


export function AddNewAttributes({setAddNewProductSection , oldAttribute,setOldAttribute}) {
  const {user , createAttributesStatus,updateAttributeStatus} = useSelector(s => s.users)
    const dispatch = useDispatch()
    const types = ["dropDown", "colorSpans", "checkBox"]
    const [uniqueName , setUniqueName] = useState({
      value: "",
      error: false
    })
    const [name , setName] = useState({
      value: "",
      error: false
    })
    const [type , setType] = useState(types[0])
    const [createValue , setCreateValue] = useState({
      value: "",
      error: false
    })
    const [colorValue , setColorValue] = useState({
      value: "",
      error: false
    })
    const [publish , setPublish] = useState("true")
    const [arrayValues , setArrayValues] = useState([])
    // const [submitError,setSubmitError] = useState(false)

    const addValueHandle = () => {
      if(createValue.value === ""){
        setCreateValue(prev => ({...prev,error:"Please Enter Value"}))
        return
      }
      if(type === "colorSpans"){
        if(colorValue.value === ""){
          setColorValue(prev => ({...prev,error:"Please Enter Color"}))
          return
        }
        if(colorValue.value.length !== 7 || !colorValue.value.startsWith("#")){
          setColorValue(prev => ({...prev,error:"Please Enter value : #rrggbb"}))
          return
        }
      }

      if(type === "colorSpans"){
        setArrayValues(prev => [...prev,{
          name: createValue.value,
          color: colorValue.value,
          id: uuidv4()
        }])
      }else{
        setArrayValues(prev => [...prev,{
          name: createValue.value,
          id: uuidv4()
        }])
      }
      setCreateValue({value: "",error: false})
      setColorValue({value: "",error: false})
      // else{
      //   setCreateValue(prev => ({...prev,error:false}))
      // }
      // console.log(createValue,colorValue,uuidv4());
    }
    const addAttributesHandle = () => {
      if(uniqueName.value === ""){
        setUniqueName(prev => ({...prev,error:"Please Enter Unique Name"}))
        return
      }
      if(name.value === ""){
        setName(prev => ({...prev,error:"Please Enter Name"}))
        return
      }
      if(arrayValues.length === 0){
        setCreateValue(prev => ({...prev,error:"Please Enter Value"}))
        return
      }
      let form = {
        _id: oldAttribute ? oldAttribute._id : uuidv4(),
        uniqueName: uniqueName.value,
        name: name.value,
        type,
        arrayValues,
        publish
      }
      console.log(user);
      if(!oldAttribute){
        dispatch(createAttributes({token: user.token ,form})).then(
          (docs) => {
            if(docs.type === "createAttributes/fulfilled"){
              setAddNewProductSection(false)
              setOldAttribute(false)
            }
          }
        )
      }else{
        dispatch(updateAttribute(form)).then(
          (docs) => {
            if(docs.type === "updateAttribute/fulfilled"){
              setAddNewProductSection(false)
              setOldAttribute(false)
            }
          }
        )
      }
    }
    useEffect(()=>{
      if(oldAttribute !== false){
        setUniqueName({value: oldAttribute.uniqueName,error: false})
        setName({value: oldAttribute.name,error: false})
        setType(oldAttribute.type)
        setArrayValues(oldAttribute.arrayValues)
        setPublish(oldAttribute.publish)
      }
    },[oldAttribute])
  return (
    <>
    {createAttributesStatus.error && (
      <Alert type="danger">{createAttributesStatus.error}</Alert>
    )}
        {updateAttributeStatus.error && (
      <Alert type="danger">{updateAttributeStatus.error}</Alert>
    )}
    {(createAttributesStatus.isLoading || updateAttributeStatus.isLoading) && (
      <ShadowLoading/>
    )}
    <div className="AddNewAttributes">
            <div className="parent">
            <SectionStructure title="New Attribute">
            <div className="form">
                <InputBox error={uniqueName.error} onChange={(e) => setUniqueName({value:e.target.value, error:false})} value={uniqueName.value} required type="text" name="uniqueName" id="uniqueName" placeholder="Unique Name" label="Unique Name" />
                <InputBox error={name.error} onChange={(e) => setName({value:e.target.value, error:false})} value={name.value} required type="text" name="name" id="name" placeholder="Name" label="Name" />
                <SelectBox onChange={(e) => {
                  setType(e.target.value)
                  setArrayValues([])
                  setCreateValue({value: "",error: false})
                  setColorValue({value: "",error: false})
                  }} required name="type" id="type" label="Type :">
                    {types.map((opt) => (
                        <option selected={opt === type} value={opt}>
                          {opt}
                        </option>
                    ))}
                </SelectBox>
                <SelectBox onChange={(e) => setPublish(e.target.value)} required name="publish" id="publish" label="Visbility">
                    {["true","false"].map(opt => (
                        <option selected={opt === publish} value={opt}>
                        {opt === "true" ? "Publish" : "Private"}
                      </option>
                    ))}
                </SelectBox>
            </div>
            </SectionStructure>
            <SectionStructure bg="grey" title="Values">
                <div className="add-parent">
                    <InputBox error={createValue.error} onChange={(e) => setCreateValue({value:e.target.value, error:false})} value={createValue.value} required type="text" name="addValue" id="addValue" placeholder="Add value ..." />
                    
                    {type === "colorSpans" && (
                                            <div className="color-select">
                                            <InputBox error={colorValue.error} onChange={(e) => setColorValue({value:e.target.value, error:false})} value={colorValue.value} required type="text" name="color" id="color" placeholder="Add color ..." />
                                            <input onChange={(e) => setColorValue({value:e.target.value, error:false})} value={colorValue.value} required type="color" name="colorSelect" id="colorSelect"/>
                                        </div>
                    )}
                    <Btn onClick={addValueHandle} btnStyle="bg" color="primary" element="button">Add Value</Btn>
                </div>
                {arrayValues.length ? (
                                  <ul className="values">
                                  {arrayValues.map((v , idx) => (
                                    <li>{v.name}<span onClick={() => setArrayValues(prev => prev.filter(e => e.id !== v.id))} className="delete"><BiX/></span></li>
                                  ))}
                                </ul>
                ) : false}
            </SectionStructure>
            </div>
            <div className="footer-buttons">
            <Btn onClick={() => {
              setAddNewProductSection(false)
              setOldAttribute(false)
              }} btnStyle="outline" color="danger" element="button">Cancel</Btn>
            <Btn loading={createAttributesStatus.isLoading || updateAttributeStatus.isLoading} onClick={addAttributesHandle} btnStyle="bg" color="success" element="button">{oldAttribute ? "Edit Attribute" : "Add Attribute"}</Btn>
            </div>
        </div>
    </>
  )
}