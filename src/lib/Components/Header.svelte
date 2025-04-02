<script lang="ts">
  import { text } from "drizzle-orm/sqlite-core";
</script>

<header>
  <div class="Header-Section">
    <div class="Logo">
      <h1>
        <span class="concretum-light"
          >Co<span class="concretum-bold">n</span>cret<span
            class="concretum-bold">u</span
          >m</span
        >
      </h1>
    </div>

    <div class="Navigation">
      <nav>
        <a href="./Login"><strong>Přihlasit</strong></a>
        <a href="./Register"><strong>Registrovat</strong></a>
      </nav>
    </div>
  </div>
</header>

<style>
  .Header-Section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    background-color: rgb(63, 63, 63);
    height: 50px;
  }
  h1 {
    font-size: 30px;
    font-weight: bold;
    text-align: center;
  }

  .Logo {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .concretum-light {
    color: rgba(255, 255, 255, 0.7);
  }

  .concretum-bold {
    color: #b75e29;
  }

  a {
    color: white;
  }

  .Navigation {
    margin-right: 20px;
  }

  .Navigation nav {
    display: flex;
    gap: 20px; /* Přidá mezeru mezi odkazy */
  }

  .Navigation nav a {
    text-decoration: none; /* Pokud chceš odstranit podtržení */
  }
</style>
