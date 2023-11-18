import ClientSectionStructure from '../Client/ClientSectionStructure/ClientSectionStructure'
import './MasterCleanse.scss'
import { BsCloudDownload, BsHeadphones, BsPeople, BsShield } from 'react-icons/bs'

export default function MasterCleanse() {
    const masterCleanse = [
        {
            icon: <BsCloudDownload/>,
            number: "2.5k",
            title: "download"
        },
        {
            icon: <BsPeople/>,
            number: "1.3k",
            title: "users"
        },
        {
            icon: <BsHeadphones/>,
            number: "74",
            title: "files"
        },
        {
            icon: <BsShield/>,
            number: "46",
            title: "places"
        },
    ]
  return (
    <ClientSectionStructure title="Master Cleanse Reliac Heirloom" description="Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical gentrify, subway tile poke farm-to-table. Franzen you probably haven't heard of them man bun deep jianbing selfies heirloom prism food truck ugh squid celiac humblebrag.">
        <div className='MasterCleanse'>
            {masterCleanse.map(item => (
                <div className="box-master">
                    <div className="icon">{item.icon}</div>
                    <div className="number">{item.number}</div>
                    <p>{item.title}</p>
                </div>
            ))}
        </div>
    </ClientSectionStructure>
  )
}
