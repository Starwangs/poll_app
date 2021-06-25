<script>
  import Button from "$lib/shared/Button.svelte";
  import { v4 as uuidv4 } from "uuid";
  import { goto } from "$app/navigation";
  import { fade, scale, slide } from "svelte/transition";
  import { db } from "$lib/shared/firebase";

  let fields = { question: "", answerA: "", answerB: "" };
  let err = { question: "", answerA: "", answerB: "" };
  let valid = false;

  function submitHandler() {
    valid = true;

    if (fields.question.trim().length < 5) {
      valid = false;
      err.question = "Quesion must be at least 5 characters long";
    } else err.question = "";

    if (fields.answerA.trim().length < 1) {
      valid = false;
      err.answerA = "Answer A can't be empty";
    } else err.answerA = "";

    if (fields.answerB.trim().length < 1) {
      valid = false;
      err.answerB = "Answer A can't be empty";
    } else err.answerB = "";

    if (valid) {
      let poll = {
        ...fields,
        votesA: 0,
        votesB: 0,
        id: uuidv4(),
        created: Date.now(),
      };
      handlerAdd(poll);
    }
  }
  function handlerAdd(newPoll) {
    db.collection("polls").doc(newPoll.id).set(newPoll);
    goto("/");
  }
</script>

<form on:submit|preventDefault={submitHandler}>
  <div class="form-field" out:slide>
    <label for="question" in:scale={{duration: 1000}}>Poll Question:</label>
    <input type="text" id="question" in:scale={{duration: 1100}} bind:value={fields.question} />
    <div class="err">{err.question}</div>
  </div>
  <div class="form-field" out:slide>
    <label for="answer-a" in:scale={{duration: 1200}}>Answer A:</label>
    <input type="text" id="answer-a" in:scale={{duration: 1300}} bind:value={fields.answerA} />
    <div class="err">{err.answerA}</div>
  </div>
  <div class="form-field" out:slide>
    <label for="answer-b" in:scale={{duration: 1400}}>Answer B:</label>
    <input type="text" id="answer-b" in:scale={{duration: 1500}} bind:value={fields.answerB} />
    <div class="err">{err.answerB}</div>
  </div>
  <div in:scale={{duration: 1600}} out:slide><Button type="secondary">Add Poll</Button></div>
</form>

<style>
  form {
    width: 400px;
    margin: 0 auto;
    text-align: center;
  }

  .form-field {
    margin: 18px auto;
  }

  input {
    width: 100%;
    border-radius: 6px;
  }

  label {
    margin: 10px auto;
    text-align: left;
    font-weight: 300;
    font-size: 16px;
  }

  .err {
    font-weight: bold;
    font-size: 12px;
    color: #d91b42;
  }
</style>
