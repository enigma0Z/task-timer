# KNOWN ISSUES

* [ ] Some scenarios will cause a bunch of notifications to be sent all at once
  * I suspect this is related to the subscriber being updated that the countdown
    is complete but not being unsubscribed
* [ ] Time format for Firefox is -1 minute
  * The actual data is still correct (that is, 11:59 AM internally is still
    12:00 PM, for instance), so it's at least ignorable: visual bug only.

## Fixed

* [X] The "On Deck" label does not correctly update if you edit the label of the
  on-deck timer
* [X] Editing timers while one is running has not yet been tested
* [X] Edits to min/max values are sometimes erased / not saved
* [X] Deleting the current ticountdown will cause a crash
* [X] Timers not rolling over when completed (e.g. work completes, break is not
  queued up to be on deck)
* [X] Notifications broke on Firefox for some reason
  * This is due to a bad configuration on my computer
