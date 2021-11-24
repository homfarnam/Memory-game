import React from "react"

interface ErrorProps {
  /** Pass the error text to component to show the error. */
  text: string
}

const Error: React.FC<ErrorProps> = ({ text }) => {
  return (
    <div className="w-full flex justify-center">
      <h3 className="text-lg">{text}</h3>
    </div>
  )
}

export default Error
