<script>
  import { db } from "./shared/firebase";
  import { tweened } from "svelte/motion";
  import Card from "$lib/shared/Card.svelte";
  import Button from "$lib/shared/Button.svelte";
  export let poll;
  export let i;

  $: totalVotes = poll.votesA + poll.votesB;
  $: percentA = Math.floor((poll.votesA / totalVotes) * 100) || 0;
  $: percentB = Math.floor((poll.votesB / totalVotes) * 100) || 0;

  const tweenedA = tweened(0, {delay: i * 200 || 0, duration: 600});
  const tweenedB = tweened(0, {delay: i * 200 || 0, duration: 600});

  $: tweenedA.set(percentA);
  $: tweenedB.set(percentB);

  function handelVote(option, id) {
    if (option === 'a') db.collection('polls').doc(id).update({votesA: poll.votesA + 1})
    if (option === 'b') db.collection('polls').doc(id).update({votesB: poll.votesB + 1})
  }

  function handleDelete(id) {
    console.log(id)
    db.collection("polls").doc(id).delete();
  }
</script>

<Card
  ><div class="poll">
    <h3>{poll.question}</h3>
    <p>Total votes: {totalVotes}</p>
    <div class="answer" on:click={() => handelVote("a", poll.id)}>
      <div class="percent percent-a" style="--percents: {$tweenedA}%" />
      <span>{poll.answerA} ({poll.votesA})</span>
    </div>
    <div class="answer" on:click={() => handelVote("b", poll.id)}>
      <div class="percent percent-b" style="--percents: {$tweenedB}%" />
      <span>{poll.answerB} ({poll.votesB})</span>
    </div>
    <div class="delete">
      <Button flat={true} on:click={() => handleDelete(poll.id)}>Delete</Button>
    </div>
  </div></Card
>

<style>
  h3 {
    font-weight: 300;
    margin: 0 auto;
    color: #555;
  }

  p {
    margin-top: 6px;
    font-size: 14px;
    color: #aaa;
    margin-bottom: 30px;
  }

  .answer {
    background: #fafafa;
    cursor: pointer;
    margin: 10px auto;
    position: relative;
  }

  .answer:hover {
    opacity: 0.6;
  }

  span {
    display: inline-block;
    padding: 10px 20px;
  }

  .percent {
    height: 100%;
    position: absolute;
  }

  .percent-a {
    width: var(--percents);
    border-left: 4px solid #d91b42;
    background: rgba(217, 27, 66, 0.2);
  }

  .percent-b {
    width: var(--percents);
    border-left: 4px solid #45c496;
    background: rgba(69, 196, 150, 0.2);
  }

  .delete {
    margin-top: 30px;
    text-align: center;
  }
</style>
