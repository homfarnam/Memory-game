import React, { useState } from "react"
import TextField from "@material-ui/core/TextField"
import { Button } from "@material-ui/core"
import { useEffect } from "react"
import { Formik, Form } from "formik"
import { Link } from "react-router-dom"

interface FormValues {
  username: string
}

const Home = () => {
  const initialValue = localStorage.getItem("user")
  const [user, setUser] = useState<string>(initialValue ? initialValue : "")
  const [isText, setIsText] = useState<boolean>(false)

  useEffect(() => {
    const value = localStorage.getItem("user")
    if (value) {
      setUser((prev) => value.toString())
      setIsText(true)
    }
  }, [])

  const initialValues: FormValues = {
    username: "",
  }

  return (
    <div className="w-full flex items-center justify-center">
      <div className="border p-5 flex flex-col items-center justify-between h-[400px]">
        <div>
          <h3>Click Play button to play the Memory Card! Game</h3>
          {isText ? (
            <span id="user" onClick={() => setIsText((prev) => !prev)}>
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
                </Form>
              )}
            </Formik>
          )}
        </div>

        <Button
          disabled={!isText}
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
