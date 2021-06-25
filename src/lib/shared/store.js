import { writable } from 'svelte/store'
import { db } from '$lib/shared/firebase'

export const pollList = writable([])

db.collection('polls').orderBy('created').onSnapshot(snapshot => {
    snapshot.docChanges().forEach(change => {
        if (change.type === 'added') fetchDB(change.doc.data())
        else if (change.type === 'modified') updateDB(change.doc.data())
        else if (change.type === 'removed') delDB(change.doc.data())
    })
})


function fetchDB(poll) {
    pollList.update(allPoll => allPoll = [poll, ...allPoll])
}

function updateDB(poll) {
    pollList.update((polls) => {
        let copiedPolls = [...polls];
        let upVotedPoll = copiedPolls.find((poll_) => poll_.id === poll.id);

        Object.assign(upVotedPoll, poll)
  
        return copiedPolls;
      })
}

function delDB(poll) {
    pollList.update(allPoll => allPoll.filter(poll_ => poll_.id !== poll.id))
}