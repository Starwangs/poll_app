<script>
  import "../app.css";
  import Header from "$lib/Header.svelte";
  import Tabs from "$lib/Tabs.svelte";
  import Footer from "$lib/Footer.svelte";
  import Button from "$lib/shared/Button.svelte";
  import { auth, googleProvider } from "$lib/shared/firebase";
  import { authState } from "rxfire/auth";

  let user;

  authState(auth).subscribe((u) => (user = u));

  function login() {
    auth.signInWithPopup(googleProvider);
  }
</script>

<Header />

<main>
  {#if user}
  <Tabs />
  <slot />
  {:else}
      <div class="signin"><Button type="secondary" on:click={login}>Signin with Google</Button></div>
  {/if}
</main>

<Footer />

<style>
  main {
    max-width: 960px;
    margin: 40px auto;
  }
  
  .signin {
      margin-top: 100px;
      text-align: center;
  }
</style>
