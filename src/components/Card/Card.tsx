import classnames from "classnames"
import "./card.scss"

interface CardProps {
  item: {
    id: number
    url: string
    first_name: string
  }
  whichItem: (index: number) => void
  index: number
  visible?: boolean
}

const Card: React.FC<CardProps> = ({ item, index, whichItem, visible }) => {
  const handleClick = () => {
    if (!visible) {
      whichItem(index)
    }
  }

  return (
    <div
      key={item.id}
      onClick={handleClick}
      className={classnames("card", {
        "is-flipped": visible,
        "is-inactive": !visible,
      })}
    >
      <img
        src={item.url}
        alt={item.first_name}
        className="h-[200px] w-[200px]"
        draggable={false}
      />
    </div>
  )
}

export default Card
