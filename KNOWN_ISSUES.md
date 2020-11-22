# KNOWN ISSUES

* [ ] The "On Deck" label does not correctly update if you edit the label of the
  on-deck timer
* [ ] Editing timers while one is running has not yet been tested
* [ ] Edits to min/max values are sometimes erased / not saved
* [X] Deleting the current ticountdown will cause a crash
* [ ] Some scenarios will cause a bunch of notifications to be sent all at once
  * I suspect this is related to the subscriber being updated that the countdown
    is complete but not being unsubscribed
* [X] Timers not rolling over when completed (e.g. work completes, break is not
  queued up to be on deck)
* [ ] Notifications broke on Firefox for some reason
