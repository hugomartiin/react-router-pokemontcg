import { useLoaderData } from "react-router-dom";
import PokemonCard from "~/components/PokemonCard";
import { getAllPokemonCardsBySet, getFilteredCards } from "~/services/tcgapi";
import type { Card, Filters } from "~/types/interfaces";
import type { Route } from "../+types/root";
import { useEffect, useMemo, useState } from "react";
import FilterBar from "~/components/FilterBar/FilterBar";

const initialFilters: Filters = {
  set: "",
  category: "",
  rarity: "",
  sortedBy: ""
}
// Loader function to fetch data before rendering
export async function loader({ params }: Route.LoaderArgs) {

  try {
    const set = params.setId || "base2";

    return await getFilteredCards(set);

  } catch (error) {
    console.error("Error fetching Pokémon cards:", error);
    return []; // Return empty array in case of error
  }
}
function filters() {
  // const pokemonCardList = useLoaderData().cards; // Get data from loader
  //Use with useFilteredCards in loader
  const [pokemonCardList, setPokemonCardList] = useState<Card[]>(useLoaderData().cards);
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [searchedPokemonName, setSearchedPokemonName] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchedPokemonName(value);
  };

  const filteredPokemons = useMemo(() => {
    return pokemonCardList.filter((pokemon: Card) =>
      pokemon.name.toLowerCase().startsWith(searchedPokemonName.toLowerCase())
    );
  }, [searchedPokemonName, pokemonCardList]);

  /*
  useEffect(() => {
    const fetchFilteredCards = async () => {
      const filteredCards = await getFilteredCards(filters.set, filters.category, filters.rarity, filters.sortedBy);
      setPokemonCardList(filteredCards || []);
    };

 
    fetchFilteredCards();
  }, [filters]);*/
  const handleDeleteFromFavourites = (id: string) => {

  };
  return (
    <main className="background-image bg-black min-h-[75vh]">
      <FilterBar searchedPokemonName={searchedPokemonName} handleChange={handleChange} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 w-[80%] mx-auto py-12">
        {filteredPokemons.length > 0 ? (
          filteredPokemons.map((card: Card) => (
            <PokemonCard key={card.id} card={card} canAddToFavourites={true} onDeleteFromFavourites={handleDeleteFromFavourites} />
          ))
        ) : (
          <p className="text-white text-center col-span-full">No Pokémon cards found.</p>
        )}
      </div>
    </main>
  );
}


export default filters;