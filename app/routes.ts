import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
    layout("layouts/footer.tsx", [
        index("routes/home.tsx"),

        layout("layouts/header.tsx", [
            route("cards","routes/cards.tsx"),
            route("favourites","routes/favourites.tsx"),
            route("series","routes/series.tsx"),
            route("sets","routes/sets.tsx"),
        ]),
    ])
] satisfies RouteConfig;
