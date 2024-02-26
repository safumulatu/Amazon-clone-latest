import React from 'react'
import {MoonLoader} from 'react-spinners'
function Loader() {
  return (
    <div
    style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "50vh",
      }}
    
    >

<MoonLoader color="#1fce27" />

    </div>
  )
}

export default Loader