import React from 'react'
import { Link } from 'react-router'
import Button from './general/button';

interface CardHomeProps {
    title: string;
    description: string;
    routeLink: string;
    textButton: string;
    imgLink: string;
}

function CardHome({title, description, routeLink, textButton, imgLink}: CardHomeProps) {
  return (
    <div className="cardHome mt-0 flex flex-col bg-primary shadow-2xl rounded-2xl">
        <img className="w-[100%] rounded-t-2xl" src={`${imgLink}`} alt="Title" />
        <div className="text-center text-white p-4 flex flex-col gap-4 justify-between h-full">
            <h4 className="text-2xl">{title} </h4>
            <div>
              <p className=""> {description}</p>
              <Button routeLink={routeLink} textButton={textButton} />
            </div>
        </div>
    </div>
  )
}

export default CardHome