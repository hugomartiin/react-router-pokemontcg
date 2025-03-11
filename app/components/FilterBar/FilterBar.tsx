import React from 'react'
import type { Filters, FilterBarProps } from '~/types/interfaces'
import SeriesFilter from './SeriesFilter'
import SetsFilter from './SetFilter'
import RaritiesFilter from './RaritiesFilter'

function FilterBar({ searchedPokemonName, handleChange, setFilters, filters, raritiesList }: FilterBarProps) {
  return (
    <div className='flex flex-row gap-4 bg-primary px-12 py-4 sticky top-0 w-full z-10 justify-between items-end'>
      <SeriesFilter setFilters={setFilters} filters={filters} />
      <SetsFilter setFilters={setFilters} filters={filters} />
      <RaritiesFilter setFilters={setFilters} filters={filters} raritiesList={raritiesList} />

      <input  
        className='border-2 border-gold rounded-md p-2 text-gold h-[50px] w-[200px]' 
        type="text" 
        name="name" 
        placeholder="Pokemon name"
        value={searchedPokemonName} 
        onChange={handleChange} 
      />
    </div>
  )
}

export default FilterBar