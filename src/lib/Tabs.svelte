<script>
  import { page } from "$app/stores";
</script>

<div class="tabs">
  <ul>
    <a sveltekit:prefetch href="/"
      ><li class:active={$page.path === "/"}>Current Polls</li></a
    >
    <a sveltekit:prefetch href="/add"
      ><li class:active={$page.path === "/add"}>Add New Poll</li></a
    >
  </ul>
</div>

<style>
  .tabs {
    margin-bottom: 40px;
  }

  ul {
    display: flex;
    justify-content: center;
    padding: 0;
    list-style-type: none;
  }

  li {
    font-weight: 400;
    margin: 0 16px;
    font-size: 18px;
    color: #555;
  }

  a {
    text-decoration: none;
  }

  li.active {
    color: #d91b42;
    border-bottom: 2px solid #d91b42;
    padding-bottom: 8px;
  }
</style>
