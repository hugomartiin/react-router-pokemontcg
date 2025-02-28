const API_URL = "http://localhost:5000";

import type { Card } from "../types/interfaces";

export async function getAllFavorites(): Promise<Card[] | null> {
    try {
        const response = await fetch(`${API_URL}/favorites`);
        if (!response.ok) throw new Error("Error fetching favorites");

        return await response.json();
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
}

export async function postCardToFavorites(card: Card): Promise<Card> {
    try {
        const response = await fetch(`${API_URL}/favorites`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(card),
        });

        if (!response.ok) throw new Error(`Error: ${response.statusText}`);

        return await response.json();
    } catch (error) {
        console.error("Post Data Error:", error);
        throw error;
    }
}

export async function deleteCardFromFavorites(idCard: string): Promise<void> {
    try {
        const response = await fetch(`${API_URL}/favorites/${idCard}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) throw new Error(`Error: ${response.statusText}`);
    } catch (error) {
        console.error("Delete Data Error:", error);
        throw error;
    }
}
