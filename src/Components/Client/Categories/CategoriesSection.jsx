import './CategoriesSection.scss'
import ClientSectionStructure from '../ClientSectionStructure/ClientSectionStructure'
import {NavLink} from "react-router-dom"
import {FaArrowRight} from 'react-icons/fa'
export default function CategoriesSection() {
  const categories = [
    {
      name: "electronics",
      description: "Blue bottle crucifix vinyl post-ironic four dollar toast vegan taxidermy. Gastropub indxgo juice poutine.",
    },
    {
      name: "electronics",
      description: "Blue bottle crucifix vinyl post-ironic four dollar toast vegan taxidermy. Gastropub indxgo juice poutine.",
    },
    {
      name: "electronics",
      description: "Blue bottle crucifix vinyl post-ironic four dollar toast vegan taxidermy. Gastropub indxgo juice poutine.",
    },
    {
      name: "electronics",
      description: "Blue bottle crucifix vinyl post-ironic four dollar toast vegan taxidermy. Gastropub indxgo juice poutine.",
    },
  ]
  return (
    <>
        <ClientSectionStructure subTitle="Categories" title="Our Popular Categories">
            <div className="CategoriesSection">
              {categories.map(catg => (
                <div className="box-category">
              <NavLink className="parent" to={`/categories/${catg.name}`}>
                    <div className="head">
                      <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>
                      <h2>{catg.name}</h2>
                    </div>
                    {/* <div className="content">
                      <p> {catg.description} </p>
                      <NavLink to={`/categories/${catg.name}`}>Learn More <FaArrowRight/> </NavLink>
                    </div> */}
              </NavLink>
                </div>
              ))}
            </div>
        </ClientSectionStructure>
    </>
  )
}
