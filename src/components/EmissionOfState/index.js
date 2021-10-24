import React, { useState, useRef, useEffect, memo } from "react"
import axios from "axios"

export default memo(function EmissionOfState() {
  const [states, setStates] = useState([{ id: 1, name: "select state here" }])
  const [emission, setEmission] = useState(0)

  const statesRef = useRef()
  const yearRef = useRef()

  useEffect(() => {
    //get states from remote server
    axios.get("/api/getCategoryList").then((res) => {
      if (res.data.list) {
        const statesInfo = res.data.list.map((item) => {
          return { id: item.series_id, name: item.name }
        })
        setStates(statesInfo)
      }
    })
  }, [])

  const search = () => {
    axios.get(`/api/getseriesByState?year=${yearRef.current.value}&state=${statesRef.current.value}`).then((res) => {
      if (res.data.num || res.data.num==0) {
        setEmission(res.data.num)
      }
    })
  }

  return (
    <div className="card">
      <div className="header">
        <p>Carbon dioxide emission quantity by state</p>
      </div>
      <div className="container">
        <p>
          states:{" "}
          <select ref={statesRef}>
            {states.map((state) => {
              return <option key={state.id}>{state.name}</option>
            })}
          </select>
        </p>
        <p>
          year: <input ref={yearRef} type="text" placeholder="year" />
        </p>
        <br />
        <p>
          <button onClick={search}>search the co2 emission</button>
        </p>
        <p> Carbon dioxide emission:{emission}</p>
      </div>
    </div>
  )
})
