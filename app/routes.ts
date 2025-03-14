import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [

    index("routes/home/home.tsx"),
    layout("layouts/mainLayout.tsx", [
        route("filters/:setId?","routes/filters.tsx"),
        route("favourites", "routes/favourites.tsx"),
        route("series", "routes/series.tsx"),
        route("sets/:id?", "routes/sets.tsx")
    ])
] satisfies RouteConfig;
