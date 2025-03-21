import React, { useEffect, useState } from 'react'
import { getSeries } from '~/services/tcgapi';
import type { Filters, SerieBrief, SeriesFilterProps } from '~/types/interfaces';

function SeriesFilter({ setFilters, filters }: SeriesFilterProps) {
    const [series, setSeries] = useState<SerieBrief[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedSerie, setSelectedSerie] = useState<SerieBrief | null>(null);
    const [showSeries, setShowSeries] = useState(false);

    useEffect(() => {
        const loadSeries = async () => {
            try {
                const seriesData = await getSeries();
                setSeries(seriesData || []);
            } catch (error) {
                console.error('Error loading series:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadSeries();
    }, []);

    useEffect(() => {
        if (selectedSerie) {
            setFilters({ ...filters, series: selectedSerie.id });
        }
    }, [selectedSerie]);

    if (isLoading) {
        return <div className="animate-pulse bg-gray-300 rounded-md h-10 w-40"></div>;
    }
    
    function toggleList(){
      setShowSeries(!showSeries);
    }

    return (
      <div className='flex flex-col gap-2 relative'>
        <h1 className='text-gold text-center text-4xl font-bold mb-4'>Serie:</h1>
        
        {/*Selected serie*/}
        <div 
         className='selectedSeries border-2 border-gold rounded-md p-3 h-[150px] flex flex-col items-center hover:cursor-pointer justify-center max-h-[100%] bg-secundary'
          onClick={toggleList}
        >
          {selectedSerie ? (
            <>
              {selectedSerie.logo ? (
                <img src={selectedSerie.logo + ".webp"} alt={selectedSerie?.name} className='text-center max-h-[100px] mx-auto mb-4  min-w-[50%]' />
              ) : (
                <div className='w-[100px] h-[100px] bg-gray-500 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <p className='text-center text-white'>{selectedSerie.name.slice(0, 2).toUpperCase() + " logo"}</p>
                </div>
              )}
              
              <p className='text-center text-xl'>{selectedSerie?.name}</p>
            </>
          ) : (
            <p className='text-center text-white text-xl'>Select a serie</p>
          )}
        </div>

        {/*Series list*/}
        <ul className={`flex flex-col ${showSeries ? 'block' : 'hidden'} bg-secundary rounded-md z-1000 h-[700px] overflow-y-auto absolute top-full left-0 w-full`}>
          {series.map((serie, index) => (
            <li
            className={`bg-black w-[100%] py-6 px-4 ${index % 2 === 0 ? "bg-black" : "bg-gray-800"} hover:cursor-pointer hover:bg-gray-500 transition-colors duration-300`}
            key={index}
            onClick={() => {setSelectedSerie(serie); toggleList()}}
            >
              {serie.logo ? (
                <img src={serie.logo + ".webp"} alt={serie.name} className='text-center max-h-[150px] mx-auto mb-4 min-w-[50%]' />
              ) : (
                <div className='w-[100px] h-[100px] bg-primary rounded-full flex items-center justify-center mx-auto mb-4'>
                  <p className='text-center text-white'>{serie.name.slice(0, 3).toUpperCase() + " logo"}</p>
                </div>
              )}
              <p className='text-center text-white text-xl'>{serie.name}</p>
            </li>
          ))}
        </ul>
      </div>
    );
}   

export default SeriesFilter