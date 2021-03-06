import React, { useState } from "react"
import TextField from "@material-ui/core/TextField"
import { Button } from "@material-ui/core"
import { useEffect } from "react"
import { Formik, Form } from "formik"
import { Link } from "react-router-dom"
import { getAllScores } from "../utils/utils"

interface FormValues {
  username: string
}

const Home = () => {
  const initialValue = localStorage.getItem("user")
  const [user, setUser] = useState<string>(initialValue ? initialValue : "")
  const [sameUser, setSameUser] = useState<boolean>(false)
  const [isText, setIsText] = useState<boolean>(false)
  const scores = getAllScores()

  useEffect(() => {
    const value = localStorage.getItem("user")
    if (value) {
      setUser((prev) => value.toString())
      setIsText(true)
    }
  }, [])

  useEffect(() => {
    if (user && scores) {
      const userFound = scores.filter(
        (score: { user: string }) => score.user.toLowerCase() === user
      )
      if (userFound.length > 0) {
        setSameUser(true)
      } else {
        setSameUser(false)
      }
    }
  }, [scores, user])

  const initialValues: FormValues = {
    username: "",
  }

  return (
    <div className="w-full flex items-center justify-center">
      <div className="border p-5 flex flex-col items-center justify-between h-[400px] my-10 ">
        <div>
          <h3 className="flex items-center justify-center w-full text-xl font-medium">
            Click Play button to play the Memory Card! Game
          </h3>
          {isText ? (
            <span
              className="w-full flex items-center justify-center text-lg my-5"
              id="user"
              onClick={() => setIsText((prev) => !prev)}
            >
              Hello {user}
            </span>
          ) : (
            <Formik
              initialValues={initialValues}
              onSubmit={(values, actions) => {
                actions.setSubmitting(true)

                setUser((prevState) => {
                  localStorage.setItem("user", values.username)
                  return values.username
                })
                setIsText(true)
                actions.setSubmitting(false)
              }}
            >
              {({
                values,
                handleReset,
                handleSubmit,
                handleBlur,
                handleChange,
                errors,
              }) => (
                <Form
                  onReset={handleReset}
                  onSubmit={handleSubmit}
                  className="w-full h-full space-y-5 flex flex-col justify-around items-center"
                >
                  <div>
                    <TextField
                      id="username"
                      value={values.username}
                      label="User"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="text"
                      placeholder="Enter your name"
                    />
                  </div>
                  <span className="w-7/12 font-medium leading-6 text-center">
                    Type your name and Press Enter to active Play! button
                  </span>
                </Form>
              )}
            </Formik>
          )}
        </div>

        <Button
          disabled={!isText || sameUser}
          className="absolute bottom-0"
          variant="contained"
          color="primary"
          component={Link}
          to="/game"
          type="submit"
        >
          Play!
        </Button>
      </div>
    </div>
  )
}

export default Home
