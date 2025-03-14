import { useState, useEffect } from 'react';
import type { Card } from '~/types/interfaces';
import { postCardToFavourites, deleteCardFromFavourites } from '~/services/favouriteapi';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import ToastNotification  from './ToastNotification';

interface PokemonCardProps {
  card: Card;
  canAddToFavourites: boolean; 
  onDeleteFromFavourites: (id: string) => void; 
}

const PokemonCard: React.FC<PokemonCardProps> = ({ card, canAddToFavourites, onDeleteFromFavourites }) => {
  const [isFavourite, setIsFavourite] = useState(false);
  
  const notifyAddedToFavourites = () => toast(
    <div className='text-center'>
      <img src={`${card.image}/high.webp`} alt={card.name} className="w-24 mx-auto " />
      <p className='mt-3'>Card {card.name} has been added to favorites.</p>
    </div>
  );

  const notifyRemovedFromFavourites = () => toast(
    <div className='text-center'>
      <img src={`${card.image}/high.webp`} alt={card.name} className="w-24 mx-auto " />
      <p className='mt-3'>Card {card.name} has been removed from favorites.</p>
    </div>
  );

  useEffect(() => {
    setIsFavourite(false);
  }, [card]);

  const handleFavouriteClick = async () => {
    try {
      if (!canAddToFavourites) {
        await deleteCardFromFavourites(card.id);
        console.log('Card removed from favorites');
        onDeleteFromFavourites(card.id); 
        setIsFavourite(false); 
      } else {
        if (isFavourite) {
          await deleteCardFromFavourites(card.id);
          console.log('Card removed from favorites');
          setIsFavourite(false);
          notifyRemovedFromFavourites();
        } else {
          await postCardToFavourites(card); 
          console.log('Card added to favorites');
          setIsFavourite(true);
          notifyAddedToFavourites();
        }
      }
    } catch (error) {
      console.error('Error handling favorites:', error);
    }
  };

  return (
    <div className="pokemonCard relative group">
      <img src={`${card.image}/high.webp`} alt={card.name} className="w-full h-auto" />
      <div className="starFavoriteButtonContainer absolute bottom-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <a className="starFavoriteButton relative" onClick={handleFavouriteClick}>
          {canAddToFavourites ? (
            <img src="../../img/star.png" className="w-12" alt="Add to favorites" />
          ) : (
            <img src="../../img/trash.png" className="w-12" alt="Remove from favorites" />
          )}
        </a>
      </div>
    </div>
  );
};

export default PokemonCard;
