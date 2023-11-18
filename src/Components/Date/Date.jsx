import React, { useEffect, useState } from 'react'

export default function Date(date) {
    let [year, setyear] = useState("")
    let [month, setmonth] = useState("")
    let [day, setday] = useState("")
    let [hour, sethour] = useState("")
    let [minute, setminute] = useState("")
    useEffect(() => {
        setyear(new Date(date).getFullYear()
        )
        setmonth(new Date(date).getMonth() + 1
        )
        setday(new Date(date).getDate()
        )
        sethour(new Date(date).getHours()
        )
        setminute(new Date(date).getMinutes()
        ) 
    }, [])
    
  return (
    <>
    {`${year}-${month}-${day} ${hour}:${minute}`}
  </>
  )
}
