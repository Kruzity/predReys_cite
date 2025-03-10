import React from 'react'
import { RotatingLines } from 'react-loader-spinner'

const LoaderComponent = () => {
  return (
    <RotatingLines
      strokeColor="grey"
      strokeWidth="5"
      animationDuration="0.75"
      width="56"
      visible={true}
    />
  )
}

export default LoaderComponent