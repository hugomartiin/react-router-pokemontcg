import Card from "./SetCard";
import { Link } from "react-router-dom";
import type { SetBrief, SerieBrief } from "~/types/interfaces";

interface CardListProps {
    items: (SetBrief | SerieBrief)[];
    type: "set" | "series";
}

const CardList = ({ items = [], type }: CardListProps) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
            {items.length === 0 ? (
                <p className="text-white text-center col-span-full">No {type === "set" ? "Sets" : "Series"} found.</p>
            ) : (
                items.map((item) => (
                    <Link
                        to={type === "series" ? `../sets/${item.id}` : `finder/${item.id}`}
                        key={item.id}
                        className="block transform transition duration-300 hover:scale-105"
                    >
                        <Card data={item} type={type} />
                    </Link> 
                ))
            )}
        </div>
    );
};

export default CardList;
