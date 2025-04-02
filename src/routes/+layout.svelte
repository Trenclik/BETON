<!-- src/routes/+layout.svelte -->
<script lang="ts">
    import Header from "$lib/Components/Header.svelte";
    import { page } from '$app/stores'; // importujeme store pro sledování URL
    import type { Snippet } from 'svelte'; 
    import type { LayoutData } from "./$types"; 

    type Props = {
        children: Snippet;
        data: LayoutData;
    };

    const { children, data }: Props = $props();

    // Seznam stránek, kde se nemá zobrazit header
    const hiddenHeaderPages = ["/SuccesfulRegister", "/FaildRegister"];

    let currentPath = $state("")

    // Použijeme $effect pro sledování změn v URL
    $effect(() => {
        currentPath = $page.url.pathname;
    });
</script>

{#if !hiddenHeaderPages.includes(currentPath)}
    <Header />
{/if}

<main>
    {@render children()}

</main>
