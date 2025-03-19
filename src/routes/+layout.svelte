<!-- src/routes/+layout.svelte -->
<script lang="ts">
    import Header from "$lib/Components/Header.svelte";
    import type { Snippet } from 'svelte'; // Typ Snippet je typ, který představuje obsah stránky nebo komponenty v rámci Svelte 5
    import type { LayoutData } from "./$types"; // Typ LayoutData pochází ze SvelteKit generovaných typů a obsahuje data z load funkcí (+layout.ts)

    type Props = {
        children: Snippet;
        data: LayoutData;
    };
    /* 
        children: Snippet → children je obsah (podstránka), který bude vykreslen uvnitř layoutu.
        data: LayoutData → data jsou data získaná z +layout.ts (pokud existuje)
    */

    const { children, data }: Props = $props();
    /*
        $props() → Speciální Svelte funkce, která vrací všechny vlastnosti předané komponentě.
        Dáváme jí typ Props a destrukturovali jsme children a data
    */

</script>



<Header />



<main>
    {@render children()}
</main>


