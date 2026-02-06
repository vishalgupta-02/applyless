import React from 'react'

const Countdown = () => {
  const [days, setDays] = React.useState(0)
  const [hours, setHours] = React.useState(0)
  const [minutes, setMinutes] = React.useState(0)
  const [seconds, setSeconds] = React.useState(0)

  React.useEffect(() => {
    const targetDate = new Date('2026-07-01').getTime()

    const calculateCountdown = () => {
      const now = new Date().getTime()
      const distance = targetDate - now

      if (distance <= 0) {
        setDays(0)
        setHours(0)
        setMinutes(0)
        setSeconds(0)
        return
      }

      const daysLeft = Math.floor(distance / (1000 * 60 * 60 * 24))
      const hoursLeft = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      )
      const minutesLeft = Math.floor(
        (distance % (1000 * 60 * 60)) / (1000 * 60),
      )
      const secondsLeft = Math.floor((distance % (1000 * 60)) / 1000)

      setDays(daysLeft)
      setHours(hoursLeft)
      setMinutes(minutesLeft)
      setSeconds(secondsLeft)
    }

    calculateCountdown()
    const interval = setInterval(calculateCountdown, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className='flex flex-wrap justify-center items-center gap-2 sm:gap-3 md:gap-4 lg:gap-5'>
      <div className='flex flex-col items-center'>
        <span className='countdown font-mono text-lg sm:text-2xl md:text-3xl lg:text-4xl md:text-black text-zinc-300'>
          <span
            style={{ '--value': days } as React.CSSProperties}
            aria-live='polite'
            aria-label={`${days} days`}>
            {days}
          </span>
        </span>
        <span className='text-xs sm:text-sm md:text-base md:text-black text-zinc-300'>
          days
        </span>
      </div>
      <span className='font-mono text-lg sm:text-2xl md:text-3xl lg:text-4xl md:text-black text-zinc-300'>
        :
      </span>
      <div className='flex flex-col items-center'>
        <span className='countdown font-mono text-lg sm:text-2xl md:text-3xl lg:text-4xl md:text-black text-zinc-300'>
          <span
            style={{ '--value': hours } as React.CSSProperties}
            aria-live='polite'
            aria-label={`${hours} hours`}>
            {hours}
          </span>
        </span>
        <span className='text-xs sm:text-sm md:text-base md:text-black text-zinc-300'>
          hours
        </span>
      </div>
      <span className='font-mono text-lg sm:text-2xl md:text-3xl lg:text-4xl md:text-black text-zinc-300'>
        :
      </span>
      <div className='flex flex-col items-center'>
        <span className='countdown font-mono text-lg sm:text-2xl md:text-3xl lg:text-4xl md:text-black text-zinc-300'>
          <span
            style={{ '--value': minutes } as React.CSSProperties}
            aria-live='polite'
            aria-label={`${minutes} minutes`}>
            {minutes}
          </span>
        </span>
        <span className='text-xs sm:text-sm md:text-base md:text-black text-zinc-300'>
          min
        </span>
      </div>
      <span className='font-mono text-lg sm:text-2xl md:text-3xl lg:text-4xl md:text-black text-zinc-300'>
        :
      </span>
      <div className='flex flex-col items-center'>
        <span className='countdown font-mono text-lg sm:text-2xl md:text-3xl lg:text-4xl md:text-black text-zinc-300'>
          <span
            style={{ '--value': seconds } as React.CSSProperties}
            aria-live='polite'
            aria-label={`${seconds} seconds`}>
            {seconds}
          </span>
        </span>
        <span className='text-xs sm:text-sm md:text-base md:text-black text-zinc-300'>
          sec
        </span>
      </div>
    </div>
  )
}

export default Countdown
