<script lang="ts">
  export let visible: boolean;
</script>

<main {...$$props}>
  <!-- Zde umožňujeme šíření atributů -->
  <div class="show-hide-icon">
    <button type="button" class="toggle" onclick={() => (visible = !visible)}>
      {#if visible}
        <!-- Oko otevřené -->
        <svg
          version="1.0"
          xmlns="http://www.w3.org/2000/svg"
          width="512.000000pt"
          height="512.000000pt"
          viewBox="0 0 512.000000 512.000000"
          preserveAspectRatio="xMidYMid meet"
        >
          <g
            transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
            fill="#1E8A25"
            stroke="none"
          >
            <path
              d="M2370 4184 c-589 -70 -1135 -342 -1715 -855 -203 -179 -537 -540
							-623 -674 -36 -56 -36 -134 0 -190 46 -72 240 -297 378 -438 493 -508 1042
							-864 1560 -1012 225 -64 339 -79 590 -79 251 0 365 15 590 79 607 174 1274
							647 1806 1283 146 174 158 195 158 262 0 67 -12 88 -158 262 -529 631 -1194
							1105 -1796 1280 -202 59 -336 78 -555 82 -110 3 -216 2 -235 0z m435 -349
							c471 -71 984 -348 1477 -799 151 -137 448 -454 448 -477 0 -3 -34 -46 -77 -94
							-582 -666 -1244 -1089 -1848 -1180 -128 -19 -362 -19 -490 0 -435 66 -899 303
							-1360 694 -167 141 -565 551 -565 581 0 4 34 47 77 95 578 661 1240 1086 1839
							1179 122 19 375 19 499 1z"
            />
            <path
              d="M2420 3564 c-433 -79 -741 -361 -846 -774 -27 -106 -27 -354 0 -460
							97 -380 376 -659 756 -756 106 -27 354 -27 460 0 380 97 659 376 756 756 15
							58 19 110 19 230 0 120 -4 172 -19 230 -95 375 -366 650 -741 752 -68 19 -323
							33 -385 22z m300 -350 c187 -42 358 -179 445 -359 52 -107 68 -189 63 -325 -5
							-129 -30 -216 -90 -318 -42 -72 -158 -188 -230 -230 -211 -124 -485 -124 -696
							0 -72 42 -188 158 -230 230 -124 211 -124 485 0 696 42 72 158 188 230 230
							151 89 328 116 508 76z"
            />
          </g>
        </svg>
      {:else}
        <!-- Oko zavřené -->
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="hide" fill="#1E8A25">
          <g fill="#1E8A25"> <path d="M22 12c0-.9-.4-1.7-1.1-2.1l-1.8-1.2c-.5-.3-1.1-.2-1.4.3-.3.5-.2 1.1.3 1.4l1.8 1.2c.2.1.2.3.2.4s0 .3-.2.5l-2 1.4c-1.8 1.2-4 1.8-6.2 1.7-.5 0-1 .4-1 .9 0 .6.4 1 .9 1h.6c2.4 0 4.7-.7 6.8-2.1l2-1.3c.7-.4 1.1-1.2 1.1-2.1zM3.1 14.1l2 1.4c.5.2.9.5 1.3.7l-1.1 1.1c-.4.4-.4 1 0 1.4.2.2.4.3.7.3s.5-.1.7-.3l2.1-2.1 1.4-1.4 4.8-4.8L16.4 9l2.1-2.1c.4-.4.4-1 0-1.4s-1-.4-1.4 0L15.6 7c-3.5-1.1-7.4-.5-10.4 1.5l-2 1.3C2.4 10.3 2 11.1 2 12s.4 1.7 1.1 2.1zM12 9.6c.3 0 .6.1.9.2l-3.1 3.1c-.1-.3-.2-.6-.2-.9 0-1.3 1.1-2.4 2.4-2.4zm-7.8 1.9 2-1.4c.9-.4 1.7-.8 2.6-1.1-.8.8-1.2 1.8-1.2 3 0 .8.2 1.6.7 2.3l-.4.4c-.6-.2-1.1-.5-1.6-.9l-2-1.4c-.3-.1-.3-.3-.3-.4s0-.3.2-.5z"></path> </g>
        </svg>
      {/if}
    </button>
  </div>
</main>

<style>
  /* SVG ikoně dáme pevnou velikost */
  .toggle svg {
    width: 30px;
    height: 25px;
  }

  /* Zvýraznění při najetí myší */
  .toggle:hover svg {
    transform: scale(1.1);
    transition: transform 0.2s ease;
  }

  .show-hide-icon {
    display: flex;
    justify-content: right;
    align-items: right;
    transform: translate(-50%, -50%);
    cursor: pointer;
  }

  button {
    background: none;
    border: none;
    cursor: pointer;
  }

</style>

