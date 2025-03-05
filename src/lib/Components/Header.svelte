<script>  

</script>

<header>
    <a href="./"><img src="Pirko-logo.png" alt="logo"></a>
    <nav class="Navigace-Header">
        <a href="./">Domov</a>
        <a href="./Login">Přihlášení</a>
        <a href="./Register">Registrace</a>
    </nav>

</header>


<style>
    header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 20px;
        background-color: #f8f9fa;
        border-bottom: 2px solid #ddd;
        
    }

    header img {
        height: 50px;
    }

    .Navigace-Header {
        display: flex;
        gap: 15px;
    }

    .Navigace-Header a {
        text-decoration: none;
        color: #333;
        font-weight: bold;
        padding: 5px 10px;
        transition: color 0.3s;
    }

    .Navigace-Header a:hover {
        color: #007bff;
    }
</style>
