import { useEffect, useState } from "react";
import Header from "../components/pokedex/Header";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Logout } from "../components/Logout";

const PokemonId = () => {
  const [pokemon, setPokemon] = useState();
  const { id } = useParams();

  const backType = {
    grass: "bg-[#B1DBBC]",
    fire: "bg-[#E6901E]",
    water: "bg-[#83B9FF]",
    bug: "bg-[#AAFFA8]",
    normal: "bg-[#BA707F]",
    flying: "bg-[#BA707F]",
    poison: "bg-[#5B3184]",
    ground: "bg-[#9C6614]",
    electric: "bg-[#2B319B]",
    fairy: "bg-[#C5597E]",
    fighting: "bg-[#96402A]",
    psychic: "bg-[#9BB7AD]",
    rock: "bg-[#7E7E7E]",
    ghost: "bg-[#323569]",
    ice: "bg-[#6FBEDF]",
    dragon: "bg-[#56A4AE]",
    dark: "bg-[#0B0E0D]",
    steel: "bg-[#9BB7AD]",
  };

  const backgroundByType = {
    grass: "from-[#7EC6C5] to-[#CAE099]",
    fire: "from-[#F96D6F] to-[#E8AE1B]",
    water: "from-[#1479FB] to-[#82B2F1]",
    bug: "from-[#62DB60] to-[#AAFFA8]",
    normal: "from-[#735259] to-[#7C3F4C]",
    poison: "from-[#5B3184] to-[#CE9BFF]",
    ground: "from-[#654008] to-[#D69638]",
    electric: "from-[#0C1395] to-[#7075D9]",
    fairy: "from-[#971B45] to-[#CD7D98]",
    fighting: "from-[#96402A] to-[#CB735D]",
    psychic: "from-[#5E736C] to-[#A8A8A8]",
    rock: "from-[#7E7E7E] to-[#D3D3D3]",
    ghost: "from-[#323569] to-[#787DDA]",
    ice: "from-[#6FBEDF] to-[#BDEBFE]",
    dragon: "from-[#478A93] to-[#A2BEC1]",
    dark: "from-[#030706] to-[#5A5E5D]",
    steel: "from-[#5E736C] to-[#728881]",
  };

  const titleCard = {
    grass: "text-[#416460]",
    fire: "text-[#E75C35]",
    water: "text-[#1479FB]",
    bug: "text-[#4AB648]",
    normal: "text-[#735259]",
    poison: "text-[#5B3184]",
    ground: "text-[#654008]",
    electric: "text-[#0C1395]",
    fairy: "text-[#971B45]",
    fighting: "text-[#96402A]",
    psychic: "text-[#5E736C]",
    rock: "text-[#7E7E7E]",
    ghost: "text-[#323569]",
    ice: "text-[#6FBEDF]",
    dragon: "text-[#478A93]",
    dark: "text-[#030706]",
    steel: "text-[#5E736C]",
  };

  useEffect(() => {
    const URL = `https://pokeapi.co/api/v2/pokemon/${id}/`;
    axios
      .get(URL)
      .then((res) => setPokemon(res.data))
      .catch((err) => console.log(err));
  }, []);
  const getPercentStatbar = (stat_base) => {
    const percentBarProgress = (stat_base * 100) / 255;
    return `${percentBarProgress}%`;
  };

  console.log(pokemon);
  return (
    <section>
      <Header />

      <section className="px-2 py-14">
        <article className="max-w-[1000px] mx-auto shadow-xl p-2">
          {/* Seccion superior */}
          <section
            className={`bg-gradient-to-b ${
              backgroundByType[pokemon?.types[0].type.name]
            } relative h-[150px]`}
          >
            <div className="w-[200px] mx-auto absolute left-1/2 -translate-x-1/2 -top-14">
              <img
                src={pokemon?.sprites.other["official-artwork"].front_default}
                alt=""
              />
            </div>
          </section>

          {/* Informacion general*/}
          <section className="px-4">
            <div>
              <h3
                className={`text-center text-[25px] md:text-[40px] ${
                  titleCard[pokemon?.types[0].type.name]
                }`}
              >
                #{pokemon?.id}
              </h3>
            </div>
            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
              <hr />
              <h2
                className={`capitalize font-bold text-[30px]   md:text-[45px] ${
                  titleCard[pokemon?.types[0].type.name]
                }`}
              >
                {pokemon?.name}
              </h2>
              <hr />
            </div>

            <div className="flex justify-center gap-6 text-center">
              <div>
                <h5>Weight</h5>
                <span className=" font-semibold text-[20px]">
                  {pokemon?.weight}
                </span>
              </div>
              <div>
                <h5>Height</h5>
                <span className=" font-semibold text-[20px]">
                  {pokemon?.height}
                </span>
              </div>
            </div>
            <section className="grid sm:grid-cols-2 gap-4 mt-5">
              {/* Tipos */}
              <section className="text-center">
                <h3 className="text-[20px]  md:text-[25px] font-semibold">
                  Types
                </h3>
                <section className="grid grid-cols-2 gap-4 mt-4 ">
                  {pokemon?.types.map((type) => (
                    <article
                      className={`p-2 px-8 border-[1px] border-gray-300 capitalize text-white ${
                        backType[type.type.name]
                      }`}
                      key={type.type.name}
                    >
                      {type.type.name}
                    </article>
                  ))}
                </section>
              </section>
              {/* Habilidades */}
              <section className="text-center">
                <h3 className="text-[20px]  md:text-[25px] font-semibold">
                  Abilities
                </h3>
                <section className="grid grid-cols-2 gap-4 mt-4 ">
                  {pokemon?.abilities.map((ability) => (
                    <article
                      className="p-2 px-8 border-[1px] border-gray-300 capitalize truncate"
                      key={ability.ability.name}
                    >
                      {ability.ability.name}
                    </article>
                  ))}
                </section>
              </section>
            </section>
          </section>
          {/* seccion de stats */}
          <section className="px-4">
            <div className="flex items-center gap-3 mt-5">
              <h3 className="text-[25px] md:text-[40px] font-bold">Stats</h3>
              <hr className="w-full" />
            </div>
            <section>
              {pokemon?.stats.map((stat) => (
                <article key={stat.stat.name}>
                  <section className="flex justify-between">
                    <h5 className="capitalize">{stat.stat.name}</h5>
                    <span>{stat.base_stat}/255</span>
                  </section>
                  <div className=" bg-gray-100 h-6 rounded-sm">
                    <div
                      style={{ width: getPercentStatbar(stat.base_stat) }}
                      className={`h-full  bg-gradient-to-r  from-yellow-300 to-yellow-600`}
                    ></div>
                  </div>
                </article>
              ))}
            </section>
          </section>
        </article>

        {/* seccion de movements */}
        <section className="max-w-[1000px] mx-auto shadow-xl mt-5 p-5">
          <div className="flex items-center gap-3 mb-5">
            <h3 className="text-[25px]  md:text-[40px] font-bold">Movements</h3>
            <hr className="w-full" />
          </div>
          <section className="flex flex-wrap gap-3">
            {pokemon?.moves.map((move) => (
              <div className=" bg-[#E5E5E5] px-3 py-2 rounded-2xl">
                {" "}
                {move.move.name}
              </div>
            ))}
          </section>
        </section>
      </section>
      <Logout />
    </section>
  );
};

export default PokemonId;
