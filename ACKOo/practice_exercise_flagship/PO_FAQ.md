# Product Owner FAQ: Flagship Feature-Flag Service

## Flags
* **What is a flag made of?**  
  A key, a description, whether it's on or off, and a rollout percentage. Record when it was created and last changed.
* **What can a key look like?**  
  Lowercase letters, digits, and hyphens, 3 to 50 characters, for example `new-claims-flow`. Keys are unique and cannot be changed once created.
* **What does a new flag start as?**  
  Off, with a rollout of 0%.
* **What happens when a flag is deleted?**  
  It's archived, not erased. Its history is kept, it evaluates as off, and its key cannot be reused.
* **What rollout values are allowed?**  
  Whole numbers from 0 to 100. Anything else is rejected with a clear error.

## Evaluating a Flag
* **What does an application send?**  
  The flag key and a user ID. A request with no user ID is an error.
* **What if the flag doesn't exist, or is archived?**  
  Answer "off". Do not return an error: applications must never break because of a missing flag.
* **What if the flag is off?**  
  Off for everyone, whatever its rollout percentage.
* **What do 0% and 100% mean?**  
  0%: nobody gets it. 100%: everyone does.
* **Does the same user always get the same answer?**  
  Yes. As long as the flag doesn't change, the same user always gets the same answer, on every call and after a restart.
* **If I raise a rollout from 20% to 30%, what happens to users who already had it?**  
  They keep it. Raising the percentage only adds users; it never swaps some out.
* **Do two flags at 10% go to the same 10% of users?**  
  No. Each flag picks its own users.
* **Should the answer say why?**  
  Yes. Return a reason with every answer, for example: `flag off`, `user in rollout`, `user not in rollout`, or `unknown flag`.
* **How fast does it need to be?**  
  Applications call it many times a second. On a laptop, aim for well under 50 ms per call.

## Change History
* **What must be recorded?**  
  Every create, update, and delete: which flag, what changed (old and new values), when, and who did it.
* **How do we know who did it?**  
  API callers send their name in an `X-User` header. If it's missing, record `anonymous`.
* **Can history be edited or deleted?**  
  No. It's read-only.

## Usage Metric
* **What should we count?**  
  For each flag, how many times it was evaluated and how many of those answers were "on".
* **Does the count need to survive a restart?**  
  Your call. Note your assumption in your decision log.

## Out of Scope
Logins and permissions, multiple environments, and targeting rules other than the rollout percentage.
