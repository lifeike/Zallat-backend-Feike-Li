import React, { useState, useRef, useEffect, memo } from "react"
import axios from "axios"

export default memo(function Tax() {
  const [states, setStates] = useState([{ id: 1, name: "select state here" }])
  const [payment, setPayment] = useState(0)

  const statesRef = useRef()
  const startYearRef = useRef()
  const endYearRef = useRef()

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
    axios.get(`/api/getPaynum?from=${startYearRef.current.value}&to=${endYearRef.current.value}&state=${statesRef.current.value}`).then((res) => {
      if (res.data.num) {
        setPayment(res.data.num)
      }
    })
  }

  return (
    <div className="card">
      <div className="header">
        <p>Tax payment in a given period</p>
      </div>
      <div className="container">
        <p>
          {" "}
          states:{" "}
          <select ref={statesRef}>
            {states.map((state) => {
              return <option key={state.id}>{state.name}</option>
            })}
          </select>
        </p>
        <p>
          start year: <input ref={startYearRef} type="text" placeholder="from" />
        </p>
        <p>
          end year: <input ref={endYearRef} type="text" placeholder="to" />
        </p>
        <p>
          <button onClick={search}>search tax payment</button>
        </p>
        <p> Tax payment:{Number(payment.toFixed(1))} million</p>
      </div>
    </div>
  )
})
