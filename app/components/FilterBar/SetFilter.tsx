import React, { useEffect, useState } from 'react'
import { getSets, getSetsBySeriesId } from '~/services/tcgapi';
import type { SetBrief, Filters } from '~/types/interfaces';

function SetsFilter({ setFilters, filters }: { setFilters: (filters: Filters) => void, filters: Filters }) {
    const [Sets, setSets] = useState<SetBrief[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedSet, setSelectedSet] = useState<SetBrief | null>(null);
    const [showSets, setShowSets] = useState(false);

    useEffect(() => {
      const loadSets = async () => {
          try {
              const SetsData = await getSetsBySeriesId(filters.series);
              setSets(SetsData || []);
          } catch (error) {
              console.error('Error loading Sets:', error);
          } finally {
              setIsLoading(false);
          }
      };

      loadSets();
    }, [filters.series]);

    useEffect(() => {
        if (selectedSet) {
            setFilters({ ...filters, set: selectedSet.id });
        }
    }, [selectedSet]);

    if (isLoading) {
        return <div className="animate-pulse bg-gray-300 rounded-md h-10 w-40"></div>;
    }
    
    function toggleList(){
      setShowSets(!showSets);
    }

    return (
      <div className='flex flex-col gap-2 relative'>
        <h1 className='text-white text-center text-5xl font-bold mb-4'>Set:</h1>
        
        {/*Selected Set*/}
        <div 
         className='selectedSets border-2 border-gold rounded-md p-3 h-[150px] flex flex-col items-center justify-center'
          onClick={toggleList}
        >
          {selectedSet ? (
            <>
              {selectedSet.logo ? (
                <img src={selectedSet.logo + ".webp"} alt={selectedSet?.name} className='text-center max-h-[100px] mx-auto mb-4' />
              ) : (
                <div className='w-[100px] h-[100px] bg-gray-500 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <p className='text-center text-white'>{selectedSet.name.slice(0, 2).toUpperCase() + " logo"}</p>
                </div>
              )}
              
              <p className='text-center'>{selectedSet?.name}</p>
            </>
          ) : (
            <p className='text-center text-white'>Select a Set</p>
          )}
        </div>

        {/*Sets list*/}
        <ul className={`flex flex-col ${showSets ? 'block' : 'hidden'} bg-secundary rounded-md h-[400px] overflow-y-auto absolute top-full left-0 w-full`}>
          {Sets.map((Set, index) => (
            <li
            className={`bg-black w-[100%] py-6 px-4 ${index % 2 === 0 ? "bg-black" : "bg-gray-800"}`}
            key={index}
            onClick={() => {setSelectedSet(Set); toggleList()}}
            >
              {Set.logo ? (
                <img src={Set.logo + ".webp"} alt={Set.name} className='text-center max-h-[100px] mx-auto mb-4' />
              ) : (
                <div className='w-[100px] h-[100px] bg-gray-500 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <p className='text-center text-white'>{Set.name.slice(0, 2).toUpperCase() + " logo"}</p>
                </div>
              )}
              <p className='text-center text-white'>{Set.name}</p>
            </li>
          ))}
        </ul>
      </div>
    );
}   

export default SetsFilter