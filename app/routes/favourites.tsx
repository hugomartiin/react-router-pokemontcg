import PokemonCard from '~/components/PokemonCard'
import { getAllFavorites } from '~/services/favouriteapi'

function favourites() {
  return (
    <main className='w-[90%] mx-auto my-12'>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8'>
        <PokemonCard />
        <PokemonCard />
        <PokemonCard />
        <PokemonCard />
        <PokemonCard />
      </div>
      {/* {pokemonCardList.map(card =)} */}
    </main>
  )
}

export default favourites