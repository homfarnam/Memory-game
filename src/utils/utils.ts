import { IProps } from "../interfaces/types"

const shuffleImages = (arr: IProps[]) => {
  return arr.sort(() => Math.random() - 0.5)
}

const getUserName = () => {
  const initialValue = localStorage.getItem("user")

  return initialValue ?? null
}

export { shuffleImages, getUserName }
