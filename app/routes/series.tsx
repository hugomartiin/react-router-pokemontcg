import React, { useState, useMemo, useEffect } from "react";
import { getSeries } from "../services/tcgapi";
import CardList from "../components/CardList";

import type { SerieBrief } from "../types/interfaces";
import { useLoaderData } from "react-router";

export async function clientLoader() {
  try {
    const series: SerieBrief[] = (await getSeries()) ?? [];
    return { series: series };
  } catch (error) {
    console.error("Error fetching all series:", error);
    return { series: [] };
  }
}

export function HydrateFallback() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
      <div className="flex justify-center items-center">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
      <p className="mt-4 text-lg">Loading Series...</p>
    </div>
  );
}

function Series() {
  const loaderData: { series: SerieBrief[] } = useLoaderData();
  const series = loaderData.series;

  return (
    <div className="background-image flex flex-col items-center justify-center text-white transition-colors duration-500 bg-black min-h-[75vh]">

      <h1 className="pt-5 text-4xl font-bold mb-4">All Series</h1>

      <CardList items={series} type="series" />

    </div>
  );
}

export default Series;