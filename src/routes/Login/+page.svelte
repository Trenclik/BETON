<script lang="ts">

</script>


<main>
    <div class="windowForLogin">
        <h1>Přihlášení</h1>
        <div class="inputsValue">
            <input type="text" placeholder="Jméno nebo Email">
            <input type="password" placeholder="Heslo">
            <input type="submit" value="Přihlásit se">
            <a href="./AnotherWayToLogin"><button class="AnotherWayToLogin">Přihlásit se jinak</button></a>
        </div>
        <a href="./ForgetPassword">Zapomenuté heslo?</a>
    </div>
</main>

<style>
    .windowForLogin {
        background-color: white;
        padding: 2rem;
        border-radius: 8px;
        box-shadow: 4px 8px 32px rgba(0, 0, 0, 0.1);
        text-align: center;
        margin-top: 100px;
    }

    h1 {
        margin-bottom: 1.5rem;
    }

    .inputsValue {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    input[type="text"],
    input[type="password"] {
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 1rem;
    }

    input[type="submit"] {
        padding: 0.5rem;
        border: none;
        border-radius: 4px;
        background-color: #007bff;
        color: white;
        font-size: 1rem;
        cursor: pointer;
    }

    input[type="submit"]:hover {
        background-color: #0056b3;
    }

    .AnotherWayToLogin {
        padding: 0.5rem;
        border: none;
        border-radius: 4px;
        background-color: #6c757d;
        color: white;
        font-size: 1rem;
        cursor: pointer;
    }

    .AnotherWayToLogin:hover {
        background-color: #5a6268;
    }

    a {
        color: #007bff;
        text-decoration: none;
        margin-top: 1rem;
        display: inline-block;
    }

    a:hover {
        text-decoration: underline;
    }
</style>
