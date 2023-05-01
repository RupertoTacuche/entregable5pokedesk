import { useSelector } from "react-redux"
import Header from "../components/pokedex/Header"
import { useEffect } from "react"
import axios from "axios"

const Pokedex = () => {

  const nameTrainer = useSelector(store => store.nameTrainer)

  useEffect(() => {
    const URL="https://pokeapi.co/api/v2/pokemon"

    axios.get(URL)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err))
  },[])

  return (
    <section className="min-h-screen">
      <Header />
      <section className="py-6 px-2">
        <h3>Welcome {nameTrainer}, here you can find your favorite pokemon</h3>

        <form>
          <div>
            <input type="text" placeholder="Search your pokemon"/>
            <buttom>Search</buttom>
          </div>

          <select>
            <option value="">All</option>
          </select>
        </form>
      </section>
    </section>
  )
}

export default Pokedex