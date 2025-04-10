<script lang="ts">
    import StylingPage from "$lib/Components/Styling-page.svelte";

    let handleMicrosoftLogin = () => {
        window.location.href = "/auth/microsoft";
    };
</script>

<StylingPage />

<main>
    <h1>Další způsoby jak se přihlásit</h1>
    <div class="Link-For-Another-LoginorRegister">
        <button onclick={handleMicrosoftLogin}>
            <img src="/Microsoft_Logo_512px.png" alt="Microsoft logo" />
            <span>Přihlásit se přes Microsoft</span>
        </button>
    </div>
    <div class="Normal-Login">
        <a href="./Login"><strong>Přihlásit se</strong></a>
        <a href="./Register"><strong>Registruj se</strong></a>
    </div>
</main>

<style>
    main {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 700px;
        padding: 20px;
    }

    h1 {
        font-size: 25px;
        font-weight: 600;
        margin-bottom: 80px;
        color: white;
        text-align: center;
    }

    .Link-For-Another-LoginorRegister {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        height: 100%;
        max-height: 300px;
    }

    .Normal-Login {
        margin-top: auto;
        display: flex;
        flex-direction: row;
        gap: 50px;
        margin-top: 40px;
    }

    .Normal-Login a {
        color: rgba(30, 138, 37, 1);
        text-decoration: none;
        font-size: 18px;
        font-weight: 500;
        transition: color 0.3s;
        text-align: center;
    }

    .Normal-Login a:hover {
        color: #aad8ff;
    }

    button {
        display: flex;
        align-items: center;
        gap: 10px;
        background-color: #0078d4;
        color: white;
        border: none;
        padding: 12px 24px;
        border-radius: 6px;
        cursor: pointer;
        font-size: 16px;
        font-weight: 500;
        box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
        transition: background-color 0.3s, transform 0.2s;
    }

    button:hover {
        background-color: #005a9e;
        transform: translateY(-2px);
    }

    button img {
        width: 24px;
        height: 24px;
    }

    /* RESPONSIVE */
    @media (max-width: 480px) {
        h1 {
            font-size: 20px;
            margin-bottom: 40px;
        }

        button {
            padding: 10px 16px;
            font-size: 14px;
        }

        button img {
            width: 20px;
            height: 20px;
        }

        .Normal-Login a {
            font-size: 14px;
        }
    }

    @media (min-width: 481px) and (max-width: 768px) {
        h1 {
            font-size: 22px;
            margin-bottom: 60px;
        }

        button {
            padding: 12px 20px;
            font-size: 15px;
        }
    }
</style>

