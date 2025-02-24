import CardHome from "~/components/CardHome";
// import type { Route } from "../+types/home";
import "./style.css";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "React Pokemon TCG" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <main className="homePage py-12 bg-black h-[100vh]">
      <img src="img/logo.png" alt="logo" className="w-[20%] mx-auto" />
      <div className="grid grid-cols-3 gap-12 p-12 mx-auto w-[80%] ">
        <CardHome 
          title="WATCH ALL THE SERIES AND SETS" 
          description="Have a look at the series and sets, or be melancholic and see the old ones" 
          routeLink="series" 
          textButton="SEE SERIES AND SETS" 
          imgLink="img\SETS.png" 
        />

        <CardHome 
          title="WATCH YOUR FAVOURITES CARDS." 
          description="Add and remove your favourite cards to have fast access to them." 
          routeLink="favourites" 
          textButton="SEE FAVS" 
          imgLink="img\FAVOURITES.png" 
        />

        <CardHome 
          title="FILTER TO SEARCH FOR SPECIFIC POKEMONS" 
          description="Check if there are pokemon cards for what you are looking for." 
          routeLink="cards" 
          textButton="SEE FILTERS" 
          imgLink="img\COLLECTIONS.png" 
        />
      </div>
    </main>
  )
}
