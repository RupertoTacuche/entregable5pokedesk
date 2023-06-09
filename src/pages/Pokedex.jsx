import { useSelector } from "react-redux";
import Header from "../components/pokedex/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import PokemonCard from "../components/pokedex/PokemonCard";
import { Logout } from "../components/Logout";

const Pokedex = () => {
  const [pokemons, setPokemons] = useState([]);
  const [pokemonName, setPokemonName] = useState("");
  const [types, setTypes] = useState([]);
  const [currentType, setCurrentType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const nameTrainer = useSelector((store) => store.nameTrainer);

  const handleSubmit = (e) => {
    e.preventDefault();
    setPokemonName(e.target.pokemonName.value);
  };

  const pokemonsByName = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(pokemonName.toLowerCase())
  );

  const paginationLogic = () => {
    //Cantidad de pokemons por pagina
    const POKEMONS_PER_PAGE = 12;
    //pokemons que se van a mostrar en la pagina actual

    const sliceStart = (currentPage - 1) * POKEMONS_PER_PAGE;
    const sliceEnd = sliceStart + POKEMONS_PER_PAGE;
    const pokemonInPage = pokemonsByName.slice(sliceStart, sliceEnd);

    //Ultima pagina

    const lastPage = Math.ceil(pokemonsByName.length / POKEMONS_PER_PAGE) || 1;

    //Bloque actual
    const PAGES_PER_BLOCK = 5;
    const actualBlock = Math.ceil(currentPage / PAGES_PER_BLOCK);
    //Paginas que se van a mostrar en el bloque actual
    const pagesInBlock = [];
    const minPage = (actualBlock - 1) * PAGES_PER_BLOCK + 1;
    const maxPage = actualBlock * PAGES_PER_BLOCK;
    for (let i = minPage; i <= maxPage; i++) {
      if (i <= lastPage) {
        pagesInBlock.push(i);
      }
    }
    return { pokemonInPage, lastPage, pagesInBlock };
  };

  const { pokemonInPage, lastPage, pagesInBlock } = paginationLogic();

  const handleClickPreviusPage = () => {
    const newCurrentPage = currentPage - 1;
    if (newCurrentPage >= 1) {
      setCurrentPage(newCurrentPage);
    }
  };

  const handleClickNextPage = () => {
    const newCurrentPage = currentPage + 1;
    if (newCurrentPage <= lastPage) {
      setCurrentPage(newCurrentPage);
    }
  };

  useEffect(() => {
    if (!currentType) {
      const URL = "https://pokeapi.co/api/v2/pokemon?limit=1281";

      axios
        .get(URL)
        .then((res) => setPokemons(res.data.results))
        .catch((err) => console.log(err));
    }
  }, [currentType]);

  useEffect(() => {
    const URL = "https://pokeapi.co/api/v2/type";
    axios
      .get(URL)
      .then((res) => {
        const newTypes = res.data.results.map((type) => type.name);
        setTypes(newTypes);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (currentType) {
      const URL = `https://pokeapi.co/api/v2/type/${currentType}/`;
      axios
        .get(URL)
        .then((res) => {
          const pokemonsByType = res.data.pokemon.map(
            (pokemon) => pokemon.pokemon
          );
          setPokemons(pokemonsByType);
        })
        .catch((err) => console.log(err));
    }
  }, [currentType]);

  return (
    <section className="min-h-screen">
      <Header />
      {/* Seccion de filtros y saludo */}
      <section className="py-6 px-2 md:px-10 ">
        <h3 className="text-[20px] mb-5">
          {" "}
          <span className=" text-red-600 font-bold">
            Welcome {nameTrainer},{" "}
          </span>{" "}
          here you can find your favorite pokemon
        </h3>

        <form
          className="flex flex-col md:flex-row gap-4"
          onSubmit={handleSubmit}
        >
          <div className="flex justify-center w-full md:w-[70%] xl:w-[50%]">
            <input
              className="h-[50px] w-[70%] ps-2 shadow-lg"
              id="pokemonName"
              type="text"
              placeholder="Search your pokemon"
            />
            <button className="h-[50px] w-[30%] bg-red-600 text-white px-5 rounded-md">
              Search
            </button>
          </div>

          <select
            className="h-[50px] shadow-lg md:w-[30%] xl:w-[50%]"
            onChange={(e) => setCurrentType(e.target.value)}
          >
            <option value="">All</option>
            {types.map((type) => (
              <option className="capitalize" value={type} key={type}>
                {type}
              </option>
            ))}
          </select>
        </form>
      </section>

      {/* seccion lista de pokemons*/}
      <section className=" px-2 lg:px-10 grid gap-6 justify-center items-center md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
        {pokemonInPage.map((pokemon) => (
          <PokemonCard key={pokemon.url} pokemonUrl={pokemon.url} />
        ))}
      </section>

      {/* Paginacion */}
      <ul className="mt-5 mb-5 flex gap-3 justify-center">
        <li
          onClick={handleClickPreviusPage}
          className="p-3 bg-red-600 font-bold text-white rounded-md cursor-pointer"
        >
          {"<"}
        </li>
        {pagesInBlock.map((numberPage) => (
          <li
            onClick={() => setCurrentPage(numberPage)}
            className={`p-3 bg-red-600 font-bold text-white rounded-md cursor-pointer ${
              numberPage === currentPage && " bg-red-300"
            }`}
            key={numberPage}
          >
            {numberPage}
          </li>
        ))}
        <li
          onClick={handleClickNextPage}
          className="p-3 bg-red-600 font-bold text-white rounded-md cursor-pointer"
        >
          {">"}
        </li>
      </ul>
      <Logout />
    </section>
  );
};

export default Pokedex;
