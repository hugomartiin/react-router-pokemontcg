import React from 'react'
import type { Filters, FilterBarProps } from '~/types/interfaces'
import SeriesFilter from './SeriesFilter'
import SetsFilter from './SetFilter'
import OrderByFilter from './OrderByFilter'

const OrderList = ["id", "name", "rarity", "hp", "illustrator"]
function FilterBar({ searchedPokemonName, handleChange, setFilters, filters}: FilterBarProps) {
  return (
    <div className='grid grid-cols-2 md:grid-cols-4 gap-4 bg-primary px-12 py-4 sticky top-0 w-full z-1000 justify-between items-center'>
      <SeriesFilter setFilters={setFilters} filters={filters} />
      <SetsFilter setFilters={setFilters} filters={filters} />

      <div className='mt-6'>
        <OrderByFilter setFilters={setFilters} filters={filters} OrderList={OrderList} />
      </div>

      <div className='mt-6'>
        <h1 className='text-gold text-center text-4xl font-bold mb-6'>Pokemon name:</h1>
          <input  
            className='border-2 border-gold rounded-md p-3 text-gray-300 h-full w-full text-xl bg-secundary' 
            type="text" 
            name="name" 
            placeholder="Name..."
            value={searchedPokemonName} 
            onChange={handleChange} 
          />
        </div>
      </div>
  )
}

export default FilterBar