import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const bordersByType = {
  grass: "border-[#B1DBBC]",
  fire: "border-[#E6901E]",
  water: "border-[#83B9FF]",
  bug: "border-[#AAFFA8]",
  normal: "border-[#BA707F]",
  poison: "border-[#5B3184]",
  ground: "border-[#9C6614]",
  electric: "border-[#2B319B]",
  fairy: "border-[#C5597E]",
  fighting: "border-[#96402A]",
  psychic: "border-[#9BB7AD]",
  rock: "border-[#7E7E7E]",
  ghost: "border-[#323569]",
  ice: "border-[#6FBEDF]",
  dragon: "border-[#56A4AE]",
  dark: "border-[#0B0E0D]",
  steel: "border-[#9BB7AD]",
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

const PokemonCard = ({ pokemonUrl }) => {
  const [pokemon, setPokemon] = useState();

  const types = pokemon?.types
    .slice(0, 2)
    .map((type) => type.type.name)
    .join(" / ");

  useEffect(() => {
    axios
      .get(pokemonUrl)
      .then((res) => setPokemon(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Link
      to={`/pokedex/${pokemon?.id}`}
      className={`w-[300px] md:mx-auto  text-center border-8 rounded-md ${
        bordersByType[pokemon?.types[0].type.name]
      }`}
    >
      {/* Seccion superior */}
      <section
        className={`bg-gradient-to-b ${
          backgroundByType[pokemon?.types[0].type.name]
        } relative h-[150px]`}
      >
        <div className="absolute -bottom-12 w-[200px] left-1/2 -translate-x-1/2">
          <img
            src={pokemon?.sprites.other["official-artwork"].front_default}
            alt=""
          />
        </div>
      </section>
      {/* Seccion inferior */}
      <section>
        <h3
          className={`mt-10 text-[25px] font-semibold ${
            titleCard[pokemon?.types[0].type.name]
          }`}
        >
          {pokemon?.name}
        </h3>
        <h4 className=" text-[18px] text-[#4F4F4F] mb-4">{types}</h4>
        <span className="text-[#9F9F9F]">Type</span>

        <hr className="mt-2" />
        <section className="grid grid-cols-3 gap-2 p-2">
          {pokemon?.stats.map((stat) => (
            <div key={stat.stat.name}>
              <h5 className={`text-[#9F9F9F] truncate `}>{stat.stat.name}</h5>
              <span
                className={` font-bold  ${
                  titleCard[pokemon?.types[0].type.name]
                }`}
              >
                {stat.base_stat}
              </span>
            </div>
          ))}
        </section>
      </section>
    </Link>
  );
};

export default PokemonCard;
