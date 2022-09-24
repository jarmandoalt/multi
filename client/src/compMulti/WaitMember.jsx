import { useSelector, useDispatch } from "react-redux";
import pokeball from '../assets/pokeball.png'

const WaitMember = () => {
  const { dataServer } = useSelector(
    (state) => state.crud
  )

  return (
    <div id="waitMulti">
      <h2>
        Waiting for {dataServer.nameAdmin} to set up the game
      </h2>
      <img src={pokeball} alt="" />
    </div>
  )
}

export default WaitMember