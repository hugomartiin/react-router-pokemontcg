import PokemonCard from '~/components/PokemonCard';
import { getAllFavourites } from '~/services/favouriteapi';
import { useLoaderData } from "react-router-dom";
import type { Card } from "~/types/interfaces";

export async function loader() {
  try {
    const data = await getAllFavourites();
    return data;
  } catch (error) {
    console.error("Error fetching Pokémon cards:", error);
    return { favourites: [] };
  }
}

function Favourite() {
  const favourites = useLoaderData();

  console.log(favourites);

  return (
    <main className="background-image bg-black  min-h-[75vh]">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 w-[80%] mx-auto py-12">
        {favourites != null ? (
          favourites.map((card: Card) => (
            <PokemonCard key={card.id} url={`${card.image}/high.webp`} />
          ))
        ) : (
          <p className="text-white text-center col-span-full">No Pokémon cards found.</p>
        )}
      </div>
    </main>
  );
}

export default Favourite;
