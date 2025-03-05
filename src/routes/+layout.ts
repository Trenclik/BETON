export function load({ url }) {
    return {
      url: url.pathname,
    };
};

/*

Přijímá objekt s url – Tento objekt poskytuje informace o aktuální URL.
Vrací objekt s url.pathname – Vrací pouze cestu URL (bez domény), kterou lze pak použít v +layout.svelte nebo v jakémkoli dítěti tohoto layoutu.

 */