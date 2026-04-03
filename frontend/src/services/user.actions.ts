"use server";

const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api/v1";

export async function getSuggestedPeople(type?: "SUGGESTED" | "YOU_MIGHT_LIKE") {
    try {
        const url = type ? `${BASE_API_URL}/users/suggested?type=${type}` : `${BASE_API_URL}/users/suggested`;
        const res = await fetch(url, { cache: "no-store" });
        const { data } = await res.json();
        return data || [];
    } catch (error) {
        console.error("Error fetching suggested people:", error);
        return [];
    }
}
