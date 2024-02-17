/**
 * Generate random color
 * @returns random color
 */
export function getRandomColor(): string {
    // NOTE: Personally selected from colorhunt.io
    const palettes = [
        "#294B29", "#50623A", "#789461", "#E19898", "#A2678A", "#4D3C77", "#860A35", "#AF2655",
        "#A3B763", "#219C90", "#E9B824", "#EE9322", "#D83F31", "#252B48", "#445069",
        "#5B9A8B", "#1C6758", "#3D8361", "#D6CDA4",
    ];
    const randomIndex = Math.floor(Math.random() * palettes.length);

    // Return the selected color palette
    return palettes[randomIndex];
}

/**
 * Extrat initials from given name
 * @param name - name of the individual
 * @returns initials of the provided name
 */
export function getInitials(name: string): string {
    const names: Array<string> = name.split(" ");
    return names.slice(Math.max(names.length - 2, 1)).map((n) => n[0]).join("");
}
