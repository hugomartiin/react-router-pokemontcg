import { useLoaderData } from "react-router-dom";
import PokemonCard from "~/components/PokemonCard";
import { getAllPokemonCardsBySet, getFilteredCards } from "~/services/tcgapi";
import type { Card, Filters } from "~/types/interfaces";
import type { Route } from "../+types/root";
import { useEffect, useMemo, useState } from "react";
import FilterBar from "~/components/FilterBar/FilterBar";
import { getAllFavourites } from "~/services/favouriteapi";
import { Bounce, toast, ToastContainer } from "react-toastify";

const initialFilters: Filters = {
  series: "",
  set: "",
  category: "",
  rarity: "",
  orderBy: ""
}

export async function loader({ params }: Route.LoaderArgs) {
  try {
    return params.setId || "base1";
  } catch (error) {
    console.error("Error fetching Pokémon cards:", error);
    return []; 
  }
}

function filters() {
  const parameterSet = useLoaderData();
  const [pokemonCardList, setPokemonCardList] = useState<Card[]>([]);
  const [currentFilters, setCurrentFilters] = useState<Filters>(initialFilters);
  const [searchedPokemonName, setSearchedPokemonName] = useState<string>("");
  
  const setId = useLoaderData();
  currentFilters.set = setId;

  useEffect(() => {
    const fetchCards = async () => {
      const cards = await getAllPokemonCardsBySet(currentFilters.set || "base1");
      setPokemonCardList(cards || []);
    };
    
    fetchCards();
  }, [currentFilters.set]); 

  const handleFilterChange = async (newFilters: Filters) => {
    setCurrentFilters(newFilters);
    const cards = await getFilteredCards(newFilters.set, newFilters.orderBy);
    setPokemonCardList(cards || []);
  };

  const handleOrderByChange = async (orderBy: string) => {
    const newFilters = { ...currentFilters, orderBy };
    setCurrentFilters(newFilters);
    const cards = await getFilteredCards(newFilters.set, newFilters.orderBy);
    setPokemonCardList(cards || []);
  };

  const handleDeleteFromFavourites = (id: string) => {};
  
  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchedPokemonName(value);
  };

  const filteredPokemons = useMemo(() => {
    return pokemonCardList.filter((pokemon: Card) =>
      (pokemon.name.toLowerCase().startsWith(searchedPokemonName.toLowerCase()))
    );
  }, [searchedPokemonName, pokemonCardList, currentFilters]);

  return (
    <main className="background-image bg-black min-h-[75vh]">
      <FilterBar 
        searchedPokemonName={searchedPokemonName} 
        handleChange={handleChangeName} 
        setFilters={handleFilterChange}
        filters={currentFilters}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 w-[80%] mx-auto py-12">
        { filteredPokemons.length > 0 ? (
          filteredPokemons.map((card: Card) => (
            <PokemonCard key={card.id} card={card} canAddToFavourites={true} onDeleteFromFavourites={handleDeleteFromFavourites}/>
          ))
        ) : (
          <p className="text-white text-center col-span-full">No Pokémon cards found.</p>
        )}
      </div>
    </main>
    
  );
}

export default filters;