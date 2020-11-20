import * as React from "react"

interface VideoPlayerProps {
  video: File
}

function VideoPlayer({ video }: VideoPlayerProps) {
  if (!video) {
    return null
  }

  return (
    <div className="mx-auto m-10">
      <video controls width="250" src={URL.createObjectURL(video)}></video>
    </div>
  )
}

export default React.memo(VideoPlayer)
