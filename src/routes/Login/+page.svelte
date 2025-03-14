<script lang="ts">
    import ShowHideButton from "$lib/Components/ShowHideButton.svelte";
</script>

<main>
    <section class="TitleConcretum">
        <h1>Concretum</h1>
    </section>

    <section class="LoginContainer">
        <div class="LoginSection">
            <input type="text" placeholder="Username">
            <ShowHideButton></ShowHideButton>
            <a href="./ForgetPassword">Forgot Password</a>
            <button id="LoginButton">Login</button>
        </div>

        <div class="DontHaveAccount">
            <p>Don't have an account?</p>
            <a href="./Register">Sign Up</a>
        </div>
    </section>
</main>

<style>
    
</style>