import React from 'react'
import type { Filters } from '~/types/interfaces'

function FilterBar({filters, handleChange}: {filters: Filters, handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void}) {
  return (
    <div className='flex flex-row gap-4 bg-primary p-4 sticky top-0 w-full z-10'>
        <input className='border-2 border-gray-300 rounded-md p-2 justify-self-end' type="text" name="name" value={filters.name} onChange={handleChange} />
    </div>
  )
}

export default FilterBar