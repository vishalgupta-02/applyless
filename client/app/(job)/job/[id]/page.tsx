'use client'

import { useParams } from 'next/navigation'

const IndividualJob = () => {
  const { id } = useParams()

  return <div>IndividualJob {id}</div>
}

export default IndividualJob
