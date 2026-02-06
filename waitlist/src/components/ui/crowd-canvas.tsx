import { gsap } from 'gsap'
import { useEffect, useRef } from 'react'

interface CrowdCanvasProps {
  src: string
  rows?: number
  cols?: number
}

const CrowdCanvas = ({
  src: imageSrc,
  rows: rowCount = 15,
  cols: colCount = 7,
}: CrowdCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const config = {
      src: imageSrc,
      rows: rowCount,
      cols: colCount,
    }

    const randomRange = (min: number, max: number) =>
      min + Math.random() * (max - min)
    const randomIndex = (array: any[]) => randomRange(0, array.length) | 0
    const removeFromArray = (array: any[], i: number) => array.splice(i, 1)[0]
    const removeItemFromArray = (array: any[], item: any) =>
      removeFromArray(array, array.indexOf(item))
    const removeRandomFromArray = (array: any[]) =>
      removeFromArray(array, randomIndex(array))
    const getRandomFromArray = (array: any[]) => array[randomIndex(array) | 0]

    // TWEEN FACTORIES
    const resetPeep = ({ stage, peep }: { stage: any; peep: any }) => {
      const direction = Math.random() > 0.5 ? 1 : -1
      const offsetY = 50 - 100 * gsap.parseEase('power2.in')(Math.random())
      const startY = stage.height * 0.65 + offsetY
      let startX: number
      let endX: number

      if (direction === 1) {
        startX = -peep.width
        endX = stage.width
        peep.scaleX = 1
      } else {
        startX = stage.width + peep.width
        endX = 0
        peep.scaleX = -1
      }

      peep.x = startX
      peep.y = startY
      peep.anchorY = startY

      return {
        startX,
        startY,
        endX,
      }
    }

    const normalWalk = ({ peep, props }: { peep: any; props: any }): any => {
      const { startY, endX } = props
      const xDuration = 12
      const yDuration = 0.15

      const tl = gsap.timeline()
      tl.timeScale(randomRange(0.8, 1.3))
      tl.to(
        peep,
        {
          duration: xDuration,
          x: endX,
          ease: 'none',
        },
        0,
      )
      tl.to(
        peep,
        {
          duration: yDuration,
          repeat: xDuration / yDuration,
          yoyo: true,
          y: startY - 15,
        },
        0,
      )

      return tl
    }

    const walks = [normalWalk]

    // TYPES
    type Peep = {
      image: HTMLImageElement
      rect: number[]
      width: number
      height: number
      drawArgs: any[]
      x: number
      y: number
      anchorY: number
      scaleX: number
      walk: any
      setRect: (rect: number[]) => void
      render: (ctx: CanvasRenderingContext2D) => void
    }

    // FACTORY FUNCTIONS
    const createPeep = ({
      image,
      rect,
    }: {
      image: HTMLImageElement
      rect: number[]
    }): Peep => {
      const peep: Peep = {
        image,
        rect: [],
        width: 0,
        height: 0,
        drawArgs: [],
        x: 0,
        y: 0,
        anchorY: 0,
        scaleX: 1,
        walk: null,
        setRect: (rect: number[]) => {
          peep.rect = rect
          peep.width = rect[2]
          peep.height = rect[3]
          peep.drawArgs = [peep.image, ...rect, 0, 0, peep.width, peep.height]
        },
        render: (ctx: CanvasRenderingContext2D) => {
          ctx.save()
          ctx.translate(peep.x, peep.y)
          ctx.scale(peep.scaleX, 1)
          ctx.drawImage(
            peep.image,
            peep.rect[0],
            peep.rect[1],
            peep.rect[2],
            peep.rect[3],
            0,
            0,
            peep.width,
            peep.height,
          )
          ctx.restore()
        },
      }

      peep.setRect(rect)
      return peep
    }

    // MAIN
    const img = document.createElement('img')
    const stage = {
      width: 0,
      height: 0,
    }

    const allPeeps: Peep[] = []
    const availablePeeps: Peep[] = []
    const crowd: Peep[] = []

    const createPeeps = () => {
      const { rows, cols } = config
      const { naturalWidth: width, naturalHeight: height } = img
      const total = rows * cols
      const rectWidth = width / cols
      const rectHeight = height / rows

      for (let i = 0; i < total; i++) {
        const col = i % cols
        const row = Math.floor(i / cols)
        allPeeps.push(
          createPeep({
            image: img,
            rect: [col * rectWidth, row * rectHeight, rectWidth, rectHeight],
          }),
        )
      }
    }

    const initCrowd = () => {
      const peepsToAdd = Math.min(95, availablePeeps.length)
      for (let i = 0; i < peepsToAdd; i++) {
        const peep = addPeepToCrowd()
        if (peep) {
          peep.walk.progress(Math.random() * 0.5)
        }
      }
    }

    const addPeepToCrowd = () => {
      if (availablePeeps.length === 0) return null

      const peep = removeRandomFromArray(availablePeeps)
      const walk = getRandomFromArray(walks)({
        peep,
        props: resetPeep({
          peep,
          stage,
        }),
      }).eventCallback('onComplete', () => {
        removePeepFromCrowd(peep)
        addPeepToCrowd()
      })

      peep.walk = walk

      crowd.push(peep)
      crowd.sort((a, b) => a.anchorY - b.anchorY)

      return peep
    }

    const removePeepFromCrowd = (peep: Peep) => {
      removeItemFromArray(crowd, peep)
      availablePeeps.push(peep)
    }

    const render = () => {
      if (!canvas || !ctx) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      crowd.forEach((peep) => {
        peep.render(ctx)
      })
    }

    const resize = () => {
      if (!canvas) return
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()

      stage.width = rect.width
      stage.height = rect.height

      canvas.width = stage.width * dpr
      canvas.height = stage.height * dpr

      ctx?.scale(dpr, dpr)

      crowd.forEach((peep) => {
        if (peep.walk) peep.walk.kill()
      })

      crowd.length = 0
      availablePeeps.length = 0
      availablePeeps.push(...allPeeps)

      initCrowd()
    }

    const init = () => {
      createPeeps()
      resize()
      const renderTicker = () => render()
      gsap.ticker.add(renderTicker)
    }

    img.onload = init
    img.src = config.src

    const handleResize = () => resize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      const renderTicker = () => render()
      gsap.ticker.remove(renderTicker)
      crowd.forEach((peep) => {
        if (peep.walk) peep.walk.kill()
      })
    }
  }, [imageSrc, rowCount, colCount])
  return <canvas ref={canvasRef} className='absolute inset-0 h-full w-full' />
}

const Skiper39 = () => {
  return (
    <div className='relative min-h-screen w-full bg-white text-black'>
      <div className='absolute left-1/2 top-8 sm:top-12 md:top-16 lg:top-20 grid -translate-x-1/2 content-start justify-center items-center gap-4 sm:gap-6 text-center text-black'>
        <span className="relative max-w-[12ch] text-xs sm:text-sm md:text-base uppercase leading-tight opacity-40 after:absolute after:left-1/2 after:top-full after:h-12 sm:after:h-16 after:w-px after:bg-linear-to-b after:from-white after:to-black after:content-['']">
          Croud Canvas
        </span>
      </div>
      <div className='absolute bottom-0 h-full w-full'>
        <CrowdCanvas src='/all-peeps.png' rows={30} cols={14} />
      </div>
    </div>
  )
}

export { CrowdCanvas, Skiper39 }

/**
 * Skiper 39 Canvas_Landing_004 — React + Canvas
 * Inspired by and adapted from https://codepen.io/zadvorsky/pen/xxwbBQV
 * illustration by https://www.openpeeps.com/
 * We respect the original creators. This is an inspired rebuild with our own taste and does not claim any ownership.
 * These animations aren’t associated with the codepen.io . They’re independent recreations meant to study interaction design
 *
 * License & Usage:
 * - Free to use and modify in both personal and commercial projects.
 * - Attribution to Skiper UI is required when using the free version.
 * - No attribution required with Skiper UI Pro.
 *
 * Feedback and contributions are welcome.
 *
 * Author: @gurvinder-singh02
 * Website: https://gxuri.in
 * Twitter: https://x.com/Gur__vi
 */
