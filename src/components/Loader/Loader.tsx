import React from "react"
import Loader from "react-loader-spinner"

const LoaderShow: React.FC = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Loader
        type="CradleLoader"
        color="#00BFFF"
        height={100}
        width={100}
        timeout={3000} //3 secs
      />
    </div>
  )
}

export default LoaderShow
