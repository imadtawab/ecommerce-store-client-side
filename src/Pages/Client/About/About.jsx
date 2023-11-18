import ClientSectionStructure from '../../../Components/Client/ClientSectionStructure/ClientSectionStructure'
import './About.scss'

export default function About() {
    const data = [
        {
            subTitle: "About us",
            title: "Introduction",
            description: "Welcome to [Your Company Name], where we believe in [core values/mission]. We are passionate about providing [product or service] that [benefits or solves a problem]. With a focus on [quality, innovation, customer satisfaction, etc.], we strive to deliver exceptional products that meet your needs."
        },
        {
            subTitle: "About us",
            title: "Quality and Values",
            description: "At [Your Company Name], we are committed to delivering the highest quality [product or service]. We carefully source our materials and work with skilled artisans to ensure every product meets our rigorous standards. We believe in [values or principles] and strive to operate our business in an ethical and sustainable manner."
        },
        {
            subTitle: "About us",
            title: "Product or Service Expertise",
            description: "With years of experience in the industry, we have developed deep expertise in [product or service]. Our team of [experts, professionals, or enthusiasts] is passionate about what we do and is dedicated to staying up-to-date with the latest trends and innovations. We are always exploring new ways to improve our offerings and provide you with the best possible experience."
        },
        {
            subTitle: "About us",
            title: "Commitment to Customer Satisfaction",
            description: "Your satisfaction is our top priority. We value every customer and aim to provide exceptional service at every step. Whether you have a question, need assistance, or want to share feedback, our friendly and knowledgeable customer support team is here to help. We strive to exceed your expectations and ensure you have a seamless shopping experience."
        },
        {
            subTitle: "About us",
            title: "Closing",
            description: "Thank you for choosing [Your Company Name]. We are grateful for your support and trust in our products. If you have any questions or want to learn more about us, please don't hesitate to reach out. We look forward to serving you and providing you with an exceptional [product or service] experience."
        }        
    ]
  return (
    <div className='About'>
        {data.map(sec => (
        <ClientSectionStructure subTitle={sec.subTitle} title={sec.title} description={sec.description}/>
        ))}
    </div>
  )
}
