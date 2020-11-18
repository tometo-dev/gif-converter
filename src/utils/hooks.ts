import { createFFmpeg, CreateFFmpegOptions } from "@ffmpeg/ffmpeg"
import * as React from "react"

function useFfmpeg(options: CreateFFmpegOptions | undefined) {
  const [ready, setReady] = React.useState(false)

  const ffmpeg = React.useMemo(() => createFFmpeg(options), [options])

  const load = React.useCallback(async () => {
    await ffmpeg.load()
    setReady(true)
  }, [ffmpeg])

  React.useEffect(() => {
    load()
  }, [ffmpeg, load])

  return { isReady: ready, ffmpeg }
}

export { useFfmpeg }
