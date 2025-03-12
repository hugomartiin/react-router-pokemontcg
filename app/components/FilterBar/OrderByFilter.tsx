import React, { useEffect, useState } from 'react'
import type { Filters } from '~/types/interfaces';

function OrderByFilter({ setFilters, filters, OrderList }: { setFilters: (filters: Filters) => void, filters: Filters, OrderList: string[] }) {
    const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
    const [showOrder, setShowOrder] = useState(false);

    useEffect(() => {
        if (selectedOrder) {
            setFilters({ ...filters, orderBy: selectedOrder });
            console.log(filters);
        }
    }, [selectedOrder]);
    
    function toggleList(){
      setShowOrder(!showOrder);
    }

    return (
      <div className='flex flex-col gap-2 relative'>
        <h1 className='text-white text-center text-5xl font-bold mb-4'>Order by:</h1>
        
        {/*Selected Order*/}
        <div 
         className='selectedOrder border-2 border-gold rounded-md p-3'
          onClick={toggleList}
        >
          {selectedOrder ? (
            <p className='text-center'>{selectedOrder}</p>
          ) : (
            <p className='text-center text-white'>All</p>
          )}
        </div>

        {/*Order list*/}
        <ul className={`flex flex-col ${showOrder ? 'block' : 'hidden'} bg-secundary rounded-md 
            overflow-y-auto absolute top-full left-0 w-full`}>
          
            <li
                className={`bg-gray-800 w-[100%] py-6 px-4 `}
                key={0}
                onClick={() => {setSelectedOrder("All"); toggleList()}}
                >
                <p className='text-center text-white'>All</p>
            </li>
          
          {OrderList.map((Order, index) => (
            <li
            className={`w-[100%] py-6 px-4 ${index % 2 === 0 ? "bg-black" : "bg-gray-800"}`}
            key={index}
            onClick={() => {setSelectedOrder(Order); toggleList()}}
            >
              <p className='text-center text-white'>{Order}</p>
            </li>
          ))}
        </ul>
      </div>
    );
}   

export default OrderByFilter