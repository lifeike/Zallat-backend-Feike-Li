import React, { useState, useRef, memo } from "react"
import axios from "axios"

export default memo(function Tax() {
  const [highestEmission, setHighestEmission] = useState(0)

  const startYearRef = useRef()
  const endYearRef = useRef()

  const search = () => {
    axios.get(`/api/getHighMsgByMongo?from=${startYearRef.current.value}&to=${endYearRef.current.value}`).then((res) => {
      if (res.data.city) {
        const { city } = res.data
        setHighestEmission(city)
      }
    })
  }

  return (
    <div className="card">
      <div className="header">
        <p>Hightest co2 emission in a given period</p>
      </div>
      <div className="container">
        <p>
          start year: <input ref={startYearRef} type="text" placeholder="from" />
        </p>
        <p>
          {" "}
          end year: <input ref={endYearRef} type="text" placeholder="to" />
        </p>
        <p>
          <button onClick={search}>search higest co2 emission</button>
        </p>
        <p>Highest city:{highestEmission.name}</p>
        <p>Highest emission: {highestEmission.total}</p>
      </div>
    </div>
  )
})
