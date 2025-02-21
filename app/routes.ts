import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
    layout("layouts/footer.tsx", [
        index("routes/home.tsx"),

        layout("layouts/header.tsx", [
            route("cards","routes/cards.tsx"),
            route("cards","routes/favourites.tsx"),
            route("cards","routes/series.tsx"),
            route("cards","routes/sets.tsx"),
        ]),
    ])
] satisfies RouteConfig;
