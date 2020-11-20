import { fetchFile } from "@ffmpeg/ffmpeg"
import * as React from "react"
import { useFfmpeg } from "utils/hooks"
import {
  Modal,
  ModalContents,
  ModalDismissButton,
  ModalOpenButton,
} from "./modal"
import VideoPlayer from "./video-player"

function ConvertToGif() {
  const { isReady, ffmpeg } = useFfmpeg({ log: true })
  const [video, setVideo] = React.useState<any>()
  const [gif, setGif] = React.useState<any>()
  const [isConverting, setIsConverting] = React.useState(false)
  const [duration, setDuration] = React.useState(3)

  const convertToGif = async () => {
    setIsConverting(true)

    // write the file to memory (MEMFS)
    ffmpeg.FS("writeFile", "test.mp4", await fetchFile(video))

    // run the ffmpeg command
    await ffmpeg.run(
      "-i",
      "test.mp4",
      "-t",
      `${duration}`,
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
      <VideoPlayer video={video} />
      <div className="overflow-hidden m-4">
        <input
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full disabled:opacity-50"
          type="file"
          onChange={(e) => setVideo(e.target.files?.item(0))}
          disabled={isConverting}
        />
      </div>
      <Modal>
        <ModalOpenButton>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-4 disabled:opacity-50"
            disabled={!video || isConverting}
          >
            Convert
          </button>
        </ModalOpenButton>
        <ModalContents title="GIF parameters">
          <div className="shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 bg-white sm:p-6">
              <div className="grid grid-flow-col auto-cols-max gap-4 justify-evenly">
                <div>
                  <label
                    htmlFor="length"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Length
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <input
                      type="number"
                      id="length"
                      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                      placeholder="3"
                      value={duration}
                      onChange={(event) =>
                        setDuration(Number(event.target.value))
                      }
                      min="1"
                      max="10"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center">
                      <span className="text-gray-500 sm:text-sm h-ful m-auto ml-3 pr-3">
                        sec
                      </span>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    Default value is 3 seconds. Maximum 10 seconds.
                  </p>
                </div>
              </div>
              <div className="flex justify-end">
                <ModalDismissButton>
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={convertToGif}
                  >
                    Apply
                  </button>
                </ModalDismissButton>
              </div>
            </div>
          </div>
        </ModalContents>
      </Modal>
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
