import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [

    //Para testear
    // layout("layouts/footer.tsx", [

    //     layout("layouts/header.tsx", [
    //         index("routes/home.tsx"),
    //             route("cards","routes/cards.tsx"),
    //             route("favourites","routes/favourites.tsx"),
    //             route("series","routes/series.tsx"),
    //             route("sets","routes/sets.tsx"),
    //     ]),
    // ])

    
    //Rutas finales

    index("routes/home/home.tsx"),
    layout("layouts/mainLayout.tsx", [
        route("filters/:setId?","routes/filters.tsx"),
        route("favourites", "routes/favourites.tsx"),
        route("series", "routes/series.tsx"),
        route("sets/:id?", "routes/sets.tsx")
    ])
] satisfies RouteConfig;
