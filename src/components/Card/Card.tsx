import classnames from "classnames"
import "./card.scss"

interface CardProps {
  /** The image data that includes {id, url and first_name} */
  item: {
    id: number
    url: string
    first_name: string
  }
  /** Function for get the image index */
  whichItem: (index: number) => void

  /** The image index number */
  index: number

  /** Show the image or not*/
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
