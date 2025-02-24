import type { SetBrief, SerieBrief } from "../types/interfaces";

interface CardProps {
    data: SetBrief | SerieBrief;
    type: "set" | "series";
}

function Card({ data, type }: CardProps) {
    return (
        <div className="bg-purple-300 rounded-2xl shadow-lg p-6 text-center w-64 border border-gray-200 h-50">
            <div className="flex justify-center">
                {data.logo ? (
                    <img src={`${data.logo}.webp`} alt={data.name} className="w-24 h-24 object-contain" />
                ) : (
                    <div className="w-24 h-24 flex items-center justify-center bg-black text-white rounded-full text-xl font-bold">
                        {type === "set" ? "SET" : "SERIE"}
                    </div>
                )}
            </div>
            <h3 className="text-xl font-bold mt-4 text-gray-900">{data.name}</h3>
        </div>
    );
}

export default Card;
