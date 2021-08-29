import { Button } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import { RouteComponentProps, useHistory } from "react-router"
import _ from "lodash"
import ScoresTable from "../components/Scores/Scores"

const Score = (props: RouteComponentProps) => {
  const [usersData, setUsersData] =
    useState<{ id: number; user: string; date: string; score: string }[]>()

  // const [usersData, setUsersData] = useState<any>();
  const history = useHistory()

  props.history.listen((location, action) => {
    if (action === "POP") {
      props.history.push("/")
    }
  })

  useEffect(() => {
    const allUsers = JSON.parse(localStorage.getItem("users") || "[]")

    const sorted = _.orderBy(allUsers, "score", "desc")

    console.log(sorted)
    setUsersData(sorted)
  }, [])

  const resetDatas = () => {
    localStorage.removeItem("users")
    localStorage.removeItem("user")
    localStorage.removeItem("rank")

    history.push("/")
  }

  return (
    <div>
      <div className="w-full flex justify-center my-5">
        <h2>Scores</h2>
      </div>

      <ScoresTable usersData={usersData} />

      <div className="w-1/2 flex justify-around m-auto mt-10 space-x-6">
        <Button
          variant="contained"
          color="primary"
          className="mx-5"
          onClick={() => {
            history.push("/")
            localStorage.removeItem("user")
          }}
        >
          Go to home page
        </Button>
        <Button
          variant="contained"
          color="secondary"
          className="mx-5"
          onClick={resetDatas}
        >
          Reset All data
        </Button>
      </div>
    </div>
  )
}

export default Score
