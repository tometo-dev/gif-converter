import React from "react"
import ConvertToGif from "components/convert-to-gif"

function App() {
  return (
    <div className="flex justify-center w-screen h-screen">
      <div className="text-center my-auto">
        <div className="font-mono text-4xl">Video to GIF converter</div>
        <ConvertToGif />
      </div>
    </div>
  )
}

export default App
