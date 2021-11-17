import { useEffect, useState } from "react"
import moment from "moment"
import { useHistory } from "react-router"
import Card from "../components/Card/Card"
import { IProps } from "../interfaces/types"
import useFetch from "../hooks/useFetch"
import { getUserName, shuffleImages } from "../utils/utils"
import Error from "../components/Error/Error"
import LoaderShow from "../components/Loader/Loader"

function Game() {
  const [images, setImages] = useState<IProps[]>([])

  const [selectedCard, setSelectedCard] = useState<number[]>([])

  const [matchedImages, setMatchedImages] = useState<number[]>([])

  const [score, setScore] = useState<number>(180)

  const { data, error, loading } = useFetch()

  const history = useHistory()

  const username = getUserName()

  useEffect(() => {
    if (data) {
      setImages(shuffleImages(data))
    }
  }, [data])

  const matchImages = (i: number, j: number) => {
    if (images?.[i]?.url === images?.[j]?.url) {
      setMatchedImages([...matchedImages, i, j])
      setSelectedCard([])
      setScore((prev) => prev + 40)
    } else {
      setSelectedCard([...selectedCard, j])
      if (selectedCard.length === 1) {
        setScore((prev) => prev - 20)
      }
    }
  }

  const whichItem = (index: number) => {
    if (selectedCard.length === 2) {
      setSelectedCard([index])
    } else {
      matchImages(selectedCard[0], index)
    }
  }

  useEffect(() => {
    if (score <= 0) {
      alert("Game Over")

      setTimeout(() => {
        history.push("/score")
      }, 300)
    }
  }, [score, history])

  useEffect(() => {
    if (selectedCard.length === 2) {
      setTimeout(() => {
        setSelectedCard([])
      }, 3000)
    }
  }, [selectedCard])

  useEffect(() => {
    const date = moment().format("MM/DD/YYYY")
    if (matchedImages.length === 16) {
      const user = localStorage.getItem("user")
      const users = JSON.parse(localStorage.getItem("users") || "[]")
      const id = Math.random() * 1000

      users.push({
        id: id,
        user: user,
        date: date,
        score: score,
      })
      localStorage.setItem("users", JSON.stringify(users))

      alert("You Win")

      history.push("/score")
    }
  }, [matchedImages, history, score])

  return (
    <main className="flex flex-col min-h-screen w-full items-center justify-around text-white bg-gradient-to-br from-gray-600 via-teal-700 to-gray-800">
      <header className="w-full flex flex-col items-center justify-center space-y-3 my-5 mx-5 px-4 text-center md:px-0 md:mx-0">
        <h2 className="w-full text-2xl font-medium my-5 flex items-center justify-center">
          Hi {username}
        </h2>
        <h3 className="text-xl">Play the Flip card game</h3>
        <span>
          Select two cards with same content consequtively to make them vanish
        </span>
        <span className="text-lg mt-2">Score: {score}</span>
      </header>

      <div className="w-full h-full flex justify-center">
        {error ? (
          <Error text={error} />
        ) : loading ? (
          <LoaderShow />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 col-span-4 gap-4">
            {images.map((item, i) => {
              return (
                <Card
                  key={item.id + i}
                  item={item}
                  index={i}
                  whichItem={whichItem}
                  visible={
                    selectedCard.includes(i) || matchedImages.includes(i)
                  }
                />
              )
            })}
          </div>
        )}
      </div>
    </main>
  )
}

export default Game
