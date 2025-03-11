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
      <div className='flex flex-col gap-2 w-[25%] relative'>
        <h1 className='text-white text-center text-5xl font-bold mb-4'>Series</h1>
        
        {/*Selected serie*/}
        <div 
         className='selectedSeries border-2 border-gold rounded-md p-3'
          onClick={toggleList}
        >
          {selectedSerie ? (
            <>
              {selectedSerie.logo ? (
                <img src={selectedSerie.logo + ".webp"} alt={selectedSerie?.name} className='text-center max-h-[100px] mx-auto mb-4' />
              ) : (
                <div className='w-[100px] h-[100px] bg-gray-500 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <p className='text-center text-white'>{selectedSerie.name.slice(0, 2).toUpperCase() + " logo"}</p>
                </div>
              )}
              
              <p className='text-center'>{selectedSerie?.name}</p>
            </>
          ) : (
            <p className='text-center text-white'>Select a serie</p>
          )}
        </div>

        {/*Series list*/}
        <ul className={`flex flex-col ${showSeries ? 'block' : 'hidden'} bg-secundary rounded-md h-[400px] overflow-y-auto absolute top-full left-0 w-full`}>
          {series.map((serie, index) => (
            <li
            className={`bg-black w-[100%] py-6 px-4 ${index % 2 === 0 ? "bg-black" : "bg-gray-800"}`}
            key={index}
            onClick={() => {setSelectedSerie(serie); toggleList()}}
            >
              {serie.logo ? (
                <img src={serie.logo + ".webp"} alt={serie.name} className='text-center max-h-[100px] mx-auto mb-4' />
              ) : (
                <div className='w-[100px] h-[100px] bg-gray-500 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <p className='text-center text-white'>{serie.name.slice(0, 2).toUpperCase() + " logo"}</p>
                </div>
              )}
              <p className='text-center text-white'>{serie.name}</p>
            </li>
          ))}
        </ul>
      </div>
    );
}   

export default SeriesFilter