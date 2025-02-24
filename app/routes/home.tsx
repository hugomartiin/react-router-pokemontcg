import type { Route } from "./+types/home";
import Header from "../layouts/header";
import Footer from "../layouts/footer";
export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return <div>
    <Header />
  </div>;

}
