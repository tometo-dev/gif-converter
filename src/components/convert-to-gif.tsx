import { fetchFile } from "@ffmpeg/ffmpeg"
import * as React from "react"
import { useFfmpeg } from "utils/hooks"

function ConvertToGif() {
  const { isReady, ffmpeg } = useFfmpeg({ log: true })
  const [video, setVideo] = React.useState<any>()
  const [gif, setGif] = React.useState<any>()
  const [isConverting, setIsConverting] = React.useState(false)

  const convertToGif = async () => {
    setIsConverting(true)

    // write the file to memory
    ffmpeg.FS("writeFile", "test.mp4", await fetchFile(video))

    // run the ffmpeg command
    await ffmpeg.run(
      "-i",
      "test.mp4",
      "-t",
      "3.0",
      "-ss",
      "2.0",
      "-f",
      "gif",
      "out.gif"
    )

    // read the result
    const data = ffmpeg.FS("readFile", "out.gif")

    // create a URL
    const url = URL.createObjectURL(
      new Blob([data.buffer], { type: "image/gif" })
    )
    setGif(url)
    setIsConverting(false)
  }

  return isReady ? (
    <div className="flex flex-col justify-center align-middle">
      {video && (
        <div className="mx-auto m-10">
          <video controls width="250" src={URL.createObjectURL(video)}></video>
        </div>
      )}
      <input
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-4"
        type="file"
        onChange={(e) => setVideo(e.target.files?.item(0))}
      />

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-4"
        onClick={convertToGif}
      >
        Convert
      </button>
      <div className="font-mono text-4xl">Result</div>

      <div className="mx-auto">
        {isConverting && (
          <div className="font-mono text-2xl">Converting...</div>
        )}

        {gif && <img src={gif} alt="gif-result" width="250" />}
      </div>
    </div>
  ) : (
    <div className="font-mono text-2xl">Loading...</div>
  )
}

export default ConvertToGif
