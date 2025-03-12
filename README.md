# Pokemon TCG Explorer 
<img src="public/img/logo.png" alt="logo" style="width:80px;"></img>

### Authors: Aitor and Hugo

## Overview.

The main purpose of the app is to:

- Show Pokémon cards from the TCG card game.
- Filter cards by series and sets.
- Add your favorite cards to a private **Favorites** list via a custom API.

We use a JSON server to save the favorites data in the `db.json` file.

### Objetives

 - Implement a React application with client-side routing.

 - Fetch and display data from the Pokémon TCG API.

 - Provide an intuitive user experience with a clean UI using Tailwind CSS.

### Features 
  - Search all the series and sets of Pokemon Tcg
  - Watch all the cards of the sets you want
  - Store in favourites the cards you want

### Figma

[![View on Figma](https://img.shields.io/badge/Figma-Design-orange)](https://www.figma.com/file/U9Uw8hBSiImSOBgG1noTG3?node-id=0-1&node-type=canvas&t=3iHbTJjqZlu3LWl0-0&type=design&mode=design&fuid=1418561696904566261)


### Repository

[![View on GitHub](https://img.shields.io/badge/GitHub-%23121011.svg?logo=github&logoColor=white)](https://www.figma.com/design/zqSzAt5EVJxvH1gU6si9IB/AjaxProject?node-id=1-2&t=KPvYhecE4wfUOneZ-0)

## API Integration

### API Name: TCG dex.

#### Link: [API Url](https://tcgdex.dev/)

#### API Structure:

| **Endpoint**       | **Method** | **Description**                                       | **Example**                                           |
| ------------------ | ---------- | ----------------------------------------------------- | ----------------------------------------------------- |
| `/series`          | `GET`      | Retrieves a list of all series available in the TCG.  | [Example](https://api.tcgdex.net/v2/en/series)        |
| `/series/{series}` | `GET`      | Fetches detailed information about a specific series. | [Example](https://api.tcgdex.net/v2/en/series/base)   |
| `/sets`            | `GET`      | Retrieves all card sets in the TCG.                   | [Example](https://api.tcgdex.net/v2/en/sets)          |
| `/sets/{set}`      | `GET`      | Fetches cards within a specific set.                  | [Example](https://api.tcgdex.net/v2/en/sets/base1)    |
| `/cards/{cardId}`  | `GET`      | Retrieves details for a specific card by its ID.      | [Example](https://api.tcgdex.net/v2/en/cards/base1-4) |
| `/illustrators`    | `GET`      | Lists all illustrators of TCG cards.                  | [Example](https://api.tcgdex.net/v2/en/illustrators)  |
| `/cards?id=like:${setId}&name=like:${pokemonName}&rarity=like:${rarityOfCard}&sort:field=${field}`    | `GET`      | Filter cards by different parameters                  | [Example](https://api.tcgdex.net/v2/en/cards?id=like:A1&name=like:pikachu&category=like:pokemon&rarity=like:Rare&sort:field=illustrator)  |

#### Access: We access to the API through the PokemonTCG.js file, where we find the different methods to obtain the information.

We made the fetch with Async/Await.

```javascript
const API_URL = "https://api.tcgdex.net/v2/en";

export async function getAllPokemonCardsBySet(set: string): Promise<Card[] | null> {
    try {
        const response = await fetch(`${API_URL}/sets/${set}`);
        const data = await response.json();
        return data.cards;
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
} 
```

In this file we have 9 functions to get the information we need to filter.

```javascript
export async function getAllPokemonCardsBySet(set: string): Promise<Card[] | null> { ...
}

export async function getPokemonCardsById(id: string): Promise<Card | null> { ...
}

export async function getSeries(): Promise<SerieBrief[] | null> { ...
}

export async function getSeriesById(id: string): Promise<SerieBrief | null> { ...
}

export async function getSets(): Promise<SetBrief[] | null> { ...
}

export async function (id: string): Promise<SetBrief[]> { ...
}

export async function getFilteredCards(
    set: string = "base1",
    name: string = "",
    category: string = "",
    rarity: string = "",
    sortedBy: string = ""
): Promise<Card[] | null> { ...
}

export async function getCardCount(cardSet: string): Promise<number | null> {

}

export async function getRarities(cardSet: string): Promise<string[]> { ...
  }
```

### API Name: Favorite cards (local API).

#### API Structure:

| **Endpoint**       | **Method** | **Description**                                       | **Example**                                           |
| ------------------ | ---------- | ----------------------------------------------------- | ----------------------------------------------------- |
| `/favorites`          | `GET`      | Retrieves a list of all favorite cards in the API  | [Example](http://localhost:3000/favorites)        |
| `/favorites`          | `POST`      | Adds a new card to favorites | [Example](http://localhost:3000/favorites)        |
| `/favorites/{cardId}`  | `DELETE`      | Delete a card with the specified id    | [Example](http://localhost:3000/favorites/A1-101) |

#### Access: We access to the API through the collectionAPI.js file, where we find the different methods to obtain the information.

We made the fetch with Async/Await.

```javascript
const API_URL = "http://localhost:5000";

import type { Card } from "../types/interfaces";

export async function getAllFavourites(): Promise<Card[] | null> {
    try {
        const response = await fetch(`${API_URL}/favourites`);
        if (!response.ok) throw new Error("Error fetching favorites");

        return await response.json();
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
}
```

In this file we have 3 functions to get, post and delete cards on the API.

```javascript
export async function getAllFavorites(){
}

export async function postCardToFavorites(card) {
}

export async function deleteCardFromFavorites(idCard) {
}
```



## App functionality



## Set Up and Run the Application


To run the project locally, follow these steps:

``` bash
git clone https://github.com/hugomartiin/react-router-pokemontcg
cd react-router-pokemontcg
```

### 2.Install dependencies:

``` bash
npm install
```
### 3.Run the JSON server (for Favorites API):

```bash
json-server --watch app/services/db.json --port 5000
```
### 4.Start the app:

```bash
npm run dev
```


## Usage Guide
 - You can search cards by the filter page or selecting the sets by all the sets or a specific series
 - Once you choose a series in the serie page, it shows all the sets of that serie. Then if you click one sets it will send you to the filter page with all the cards of that set
 - Or you can go straight to the filter page and use the filter to see what you want
 - In the filter page by point to one card you can add it to your favourites by click the star.
 - In the favourite page you can delete one card by clicking on the trash logo.

 ## Implementation Notes

The application is structured into different reusable components:

- **FilterBar.tsx** – Manages the filtering bar for the card list.
- **OrderByFilter.tsx** – Allows ordering Pokémon cards based on different criteria.
- **SeriesFilter.tsx** – Provides a filter option for selecting Pokémon card series.
- **SetFilter.tsx** – Filters Pokémon cards by their respective set.
- **CardHome.tsx** – Displays featured cards on the homepage.
- **CardList.tsx** – Renders a list of Pokémon cards fetched from the API.
- **Footer.tsx** – Displays the footer.
- **PokemonCard.tsx** – Component for rendering individual Pokémon card.
- **SetCard.tsx** – Display the set or serie cards.
- **ToastNotification.tsx** – Handles notifications for user actions of favourites section.

