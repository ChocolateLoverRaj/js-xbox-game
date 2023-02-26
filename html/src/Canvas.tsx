import { FC, useContext, useEffect, useRef, useState } from 'react'
import never from 'never'
import { PoseDetector, SupportedModels, util } from '@tensorflow-models/pose-detection'
import repeatedAnimationFrame from './repeatedAnimationFrame'
import IpAddressContext from './IpAddressContext'
import colorBetween from 'color-between'

export interface CanvasProps {
  detector: PoseDetector
}

const Canvas: FC<CanvasProps> = ({ detector }) => {
  const [ipAddress] = useContext(IpAddressContext)

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const [loaded, setLoaded] = useState(false)
  const [fps, setFps] = useState<number>()

  useEffect(() => {
    if (!loaded) return

    const video = imageRef.current ?? never()
    const canvas = canvasRef.current ?? never()

    const ctx = canvas.getContext('2d') ?? never()
    let lastRender: number

    return repeatedAnimationFrame(async () => {
      // Draw the image
      ctx.drawImage(video, 0, 0)

      // Calculate poses
      const poses = await detector.estimatePoses(video)

      poses.forEach(pose => {
        pose.keypoints.forEach(({ score, x, y }) => {
          ctx.fillStyle = colorBetween('#ff0000', '#00ff00', score ?? 1, 'hex')
          ctx.beginPath()
          ctx.arc(x, y, 5, 0, 2 * Math.PI, false)
          ctx.fill()
        })

        util.getAdjacentPairs(SupportedModels.MoveNet).forEach(([a, b]) => {
          const pointA = pose.keypoints[a]
          const pointB = pose.keypoints[b]

          ctx.lineWidth = 2
          ctx.strokeStyle = colorBetween('#ff0000', '#00ff00', ((pointA.score ?? 1) + (pointB.score ?? 1)) / 2, 'hex')
          ctx.beginPath()
          ctx.moveTo(pointA.x, pointA.y)
          ctx.lineTo(pointB.x, pointB.y)
          ctx.stroke()
        })
      })

      const now = Date.now()
      if (lastRender !== undefined) {
        setFps(1000 / (now - lastRender))
      }
      lastRender = now
    })
  }, [detector, loaded])

  return (
    <>
      <img
        ref={imageRef}
        src={`http://${ipAddress}/video`}
        hidden
        onLoad={({ target }) => {
          const img = target as HTMLImageElement
          const canvas = canvasRef.current ?? never()
          canvas.width = img.width
          canvas.height = img.height
          setLoaded(true)
        }}
        crossOrigin='anonymous'
      />
      FPS: {fps ?? 'loading'}<br />
      <canvas
        ref={canvasRef}
      />
    </>
  )
}

export default Canvas
