import React from 'react'
import type { Filters } from '~/types/interfaces'

function FilterBar({ searchedPokemonName, handleChange }: { searchedPokemonName: string, handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
  return (
    <div className='flex flex-row gap-4 bg-primary p-4 sticky top-0 w-full z-10 justify-center'>
      <input className='border-2 border-gray-300 rounded-md p-2 text-gold' type="text" name="name" value={searchedPokemonName} onChange={handleChange} />
    </div>
  )
}

export default FilterBar