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

      <div className='mt-6'>
        <OrderByFilter setFilters={setFilters} filters={filters} OrderList={OrderList} />
      </div>

      <div className='mt-6'>
      <h1 className='text-white text-center text-4xl font-bold mb-4'>Pokemon name:</h1>
          <input  
            className='border-2 border-gold rounded-md p-2 text-gold h-[50px] w-full' 
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