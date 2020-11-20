import { createFFmpeg, CreateFFmpegOptions, FFmpeg } from "@ffmpeg/ffmpeg"
import * as React from "react"

function useFfmpeg(options: CreateFFmpegOptions | undefined) {
  const [ready, setReady] = React.useState(false)
  const ffmpegRef = React.useRef<FFmpeg>()

  const ffmpeg = React.useMemo(() => createFFmpeg(options), [options])

  const load = React.useCallback(async () => {
    await ffmpeg.load()
    ffmpegRef.current = ffmpeg
    setReady(true)
  }, [ffmpeg])

  React.useEffect(() => {
    if (!ffmpegRef.current) {
      load()
    }
  }, [ffmpeg, load])

  return { isReady: ready, ffmpeg: ffmpegRef.current }
}

export { useFfmpeg }
