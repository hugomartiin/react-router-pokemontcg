import React, { useState, useMemo, useEffect } from "react";
import { getSets, getSetsBySeriesId, getSeriesById } from "../services/tcgapi";
import CardList from "../components/CardList";

import type { SerieBrief, SetBrief } from "../types/interfaces";
import { useLoaderData, useParams } from "react-router";
import Series from "./series";

// **Loader function for React Router**

export async function clientLoader({ params }: { params: { id?: string } }) {
  try {
    if (params.id) {
      const seriesData = await getSeriesById(params.id);
      const sets: SetBrief[] = await getSetsBySeriesId(params.id);
      return { name: (seriesData?.name ?? params.id).toLowerCase(), sets };
    } else {
      const sets: SetBrief[] = await getSets() ?? [];
      return { name: null, sets };
    }
  } catch (error) {
    console.error("Error fetching sets:", error);
    return { name: "Unknown", sets: [] };
  }
}



// HydrateFallback is rendered while the client loader is running
export function HydrateFallback() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <div className="flex justify-center items-center">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
      <p className="mt-4 text-lg">Loading Sets...</p>
    </div>
  );
}

function Sets() {
  const { name, sets } = useLoaderData() as { name: string; sets: SetBrief[] };
  const { id } = useParams();

  return (
    <div className="background-image flex flex-col items-center justify-center text-white transition-colors duration-500 bg-black">

      <h1 className=" pt-5 text-4xl font-bold mb-4 text-white">{name ? `Sets from the serie ${name}` : "All Sets"}</h1>
      <CardList items={sets} type="set" />

    </div>
  );
}

export default Sets;