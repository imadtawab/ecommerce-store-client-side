import PageStructure from "../../Components/PageStructure/PageStructure";
import SectionStructure from "../../Components/SectionStructure/SectionStructure";
import "./AddVariants.scss";
import DropDown from "../../Components/DropDown/DropDown";
import Btn from "../../Components/Btn/Btn";
import { useEffect, useRef, useState } from "react";
import VariantsTable from "../../Components/VariantsTable/VariantsTable";
import { useDispatch, useSelector } from "react-redux";
import Alert from "../../Components/Alert/Alert";
import ShadowLoading from "../../Components/ShadowLoading/ShadowLoading";
import { addVariants } from "../../store/productsSlice";
import { useNavigate } from "react-router";
import { getAttributes } from "../../store/usersSlice";
import { current } from "@reduxjs/toolkit";

export default function AddVariants({
  showAddVariants,
  productForVariants,
  btnIsAddVariants,
}) {
  const { newProductStatus, updateProductStatus, addVariantsStatus } =
      useSelector((s) => s.products),
    { getAttributesStatus } = useSelector((s) => s.users),
    [showVariantsTable, setShowVariantsTable] = useState([]),
    dispatch = useDispatch(),
    navigate = useNavigate(),
    colors = useRef(),
    sizes = useRef(),
    shoesSizes = useRef(),
    [mainData, setMainData] = useState({variants: [], attributes: []}),
    [arrayForChecked, setArrayForChecked] = useState([]);

  const generateVariantsFunc = () => {
    // showVariantsTable
    // let arrayAttributesCheckedId = document.querySelectorAll(".box-select").map(attSec => attSec.querySelectorAll(".DropDown .menu-dropdown .CheckBox input:checked").map(inp => inp.id)
    let arrayAttributesCheckedId = [];
    let boxSelects = document.querySelectorAll(".box-select") || [];
    boxSelects.forEach(async (attSec) => {
      let inpCheckeds =
      attSec.querySelectorAll(
        ".DropDown .menu-dropdown .CheckBox input:checked"
        ) || [];

        // let myVariantsArrId = {};
        // inpCheckeds.forEach((inpCheck) => {
        //     myVariantsArrId[inpCheck.parentElement.parentElement.parentElement.parentElement.dataset.id] = inpCheck.id
        // })
        // console.log(myVariantsArrId);
      let inputCheckedId = [];
      inpCheckeds.forEach((inpCheck) => {
        // inputCheckedId.push(inpCheck.labels[1].innerText,)
        inputCheckedId.push({
          name: inpCheck.labels[1].innerText,
          id: inpCheck.id,
          attId: inpCheck.parentElement.parentElement.parentElement.parentElement.dataset.id
        });
      });
      if (inputCheckedId.length) {
        arrayAttributesCheckedId.push(inputCheckedId);
      }
    });

    // ###########################################
            // 
            let attributesChecked = []
            boxSelects.forEach(sec => {
              if (sec.querySelectorAll(
                ".DropDown .menu-dropdown .CheckBox input:checked"
                ).length > 0) {
                  // console.log();
                  let attributeValuesId = [] 
                  sec.querySelectorAll(
                    ".DropDown .menu-dropdown .CheckBox input:checked"
                    ).forEach((inpCheck) => {
                      // inputCheckedId.push(inpCheck.labels[1].innerText,)
                      attributeValuesId.push(inpCheck.id);
                    });
                  attributesChecked.push({attributeId: sec.dataset.id, attributeValuesId})
              }
            })
            // 
    // ###########################################
    console.log(arrayAttributesCheckedId, 100);

    function nestedLoops(data, callback, current = []) {
      if (current.length === data.length) {
        callback(current.slice()); // Clone the current array before passing
        return;
      }
    
      const currentLevelData = data[current.length];
    
      for (let i = 0; i < currentLevelData.length; i++) {
        console.log(currentLevelData[i],9999999999);
        current.push(currentLevelData[i])
        nestedLoops(data, callback, current);
        current.pop();
      }
    }
    
    // const nestedData = [[1, 2, 3], [4, 5], [6, 7, 8, 9]];
    const output = [];
    
    nestedLoops(arrayAttributesCheckedId, (result) => {
      output.push(result);
    });
    function attObjectHandle(array, current = []) {
      array.forEach(attArr => {
        let variantObj = {}
        attArr.forEach(a => {
          variantObj[a.attId] = a.id
        })
        current.push({
          image: productForVariants.media.images[0],
          variantId: `${Date.now()}_${attArr.map(a => a.name).join(" - ")}_${productForVariants._id}`,
          variantName: `${attArr.map(a => a.name).join(" - ")}`,
          variantArr: variantObj,
          sku: productForVariants.sku,
          quantite: productForVariants.quantite,
          originalPrice: productForVariants.prices.originalPrice,
          salePrice: productForVariants.prices.salePrice,
        })
      })
      return current
    }
    // {
      //   image: productForVariants.media.images[0],
    //   variantId: `${Date.now()}_${color}${shoeSize}_${
    //     productForVariants._id
    //   }`,
    //   variantName: `${colorsArr[color]} - ${shoesSizesArr[shoeSize]}`,
    //   variantType: [colorsArr[color], shoesSizesArr[shoeSize]],
    //   sku: productForVariants.sku,
    //   quantite: productForVariants.quantite,
    //   originalPrice: productForVariants.prices.originalPrice,
    //   salePrice: productForVariants.prices.salePrice,
    // }
    console.log(attObjectHandle(output),969,mainData);
    setShowVariantsTable(true);


    let variantNames = mainData.variants.map((v) => v.variantName);
    let result = attObjectHandle(output).map((v) =>
      variantNames.indexOf(v.variantName) !== -1
        ? mainData.variants.find((ov) => ov.variantName === v.variantName)
        : v
    );
    setMainData({variants: result, attributes: attributesChecked});
    console.log(result);
    // let variantArrayAtt = mainData.map((v) => v.variantArr);
    // let result = attObjectHandle(output).map((att) => {
    //   // [{},{},{},{}]
    //   let length = att.variantArr.length
    //   let i = 0
    //   return att.variantArr.map(v => {
    //     // 56695222100247855558
    //     // v.id
    //     return mainData.map(oldAtt => {
    //         console.log(v.id,"###",oldAtt,9699);
    //         if(oldAtt.variantArr.length !== att.variantArr.length) return att

    //         let result = oldAtt.variantArr.find(oldV => oldV.id === v.id)

    //         if(result) i++

    //         if(length === i) return {...oldAtt, variantId:"1236"}

    //         return att
    //       })
    //     })
    //   variantNames.indexOf(v.variantName) !== -1
    //     ? mainData.find((ov) => ov.variantName === v.variantName)
    //     : v
    // }
    // );

    // setMainData(attObjectHandle(output));
    console.log(result);

    // console.log(output,101);
    // arrayAttributesCheckedId.forEach(arrAtt => {
    //   console.log(arrAtt);
    // })
    // if (arrayAttributesCheckedId.length > 0) {
    //   // arrayAttributesCheckedId.forEach(AttArr => {
    //     arrayAttributesCheckedId[0].forEach(att => {
    //       let aaaa = [att.name]
    //       for (let a = 1; a < arrayAttributesCheckedId.length; a++) {
    //         arrayAttributesCheckedId[a].forEach((b, i) => {
    //           aaaa.push({...b, fakeId: a})
    //         })
    //       }
    //       console.log(aaaa);
    //     })

    //   // })

    // }
    // let arr = ["a","a","a"]
    // let a = 0
    // arr.forEach(at => {
    //   console.log(a);
    //   a = a + 1
    //   let b = 0
    //   arr.forEach(att => {
    //     console.log(b);
    //     b = b + 1
    //   })
    // })
    // for (let arrAtt = 0; arrAtt < arrayAttributesCheckedId.length; arrAtt++) {
    //   arrayAttributesCheckedId[arrAtt].forEach(att => {
    //     // console.log(att.name);
    //     let ar = [att.name]
    //     arrayAttributesCheckedId.forEach((currentArrAtt, index) => {
    //       if(arrayAttributesCheckedId.length > 1){
    //         if (arrAtt !== index) {
    //           currentArrAtt.forEach(currentAtt => {
    //             ar.push(currentAtt.name)
    //             // console.log(att.name + "----" + currentAtt.name);
    //           })
    //         }
    //       }else{
    //         console.log(att.name);
    //       }
    //     })
    //     console.log(ar);
    //   })
    //   console.log("##############");
    //   return
    // }
    // if (false) {
    //   function generateArrays(arr) {
    //     let resultArr = [];
    //     arr.current
    //       .querySelectorAll(".DropDown .menu-dropdown input:checked")
    //       .forEach((el) => {
    //         resultArr.push(el.value);
    //       });
    //     return resultArr;
    //   }
    //   let colorsArr = [];
    //   let sizesArr = [];
    //   let shoesSizesArr = [];
    //   if (!generateArrays(colors).length) {
    //     if (generateArrays(sizes).length) {
    //       colorsArr = generateArrays(sizes);
    //       sizesArr = generateArrays(colors);
    //       shoesSizesArr = generateArrays(shoesSizes);
    //     } else if (generateArrays(shoesSizes).length) {
    //       colorsArr = generateArrays(shoesSizes);
    //       sizesArr = generateArrays(sizes);
    //       shoesSizesArr = generateArrays(colors);
    //     }
    //   } else {
    //     colorsArr = generateArrays(colors);
    //     sizesArr = generateArrays(sizes);
    //     shoesSizesArr = generateArrays(shoesSizes);
    //   }
    //   let resultArray = [];

    //   for (let color = 0; color < colorsArr.length; color++) {
    //     if (sizesArr.length && shoesSizesArr.length) {
    //       for (let size = 0; size < sizesArr.length; size++) {
    //         for (
    //           let shoeSize = 0;
    //           shoeSize < shoesSizesArr.length;
    //           shoeSize++
    //         ) {
    //           resultArray.push({
    //             image: productForVariants.media.images[0],
    //             variantId: `${Date.now()}_${color}${size}${shoeSize}_${
    //               productForVariants._id
    //             }`,
    //             variantName: `${colorsArr[color]} - ${sizesArr[size]} - ${shoesSizesArr[shoeSize]}`,
    //             variantType: [
    //               colorsArr[color],
    //               sizesArr[size],
    //               shoesSizesArr[shoeSize],
    //             ],
    //             sku: productForVariants.sku,
    //             quantite: productForVariants.quantite,
    //             originalPrice: productForVariants.prices.originalPrice,
    //             salePrice: productForVariants.prices.salePrice,
    //           });
    //         }
    //       }
    //     } else if (!sizesArr.length && !shoesSizesArr.length) {
    //       resultArray.push({
    //         image: productForVariants.media.images[0],
    //         variantId: `${Date.now()}_${color}_${productForVariants._id}`,
    //         variantName: `${colorsArr[color]}`,
    //         variantType: [colorsArr[color]],
    //         sku: productForVariants.sku,
    //         quantite: productForVariants.quantite,
    //         originalPrice: productForVariants.prices.originalPrice,
    //         salePrice: productForVariants.prices.salePrice,
    //       });
    //     } else if (sizesArr.length) {
    //       for (let size = 0; size < sizesArr.length; size++) {
    //         resultArray.push({
    //           image: productForVariants.media.images[0],
    //           variantId: `${Date.now()}_${color}${size}_${
    //             productForVariants._id
    //           }`,
    //           variantName: `${colorsArr[color]} - ${sizesArr[size]}`,
    //           variantType: [colorsArr[color], sizesArr[size]],
    //           sku: productForVariants.sku,
    //           quantite: productForVariants.quantite,
    //           originalPrice: productForVariants.prices.originalPrice,
    //           salePrice: productForVariants.prices.salePrice,
    //         });
    //       }
    //     } else if (shoesSizesArr.length) {
    //       for (let shoeSize = 0; shoeSize < shoesSizesArr.length; shoeSize++) {
    //         resultArray.push({
    //           image: productForVariants.media.images[0],
    //           variantId: `${Date.now()}_${color}${shoeSize}_${
    //             productForVariants._id
    //           }`,
    //           variantName: `${colorsArr[color]} - ${shoesSizesArr[shoeSize]}`,
    //           variantType: [colorsArr[color], shoesSizesArr[shoeSize]],
    //           sku: productForVariants.sku,
    //           quantite: productForVariants.quantite,
    //           originalPrice: productForVariants.prices.originalPrice,
    //           salePrice: productForVariants.prices.salePrice,
    //         });
    //       }
    //     }
    //   }

    //   setShowVariantsTable(true);
    //   let variantNames = mainData.map((v) => v.variantName);
    //   let result = resultArray.map((v) =>
    //     variantNames.indexOf(v.variantName) !== -1
    //       ? mainData.find((ov) => ov.variantName === v.variantName)
    //       : v
    //   );
    //   setMainData(result);
    //   console.log(result);
    // }
  };

  const saveVariantsHandle = () => {
    const id = productForVariants._id;
    const variants = mainData.variants;
    const attributes = mainData.attributes;
    dispatch(addVariants({ id, variants, attributes})).then((docs) => {
      navigate("/admin/products");
    });
  };
  useEffect(() => {
    dispatch(getAttributes());
    if (btnIsAddVariants) {
      setMainData({variants: (productForVariants.variants || []), attributes: (productForVariants.attributes || [])});
      let type = [];
      mainData.variants.forEach((v) => {
        v.variantType.forEach((v) => {
          if (type.indexOf(v) === -1) {
            type.push(v);
          }
        });
      });
      setArrayForChecked(type);
    }
  }, [btnIsAddVariants, productForVariants.variants]);

  return (
    <>
      {newProductStatus.success && (
        <Alert type="success">{newProductStatus.success.mss}</Alert>
      )}
      {updateProductStatus.success && (
        <Alert type="success">{updateProductStatus.success.mss}</Alert>
      )}
      {newProductStatus.error && (
        <Alert type="danger">{newProductStatus.error}</Alert>
      )}
      {updateProductStatus.error && (
        <Alert type="danger">{updateProductStatus.error}</Alert>
      )}
      {(newProductStatus.isLoading || updateProductStatus.isLoading) && (
        <ShadowLoading />
      )}
      <PageStructure title={"Add Variants"}>
        <div className="AddVariants">
          <div className="variants">
            {(getAttributesStatus.success || []).map((att) =>
              att.publish === "true" ? (
                <SectionStructure title={`${att.uniqueName} : (${att.name})`}>
                  {/* ref={colors} className="colors box-select" */}
                  <div data-id={att._id} className="box-select">
                    <DropDown
                      position="relative"
                      name="Select ..."
                      checkboxName={att.uniqueName}
                      array={att.arrayValues.map((a) => a)}
                      // arrayForChecked={arrayForChecked}
                    ></DropDown>
                  </div>
                </SectionStructure>
              ) : (
                false
              )
            )}
          </div>
          <div className="controlls">
            <Btn
              onClick={generateVariantsFunc}
              btnStyle="bg"
              color="success"
              element="button"
            >
              Generate variants
            </Btn>
          </div>
          {showVariantsTable && (
            <VariantsTable
              data={showVariantsTable}
              mainData={mainData}
              setMainData={setMainData}
              productForVariants={productForVariants}
            />
          )}
        </div>
        <div className="footer-buttons">
          <div className="box">
            <Btn
              btnStyle="outline"
              color="danger"
              element="a"
              to={"/admin/products"}
            >
              Cancel
            </Btn>
          </div>
          <div className="box">
            {!showVariantsTable && (
              <Btn btnStyle="bg" color="primary" element="button" type="submit">
                Add Variants
              </Btn>
            )}
            <Btn
              loading={addVariantsStatus.isLoading}
              onClick={saveVariantsHandle}
              btnStyle="bg"
              color="success"
              element="button"
              type="submit"
            >
              Save Variants
            </Btn>
          </div>
        </div>
      </PageStructure>
    </>
  );
}

// import PageStructure from "../../Components/PageStructure/PageStructure";
// import SectionStructure from "../../Components/SectionStructure/SectionStructure";
// import "./AddVariants.scss";
// import DropDown from "../../Components/DropDown/DropDown";
// import Btn from "../../Components/Btn/Btn";
// import { useEffect, useRef, useState } from "react";
// import VariantsTable from "../../Components/VariantsTable/VariantsTable";
// import { useDispatch, useSelector } from "react-redux";
// import Alert from "../../Components/Alert/Alert";
// import ShadowLoading from "../../Components/ShadowLoading/ShadowLoading";
// import { addVariants } from "../../store/productsSlice";
// import { useNavigate } from "react-router";
// import CheckBox from "../../Components/CheckBox/CheckBox";
// import { getAttributes } from "../../store/usersSlice";

// export default function AddVariants({
//   showAddVariants,
//   productForVariants,
//   btnIsAddVariants,
// }) {
//   const { newProductStatus, updateProductStatus, addVariantsStatus } =
//     useSelector((s) => s.products);
//     const { getAttributesStatus } = useSelector((s) => s.users);
//   const [showVariantsTable, setShowVariantsTable] = useState([]);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const colors = useRef();
//   const sizes = useRef();
//   const shoesSizes = useRef();
//   const [mainData, setMainData] = useState([]);
//   const [arrayForChecked, setArrayForChecked] = useState([])

//   const generateVariantsFunc = () => {
//     // showVariantsTable
//     if (!false) {
//       // console.log(productForVariants,99);
//       function generateArrays(arr) {
//         let resultArr = [];
//         arr.current
//           .querySelectorAll(".DropDown .menu-dropdown input:checked")
//           .forEach((el) => {
//             resultArr.push(el.value);
//           });
//         return resultArr;
//       }
//       let colorsArr = [];
//       let sizesArr = [];
//       let shoesSizesArr = [];
//       if (!generateArrays(colors).length) {
//         if (generateArrays(sizes).length) {
//           colorsArr = generateArrays(sizes);
//           sizesArr = generateArrays(colors);
//           shoesSizesArr = generateArrays(shoesSizes);
//         } else if (generateArrays(shoesSizes).length) {
//           colorsArr = generateArrays(shoesSizes);
//           sizesArr = generateArrays(sizes);
//           shoesSizesArr = generateArrays(colors);
//         }
//       } else {
//         colorsArr = generateArrays(colors);
//         sizesArr = generateArrays(sizes);
//         shoesSizesArr = generateArrays(shoesSizes);
//       }

//       // let colorsArr = generateArrays(colors);
//       // let sizesArr = generateArrays(sizes);
//       // let shoesSizesArr = generateArrays(shoesSizes);

//       let resultArray = [];

//       for (let color = 0; color < colorsArr.length; color++) {
//         if (sizesArr.length && shoesSizesArr.length) {
//           for (let size = 0; size < sizesArr.length; size++) {
//             for (
//               let shoeSize = 0;
//               shoeSize < shoesSizesArr.length;
//               shoeSize++
//             ) {
//               resultArray.push({
//                 image: productForVariants.media.images[0],
//                 variantId: `${Date.now()}_${color}${size}${shoeSize}_${
//                   productForVariants._id
//                 }`,
//                 variantName: `${colorsArr[color]} - ${sizesArr[size]} - ${shoesSizesArr[shoeSize]}`,
//                 variantType: [
//                   colorsArr[color],
//                   sizesArr[size],
//                   shoesSizesArr[shoeSize],
//                 ],
//                 sku: productForVariants.sku,
//                 quantite: productForVariants.quantite,
//                 originalPrice: productForVariants.prices.originalPrice,
//                 salePrice: productForVariants.prices.salePrice,
//               });
//             }
//           }
//         } else if (!sizesArr.length && !shoesSizesArr.length) {
//           resultArray.push({
//             image: productForVariants.media.images[0],
//             variantId: `${Date.now()}_${color}_${productForVariants._id}`,
//             variantName: `${colorsArr[color]}`,
//             variantType: [colorsArr[color]],
//             sku: productForVariants.sku,
//             quantite: productForVariants.quantite,
//             originalPrice: productForVariants.prices.originalPrice,
//             salePrice: productForVariants.prices.salePrice,
//           });
//         } else if (sizesArr.length) {
//           for (let size = 0; size < sizesArr.length; size++) {
//             resultArray.push({
//               image: productForVariants.media.images[0],
//               variantId: `${Date.now()}_${color}${size}_${
//                 productForVariants._id
//               }`,
//               variantName: `${colorsArr[color]} - ${sizesArr[size]}`,
//               variantType: [colorsArr[color], sizesArr[size]],
//               sku: productForVariants.sku,
//               quantite: productForVariants.quantite,
//               originalPrice: productForVariants.prices.originalPrice,
//               salePrice: productForVariants.prices.salePrice,
//             });
//           }
//         } else if (shoesSizesArr.length) {
//           for (let shoeSize = 0; shoeSize < shoesSizesArr.length; shoeSize++) {
//             resultArray.push({
//               image: productForVariants.media.images[0],
//               variantId: `${Date.now()}_${color}${shoeSize}_${
//                 productForVariants._id
//               }`,
//               variantName: `${colorsArr[color]} - ${shoesSizesArr[shoeSize]}`,
//               variantType: [colorsArr[color], shoesSizesArr[shoeSize]],
//               sku: productForVariants.sku,
//               quantite: productForVariants.quantite,
//               originalPrice: productForVariants.prices.originalPrice,
//               salePrice: productForVariants.prices.salePrice,
//             });
//           }
//         }
//       }

//       setShowVariantsTable(true);
//       // setMainData(resultArray)

//       let variantNames = mainData.map((v) => v.variantName);
//       let result = resultArray.map((v) => variantNames.indexOf(v.variantName) !== -1 ? mainData.find((ov) => ov.variantName === v.variantName) : v
//       // {
//         // if (variantNames.indexOf(v.variantName) !== -1) {
//         //   return mainData.find((ov) => ov.variantName === v.variantName);
//         // }
//         // return v;
//       // }
//       );
//       setMainData(result);
//       console.log(result);

//       // setShowVariantsTable(resultArray);
//       // const checkOldVariants = (result,prodVariants) => {
//       //   // [{},{},{}] = result
//       //   // [{},{},{}] = prodVariants

//       //   let finalyResult = []

//       //   // v = {} = result.forEach
//       //   // prodVaraints.forEach => o = {} => o.type[].

//       //   // return result.map(v => {
//       //   //   // [{},{},{}]
//       //   //   return prodVariants.map(oldV => {
//       //   //     // ["red","xl"]
//       //   //     console.log("old", oldV.variantType,"new", v.variantType )
//       //   //   })
//       //   // })
//       //   // result.forEach(v => {
//       //   //   prodVariants.forEach(o => {
//       //   //     // console.log("new : " , v.variantType , "\n" , "old : " , o.variantType);
//       //   //     function arraysHaveEqualItems(arr1, arr2) {
//       //   //       if (arr1.length !== arr2.length) {
//       //   //         return false;
//       //   //       }

//       //   //       const sortedArr1 = arr1.slice().sort();
//       //   //       const sortedArr2 = arr2.slice().sort();

//       //   //       for (let i = 0; i < sortedArr1.length; i++) {
//       //   //         if (sortedArr1[i] !== sortedArr2[i]) {
//       //   //           return false;
//       //   //         }
//       //   //       }

//       //   //       return true;
//       //   //     }

//       //   //     if(arraysHaveEqualItems(o.variantType, v.variantType)){
//       //   //       finalyResult.push(o)
//       //   //     }
//       //   //   })
//       //   // })
//       //   // console.log(finalyResult,"aaa");
//       // }
//       // let result = []
//       // let type = []
//       // resultArray.forEach(newV => {
//       //   // console.log(newV.variantType,90);
//       //   mainData.forEach(oldV =>{
//       //     let firstResult = newV.variantType.every(v => oldV.variantType.includes(v))
//       //     let secondResult = oldV.variantType.every(v => newV.variantType.includes(v))
//       //     console.log(newV.variantType , oldV.variantType);
//       //     console.log(firstResult,secondResult,91);
//       //     console.log("#################");
//       //     if(firstResult && secondResult){
//       //       result.push(JSON.stringify(oldV))
//       //       type.push(JSON.stringify(oldV.variantName))
//       //     }else{
//       //         result.push(JSON.stringify(newV))
//       //       }
//       //   })
//       // })
//       // console.log("*****************************1");
//       // console.log(result.map(e => JSON.parse(e)) );
//       // let aaa = []
//       // let result2 = result.filter(obj => {
//       //   if (aaa.indexOf(obj) === -1) {
//       //     aaa.push(obj)
//       //     return obj
//       //   }else{
//       //     return null
//       //   }
//       // })

//       // // console.log(result2.map(e => JSON.parse(e)));
//       // // result2.forEach(obj => {
//       // //   type.forEach(type =>{
//       // //     if (JSON.parse(obj).variantName === type) {
//       // //       if (!isNaN(JSON.parse(obj).originalPrice)) {
//       // //         aaa.splice(aaa.indexOf(obj),1)
//       // //       }
//       // //     }
//       // //   })
//       // // })
//       // result2.map(e => JSON.parse(e)).forEach((a,ind )=> {
//       //   if(type.some(b => b === a.variantName)){
//       //     console.log(a);
//       //     aaa.splice(ind + 1 ,1)
//       //   }
//       // })
//       // console.log("*****************************1",aaa);

//       // console.log(mainData,'eeee');

//       // setMainData(checkOldVariants(resultArray,productForVariants.variants))
//     }
//   };
//   // const getColors = async() => {
//   //   await
//   // }
// //   {/*
// //         // [
// //         //   {
// //         //     name: color,
// //         //     values: [red , blue , black],
// //         //     type: spansColor
// //         //   },{
// //         //     name: T-shirt size,
// //         //     values: [xl , xxl , xxxl],
// //         //     type: spansCheck
// //         //   }
// //         // ]
// // */}

//   const saveVariantsHandle = () => {
//     const id = productForVariants._id;
//     const variants = mainData;
//     dispatch(addVariants({ id, variants })).then((docs) => {
//       // if(docs.payload.type === "addVariants/fulfilled"){
//       navigate("/admin/products");
//       // }
//     });
//   };
//   useEffect(() => {
//     dispatch(getAttributes())
//     if (btnIsAddVariants) {
//       setMainData(productForVariants.variants || []);
//       // console.log(mainData.map(v => [...v.variantType.map(v => v)]))
//       let type = []
//       mainData.forEach(v => {
//         v.variantType.forEach(v => {
//           if (type.indexOf(v) === -1) {
//             type.push(v)
//           }
//         })
//       })
//       setArrayForChecked(type)
//     }
//   }, [btnIsAddVariants, productForVariants.variants]);

//   return (
//     <>
//       {newProductStatus.success && (
//         <Alert type="success">{newProductStatus.success.mss}</Alert>
//       )}
//       {updateProductStatus.success && (
//         <Alert type="success">{updateProductStatus.success.mss}</Alert>
//       )}
//       {newProductStatus.error && (
//         <Alert type="danger">{newProductStatus.error}</Alert>
//       )}
//       {updateProductStatus.error && (
//         <Alert type="danger">{updateProductStatus.error}</Alert>
//       )}
//       {(newProductStatus.isLoading || updateProductStatus.isLoading) && (
//         <ShadowLoading />
//       )}
//       <PageStructure title={"Add Variants"}>
//         <div className="AddVariants">
//           <div className="variants">

//             {(getAttributesStatus.success || []).map(att => (
//                 att.publish === "true" ? (
//                   <SectionStructure title={`${att.uniqueName} : (${att.name})`}>
//                   <div ref={colors} className="colors box-select">
//                     <DropDown
//                       position="relative"
//                       name="Select ..."
//                       checkboxName={att.uniqueName}
//                       array={att.arrayValues.map(a => a.name)}
//                       // arrayForChecked={arrayForChecked}
//                     >
//                     </DropDown>
//                   </div>
//                 </SectionStructure>
//                 ) : false
//             ))}

//             {/* <SectionStructure title={"Colors"}>
//               <div ref={colors} className="colors box-select">
//                 <DropDown
//                   position="relative"
//                   name="Select ..."
//                   checkboxName={"colors"}
//                   array={[
//                     "red","blue","white","green","black",]}
//                   // arrayForChecked={arrayForChecked}
//                 >
//                 </DropDown>
//               </div>
//             </SectionStructure>
//             <SectionStructure title={"Sizes"}>
//               <div ref={sizes} className="size box-select">
//                 <DropDown
//                   position="relative"
//                   name="Select ..."
//                   checkboxName={"sizes"}
//                   array={["m", "l", "xl", "xxl", "xxxl"]}
//                 >
//                   {["red/black", "red", "blue", "white", "green", "black"].map(
//                     (cl, index) => (
//                       <>
//                         <CheckBox key={index} id={cl} label={cl} />
//                       </>
//                     )
//                   )}
//                 </DropDown>
//               </div>
//             </SectionStructure>
//             <SectionStructure title={"Shoes Sizes"}>
//               <div ref={shoesSizes} className="shoes-sizes box-select">
//                 <DropDown
//                   position="relative"
//                   name="Select ..."
//                   checkboxName={"shoes_sizes"}
//                   array={["36", "37", "38", "39", "40", "41", "42", "43", "44"]}
//                 >
//                   {["red/black", "red", "blue", "white", "green", "black"].map(
//                     (cl, index) => (
//                       <>
//                         <CheckBox key={index} id={cl} label={cl} />
//                       </>
//                     )
//                   )}
//                 </DropDown>
//               </div>
//             </SectionStructure> */}
//           </div>
//           <div className="controlls">
//             <Btn
//               onClick={generateVariantsFunc}
//               btnStyle="bg"
//               color="success"
//               element="button"
//             >
//               Generate variants
//             </Btn>
//           </div>
//           {showVariantsTable && (
//             <VariantsTable
//               data={showVariantsTable}
//               mainData={mainData}
//               setMainData={setMainData}
//               productForVariants={productForVariants}
//             />
//           )}
//         </div>
//         <div className="footer-buttons">
//           <div className="box">
//           <Btn
//                   btnStyle="outline"
//                   color="danger"
//                   element="a"
//                   to={"/admin/products"}
//                 >
//                   Cancel
//                 </Btn>

//             {/* <Btn
//               onClick={showAddVariants}
//               btnStyle="outline"
//               color="danger"
//               element="button"
//               type="submit"
//             >
//               Cancel
//             </Btn> */}
//           </div>
//           <div className="box">
//             {!showVariantsTable && (
//               <Btn btnStyle="bg" color="primary" element="button" type="submit">
//                 Add Variants
//               </Btn>
//             )}
//             <Btn
//               loading={addVariantsStatus.isLoading}
//               onClick={saveVariantsHandle}
//               btnStyle="bg"
//               color="success"
//               element="button"
//               type="submit"
//             >
//               Save Variants
//             </Btn>
//           </div>
//         </div>
//       </PageStructure>
//     </>
//   );
// }
