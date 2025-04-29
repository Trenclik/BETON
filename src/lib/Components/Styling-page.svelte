<script lang="ts">
	import { browser } from '$app/environment';
</script>

<div class="styling-container">
  <div class="window">
    <h1>
      <span class="concretum-light">Co<span class="concretum-bold">n</span>cret<span class="concretum-bold">u</span>m</span>
    </h1>
  </div>
</div>

<style>
  .styling-container {
    position: absolute;
    width: 100%;
    height: 760px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #2e2e2e;
    z-index: -1; /* Zabrání překrytí inputů */
  }

  .window {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start; /* Posune obsah nahoru */
    align-items: center;
    background: rgba(118, 101, 101, 0.45);
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    border-radius: 30px; /* Větší zaoblení */
    width: 80vw;
    max-width: 300px;
    height: 85vh;
    max-height: 700px;
    padding: 20px;
    
  }

  h1 {
    font-size: 40px;
    font-weight: bold;
    text-align: center;
    margin-top: 40px;
  }

  .concretum-light {
    color: rgba(255, 255, 255, 0.7);
  }

  .concretum-bold {
    color: #b75e29;
  }

  @media screen and (max-width: 768px) {
    .window {
      width: 360px;
      height: 580px;
    }

    h1 {
      margin-top: 10px;
      font-size: 40px;
      margin-bottom: 0;
    }
  }

  @media screen and (max-width: 1024px) {
    .window {
      width: 360px;
      height: 580px;
    }

    h1 {
      margin-top: 10px;
      font-size: 40px;
      margin-bottom: 0;
    }
  }

  @media screen and (max-width: 480px) {
    .window {
      width: 320px;
      height: auto;
      min-height: 500px;
    }

    h1 {
      margin-top: 0px;
      font-size: 40px;
      margin-bottom: 0;
    }
  }


</style>
