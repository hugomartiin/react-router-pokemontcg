import React, { useState, useMemo, useEffect } from "react";
import { getSets, getSetsBySeriesId } from "../services/tcgapi";
import CardList from "../components/CardList";

import type { SerieBrief, SetBrief } from "../types/interfaces";
import { useLoaderData, useParams } from "react-router";
import Series from "./series";

// **Loader function for React Router**

export async function clientLoader({ params }: { params: { id?: string } }) {

  try {
    const sets: SetBrief[] = params.id
      ? (await getSetsBySeriesId(params.id)) ?? []
      : (await getSets()) ?? [];
    return { sets };
  } catch (error) {
    console.error("Error fetching sets:", error);
    return { sets: [] };
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
  const loaderData: { sets: SetBrief[] } = useLoaderData();
  const { sets } = loaderData;
  const {id} = useParams();
  
  return (
    <div className="flex flex-col items-center justify-center text-white transition-colors duration-500">

      <h1 className="text-2xl font-bold mb-4">{id ? `Sets from the serie ${id}` : "All Sets"}</h1>
      <CardList items={sets} type="set" />

    </div>
  );
}

export default Sets;