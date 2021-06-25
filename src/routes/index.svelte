<script>
  import PollDetail from "$lib/PollDetail.svelte";
  import { pollList } from "$lib/shared/store";
  import { flip } from "svelte/animate";
  import { fade, scale, slide } from "svelte/transition";
</script>

<div class="poll-list">
  {#each $pollList as poll, i (poll.id)}
    <div in:scale={{delay: i * 200 || 0, duration: 600}} out:slide animate:flip={{duration: 500}}><PollDetail {poll} {i} /></div>
  {/each}
</div>

<style>
  .poll-list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
  }
</style>
