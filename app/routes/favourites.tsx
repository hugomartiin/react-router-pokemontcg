import { useState, useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import PokemonCard from '~/components/PokemonCard';
import { getAllFavourites } from '~/services/favouriteapi';
import type { Card } from '~/types/interfaces';

export async function loader() {
  try {
    const data = await getAllFavourites();
    return data;
  } catch (error) {
    console.error('Error fetching Pokémon cards:', error);
    return { favourites: [] };
  }
}

function Favourite() {
  const [favourites, setFavourites] = useState<Card[]>(useLoaderData() as Card[]);

  const handleDeleteFromFavourites = (id: string) => {
    setFavourites((prevFavourites) => prevFavourites.filter((card) => card.id !== id));
  };

  return (
    <main className="background-image bg-black h-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 w-[80%] mx-auto py-12">
        {favourites.length > 0 ? (
          favourites.map((card: Card) => (
            <PokemonCard
              key={card.id}
              card={card}
              canAddToFavourites={false} // Solo eliminación en la página de favoritos
              onDeleteFromFavourites={handleDeleteFromFavourites} // Pasamos la función para actualizar el estado
            />
          ))
        ) : (
          <p className="text-white text-center col-span-full">No Pokémon cards found.</p>
        )}
      </div>
    </main>
  );
}

export default Favourite;
