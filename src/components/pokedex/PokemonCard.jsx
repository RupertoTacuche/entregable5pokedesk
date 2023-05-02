import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const bordersByType = {
    grass: "border-green-500",
    fire: "border-red-500"
}

const backgroundByType = {
    grass: "from-green-500 to-black",
    fire: "from-red-500 to-black"

}

const PokemonCard = ({pokemonUrl}) => {

    const [pokemon, setPokemon] = useState()

    const types = pokemon?.types.slice(0,2).map(type => type.type.name).join(" / ")

    useEffect(() => {
        axios.get(pokemonUrl)
            .then((res) => setPokemon(res.data))
            .catch((err) => console.log(err))
    },[])

  return (
     
    <Link to={`/pokedex/${pokemon?.id}`} className={`text-center border-8 rounded-md ${bordersByType[pokemon?.types[0].type.name]}`}>
        {/* Seccion superior */}
        <section className={`bg-gradient-to-b ${backgroundByType[pokemon?.types[0].type.name]} relative h-[150px]`}>
            <div className="absolute -bottom-12 w-[200px] left-1/2 -translate-x-1/2">
                <img src={pokemon?.sprites.other["official-artwork"].front_default} alt="" />
            </div>

        </section>
        {/* Seccion inferior */}
        <section>
            <h3 className="mt-10">{pokemon?.name}</h3>
            <h4>{types}</h4>
            <span>Type</span>

            <hr />
            <section className="grid grid-cols-3 gap-2 p-2">
                {
                    pokemon?.stats.map(stat => (
                        <div key={stat.stat.name}>
                            <h5>{stat.stat.name}</h5>
                            <span>{stat.base_stat}</span>
                        </div>
                    ))
                }
            </section>

        </section>

    </Link>
  )
}

export default PokemonCard