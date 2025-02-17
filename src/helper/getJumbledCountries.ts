export const getJumbledCountries = (countries: string[]): string[] => {
    return countries.map((country) => {
        return country
        .split("")
        .sort(() => Math.random() - 0.5)
        .join("");
    });
}