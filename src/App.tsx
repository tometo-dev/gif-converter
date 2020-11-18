import React from "react"
import ConvertToGif from "components/convert-to-gif"

function App() {
  return (
    <>
      <div className="flex justify-center h-screen">
        <div className="text-center my-auto">
          <div className="font-mono text-4xl">Video to GIF converter</div>
          <ConvertToGif />
        </div>
      </div>
      <footer className="h-10 sticky bottom-0 flex justify-center bg-gray-400">
        <div className="my-auto mr-8">
          {`Developed by: `}
          <a
            href="https://sudhanshu-ranjan.tech"
            target="_blank"
            rel="noopener noreferrer"
          >
            Sudhanshu
          </a>
        </div>
        <div className="my-auto">
          <a
            href="https://github.com/tsuki42/gif-converter"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github Link
          </a>
        </div>
      </footer>
    </>
  )
}

export default App
