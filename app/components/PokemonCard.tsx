import React from 'react'

interface PokemonCardProps{
    url?: string;
}

function PokemonCard({url = "img/bulbasaur.webp"}: PokemonCardProps) {
  return (
    <div className="pokemonCard">
        <img src={url} alt="" className=""/>
        <div className="starFavoriteButtonContainer">
            <a className="starFavoriteButton">
            <i className="fa-solid fa-star starFavorite"></i>
            <i className="fa-regular fa-star starFavoriteBorder"></i>
            </a>
        </div>
    </div>
  )
}

export default PokemonCard