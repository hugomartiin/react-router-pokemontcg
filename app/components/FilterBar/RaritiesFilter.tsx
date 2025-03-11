import React, { useEffect, useState } from 'react'
import type { Filters } from '~/types/interfaces';

function RaritiesFilter({ setFilters, filters, raritiesList }: { setFilters: (filters: Filters) => void, filters: Filters, raritiesList: string[] }) {
    const [selectedRarity, setSelectedRarity] = useState<string | null>(null);
    const [showRarities, setShowRarities] = useState(false);

    useEffect(() => {
        if (selectedRarity) {
            setFilters({ ...filters, rarity: selectedRarity });
        }
    }, [selectedRarity]);
    
    function toggleList(){
      setShowRarities(!showRarities);
    }

    return (
      <div className='flex flex-col gap-2 w-[25%] relative'>
        <h1 className='text-white text-center text-5xl font-bold mb-4'>Rarities</h1>
        
        {/*Selected Rarity*/}
        <div 
         className='selectedRarities border-2 border-gold rounded-md p-3'
          onClick={toggleList}
        >
          {selectedRarity ? (
            <p className='text-center'>{selectedRarity}</p>
          ) : (
            <p className='text-center text-white'>All</p>
          )}
        </div>

        {/*Rarities list*/}
        <ul className={`flex flex-col ${showRarities ? 'block' : 'hidden'} bg-secundary rounded-md 
            overflow-y-auto absolute top-full left-0 w-full`}>
          
            <li
                className={`bg-gray-800 w-[100%] py-6 px-4 `}
                key={0}
                onClick={() => {setSelectedRarity(""); toggleList()}}
                >
                <p className='text-center text-white'>All</p>
            </li>
          
          {raritiesList.map((rarity, index) => (
            <li
            className={`w-[100%] py-6 px-4 ${index % 2 === 0 ? "bg-black" : "bg-gray-800"}`}
            key={index}
            onClick={() => {setSelectedRarity(rarity); toggleList()}}
            >
              <p className='text-center text-white'>{rarity}</p>
            </li>
          ))}
        </ul>
      </div>
    );
}   

export default RaritiesFilter