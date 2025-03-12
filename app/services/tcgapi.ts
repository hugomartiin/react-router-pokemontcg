import type {
    Card,
    SerieBrief,
    SetBrief
} from "../types/interfaces.ts";

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

export async function getPokemonCardsById(id: string): Promise<Card | null> {
    try {
        const response = await fetch(`${API_URL}/cards/${id}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
}

export async function getSeries(): Promise<SerieBrief[] | null> {
    try {
        const response = await fetch(`${API_URL}/series`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
}

export async function getSeriesById(id: string): Promise<SerieBrief | null> {
    try {
        const response = await fetch(`${API_URL}/series/${id}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
}

export async function getSets(): Promise<SetBrief[] | null> {
    try {
        const response = await fetch(`${API_URL}/sets`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
}

export async function getSetsBySeriesId(id: string): Promise<SetBrief[]> {
    try {
        const response = await fetch(`${API_URL}/series/${id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return Array.isArray(data.sets) ? data.sets : [];
    } catch (error) {
        console.error("Error fetching sets by series ID:", error);
        return [];
    }
}

export async function getFilteredCards(
    set: string = "base1",
    name: string = "",
    category: string = "",
    rarity: string = "",
    sortedBy: string = ""
): Promise<Card[] | null> {
    try {
        const endPoint = `${API_URL}/cards?id=like:${set}-&name=like:${name}&category=like:${category}&rarity=like:${rarity}&sort:field=${sortedBy}&sort:order=ASC`;
        const response = await fetch(endPoint);
        const data = await response.json();
        console.log(data);

        return data;
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
}

export async function getCardCount(cardSet: string): Promise<number | null> {
    try {
        const response = await fetch(`${API_URL}/sets/${cardSet}`);
        const data: SetBrief = await response.json();
        return data.cardCount.official;
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
}

export async function getRarities(cardSet: string): Promise<string[]> {
    try {
        const count = await getCardCount(cardSet);
        if (!count) return [];

        const rarities = new Set<string>();
        const limitCount = count / 2;
        const urls: string[] = [];

        for (let index = 1; index < limitCount; index++) {
            let apiUrl = `${API_URL}/cards/${cardSet}-${index}`;
            if (["a1", "sv-01", "sv-02", "sv-03", "sv03.5"].includes(cardSet.toLowerCase())) {
                apiUrl = `${API_URL}/cards/${cardSet}-${index.toString().padStart(3, "0")}`;
            } else if (["smp", "bwp"].includes(cardSet.toLowerCase())) {
                apiUrl = `${API_URL}/cards/${cardSet}-SM${index.toString().padStart(2, "0")}`;
            }
            urls.push(apiUrl);
        }

        const responses = await Promise.all(urls.map((url) => fetch(url)));

        for (const response of responses) {
            if (!response.ok) {
                console.warn(`Error en la URL ${response.url}: ${response.statusText}`);
                continue;
            }
            const cardData: Card = await response.json();
            if (cardData.rarity) {
                rarities.add(cardData.rarity);
            }
        }

        return [...rarities];
    } catch (error) {
        console.error("Error en getRarities:", error);
        return [];
    }
}
