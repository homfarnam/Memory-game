import { IProps } from "../interfaces/types"
import _ from "lodash"

const shuffleImages = (arr: IProps[]) => {
  return arr.sort(() => Math.random() - 0.5)
}

const getUserName = () => {
  const initialValue = localStorage.getItem("user")

  return initialValue ?? null
}

const getAllScores = () => {
  const allUsers = JSON.parse(localStorage.getItem("users") || "[]")

  const sorted = _.orderBy(allUsers, "score", "desc")
  return sorted
}

export { shuffleImages, getUserName, getAllScores }
