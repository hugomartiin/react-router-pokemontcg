import { useLoaderData } from "react-router-dom";
import PokemonCard from "~/components/PokemonCard";
import { getAllPokemonCardsBySet } from "~/services/tcgapi";
import type { Card } from "~/types/interfaces";
import type { Route } from "../+types/root";

// Loader function to fetch data before rendering
export async function loader({ params }: Route.LoaderArgs) {


  try {
    return await getAllPokemonCardsBySet(params.setId || "base1");

  } catch (error) {
    console.error("Error fetching Pokémon cards:", error);
    return []; // Return empty array in case of error
  }
}

function filters() {
  const pokemonCardList = useLoaderData().cards; // Get data from loader

  const handleDeleteFromFavourites = (id: string) => {

  };
  console.log(pokemonCardList);
  return (
    <main className="background-image bg-black">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 w-[80%] mx-auto py-12">
        {pokemonCardList.length > 0 ? (
          pokemonCardList.map((card: Card) => (
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