import { TileProps } from './interface'
import './style.scss'

const Tile = ({ children }: TileProps) => {
  return <div className="tile tile--shadow-light">{children}</div>
}

export default Tile
