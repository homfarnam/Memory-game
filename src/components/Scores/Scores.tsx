import React from "react"

interface ScoresProps {
  usersData:
    | {
        id: number
        user: string
        date: string
        score: string
      }[]
    | null
}

const Scores: React.FC<ScoresProps> = ({ usersData }) => {
  return (
    <div className="w-full flex justify-center">
      {usersData?.length ? (
        <table className="border border-black">
          <thead className="p-2">
            <th>Rank</th>
            <th>Name</th>
            <th>Date</th>
            <th>Score</th>
          </thead>
          <tbody className="p-2">
            {usersData?.map((item, i) => (
              <tr key={item?.id}>
                <td>{i + 1}</td>
                <td>{item?.user}</td>
                <td>{item?.date}</td>
                <td>{item?.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        "There is no data"
      )}
    </div>
  )
}

export default Scores
