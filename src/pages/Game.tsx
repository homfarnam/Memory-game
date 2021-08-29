import { useEffect, useState } from "react"
import moment from "moment"
import { useHistory } from "react-router"
import Card from "../components/Card/Card"
import { IProps } from "../interfaces/types"
import { shuffleImages } from "../utils/utils"

function Game() {
  const [images, setImages] = useState<IProps[]>([])

  const [selectedCard, setSelectedCard] = useState<number[]>([])

  const [matchedImages, setMatchedImages] = useState<number[]>([])

  const [score, setScore] = useState(180)

  const history = useHistory()

  useEffect(() => {
    fetch("https://tinyfac.es/api/data?limit=8")
      .then((res) => res.json())
      .then((data) => {
        setImages(shuffleImages([...data, ...data]))
      })
      .catch((err) => console.log(err))
  }, [])

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
    if (matchedImages.length === 16) {
      alert("You Win")
    }
  }, [matchedImages])

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

      history.push("/score")
    }
  }, [matchedImages, history, score])

  return (
    <div className="flex flex-col min-h-screen w-full items-center justify-around text-white bg-gradient-to-br from-gray-600 via-teal-700 to-gray-800">
      <header className="w-full flex flex-col items-center justify-center space-y-3 my-5 mx-5 px-4 text-center md:px-0 md:mx-0">
        <h2 className="text-xl">Play the Flip card game</h2>
        <span>
          Select two cards with same content consequtively to make them vanish
        </span>
        <span>Score: {score}</span>
      </header>

      <div className="w-full h-auto flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 col-span-4 gap-4">
          {images.map((item, i) => {
            return (
              <Card
                key={item.id + i}
                item={item}
                index={i}
                whichItem={whichItem}
                visible={selectedCard.includes(i) || matchedImages.includes(i)}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Game
