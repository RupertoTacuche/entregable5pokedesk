import { useEffect, useState } from "react"
import Header from "../components/pokedex/Header"
import { useParams } from "react-router-dom"
import axios from "axios"

const PokemonId = () => {
  const [pokemon, setPokemon] = useState()
  console.log(pokemon)
  const {id} = useParams()
  
  useEffect(() => {
    const URL =`https://pokeapi.co/api/v2/pokemon/${id}/`
    axios.get(URL)
      .then((res) => setPokemon(res.data))
      .catch((err) => console.log(err))
  },[])
const getPercentStatbar = (stat_base) => {
  const percentBarProgress = (stat_base * 100) /255
  return `${percentBarProgress}%`
}
  return (
    <section>
      <Header />

      <section className="px-2 py-10">
        <article>
          {/* Seccion superior */}
          <section>
            <div>
              <img src={pokemon?.sprites.other["official-artwork"].front_default} alt="" />
            </div>
          </section>

          {/* Informacion general*/}
          <section>
            <div>
              <h3>#{pokemon?.id}</h3>
            </div>
            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
              <hr />
              <h2 className="capitalize font-bold" >{pokemon?.name}</h2>
              <hr />
            </div>

            <div className="flex justify-center gap-6 text-center">
              <div>
                <h5>Weight</h5>
                <span>{pokemon?.weight}</span>

              </div>
              <div>
                <h5>Height</h5>
                <span>{pokemon?.height}</span>

              </div>
            </div>

          </section>
          {/* seccion de stats */}
          <section>
            <h3>Stats</h3>
            <section>
              {
                pokemon?.stats.map(stat => (
                  <article key={stat.stat.name}>
                    <section className="flex justify-between">
                      <h5 className="capitalize">{stat.stat.name}</h5>
                      <span>{stat.base_stat}/255</span>
                    </section>
                    <div className=" bg-gray-100 h-6 rounded-sm">
                      <div style={{"width": getPercentStatbar(stat.base_stat)}} className={`h-full  bg-gradient-to-r  from-yellow-300 to-yellow-600`}></div>
                    </div>
                  </article>

                ))
              }
            </section>
          </section>
        </article>
      </section>
    </section>
  )
}

export default PokemonId