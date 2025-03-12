import { useLoaderData } from "react-router-dom";
import PokemonCard from "~/components/PokemonCard";
import { getAllPokemonCardsBySet, getFilteredCards } from "~/services/tcgapi";
import type { Card, Filters } from "~/types/interfaces";
import type { Route } from "../+types/root";
import { useEffect, useMemo, useState } from "react";
import FilterBar from "~/components/FilterBar/FilterBar";

const initialFilters: Filters = {
  series: "",
  set: "",
  category: "",
  rarity: "",
  sortedBy: ""
}

export async function loader({ params }: Route.LoaderArgs) {
  try {
    initialFilters.set = params.setId || "base1";

    return await getAllPokemonCardsBySet(initialFilters.set);

  } catch (error) {
    console.error("Error fetching Pokémon cards:", error);
    return []; 
  }
}

function filters() {
  const [pokemonCardList, setPokemonCardList] = useState<Card[]>(useLoaderData().cards || []);

  const [currentFilters, setCurrentFilters] = useState<Filters>(initialFilters);
  
  const [searchedPokemonName, setSearchedPokemonName] = useState<string>("");
  
  const [raritiesList, setRaritiesList] = useState<string[]>([]);
  
useEffect(() => {
    const uniqueRarities = [...new Set(pokemonCardList.map(card => card.rarity))];
    setRaritiesList(uniqueRarities as string[]);
  }, [pokemonCardList]);

useEffect(() => {
  const fetchCards = async () => {
    const cards = await getAllPokemonCardsBySet(currentFilters.set);
    
    /*setPokemonCardList(cards || []);*/
  };
  fetchCards();
}, [currentFilters.set]);

  const handleDeleteFromFavourites = (id: string) => {

  };
  
  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchedPokemonName(value);
  };

  const filteredPokemons = useMemo(() => {
    
    return pokemonCardList?.filter((pokemon: Card) =>
      pokemon.name.toLowerCase().startsWith(searchedPokemonName.toLowerCase()) &&
      pokemon.rarity?.includes(currentFilters.rarity)
    );
  }, [searchedPokemonName, pokemonCardList, currentFilters]);

  return (
    <main className="background-image bg-black min-h-[75vh]">
      <FilterBar 
        searchedPokemonName={searchedPokemonName} 
        handleChange={handleChangeName} 
        setFilters={setCurrentFilters} 
        filters={currentFilters}
        raritiesList={raritiesList}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 w-[80%] mx-auto py-12">
        { filteredPokemons.length > 0 ? (
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


export default filters