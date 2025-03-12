import { useState, useEffect } from 'react';
import type { Card } from '~/types/interfaces';
import { postCardToFavourites, deleteCardFromFavourites } from '~/services/favouriteapi';
import { Bounce, toast, ToastContainer } from 'react-toastify';

interface PokemonCardProps {
  card: Card;
  canAddToFavourites: boolean; // Prop that controls if it can be added to favorites
  onDeleteFromFavourites: (id: string) => void; // Prop to handle deletion from the parent
}

const PokemonCard: React.FC<PokemonCardProps> = ({ card, canAddToFavourites, onDeleteFromFavourites }) => {
  const [isFavourite, setIsFavourite] = useState(false);
  
  const notify = () => toast("Wow so easy!");

  useEffect(() => {
    setIsFavourite(false);
  }, [card]);

  const handleFavouriteClick = async () => {
    try {
      if (!canAddToFavourites) {
        // If we are on the favorites page, we remove the card
        await deleteCardFromFavourites(card.id);
        console.log('Card removed from favorites');
        onDeleteFromFavourites(card.id); // Directly remove the card from the parent's state
        setIsFavourite(false); // Update the state
        
      } else {
        // If we are on a page where it can be added, add or remove from favorites
        if (isFavourite) {
          await deleteCardFromFavourites(card.id); // Remove from favorites
          console.log('Card removed from favorites');
          setIsFavourite(false);
          notify();
        } else {
          await postCardToFavourites(card); // Add to favorites
          console.log('Card added to favorites');
          setIsFavourite(true);
          notify();
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
      <ToastContainer
      />
    </div>
  );
};

export default PokemonCard;
