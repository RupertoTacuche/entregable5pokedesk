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

      <section className="px-2 py-14">
        <article className="max-w-[768px] mx-auto shadow-xl p-2">
          {/* Seccion superior */}
          <section className="bg-gradient-to-b from-green-500 to-black relative h-[150px]">
            <div className="w-[200px] mx-auto absolute left-1/2 -translate-x-1/2 -top-14">
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
            <section className="grid sm:grid-cols-2 gap-4">
              {/* Tipos */}
              <section className="text-center">
                <h3>Types</h3>
                <section className="grid grid-cols-2 gap-4 mt-4 ">
                  {
                    pokemon?.types.map(type => <article className="p-2 px-8 border-[1px] border-gray-300 capitalize " key={type.type.name}>{type.type.name}</article>)
                  }
                </section>

              </section>
              {/* Habilidades */}
              <section className="text-center">
              <h3>Abilities</h3>
                <section className="grid grid-cols-2 gap-4 mt-4 ">
                  {
                    pokemon?.abilities.map(ability => <article className="p-2 px-8 border-[1px] border-gray-300 capitalize truncate" key={ability.ability.name}>{ability.ability.name}</article>)
                  }
                </section>
      
              </section>

            </section>

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