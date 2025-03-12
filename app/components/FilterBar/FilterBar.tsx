import React from 'react'
import type { Filters, FilterBarProps } from '~/types/interfaces'
import SeriesFilter from './SeriesFilter'
import SetsFilter from './SetFilter'
import OrderByFilter from './OrderByFilter'

const OrderList = ["id", "name", "rarity", "hp", "illustrator"]
function FilterBar({ searchedPokemonName, handleChange, setFilters, filters}: FilterBarProps) {
  return (
    <div className='grid grid-cols-2 md:grid-cols-4 gap-4 bg-primary px-12 py-4 sticky top-0 w-full z-10 justify-between items-end'>
      <SeriesFilter setFilters={setFilters} filters={filters} />
      <SetsFilter setFilters={setFilters} filters={filters} />
      <OrderByFilter setFilters={setFilters} filters={filters} OrderList={OrderList} />

      <input  
        className='border-2 border-gold rounded-md p-2 text-gold h-[50px]' 
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