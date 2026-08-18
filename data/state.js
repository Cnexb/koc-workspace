/*
 * Published dashboard state: communication board posts and review decisions.
 *
 * The dashboard writes this file when you press Save, so it is the one file
 * that carries board messages and approvals into the repo. Hand-editing is
 * fine as long as the shape stays the same.
 */
KOC.board([
  {
    "id": "p-seed-bio-1",
    "scope": "bio-is",
    "author": "Jeffery",
    "at": "2026-08-16T14:10:00+08:00",
    "body": "Jeff, Issac, Javin: please keep IG captions in English for now. I will handle the Chinese versions in one pass at the end of the month."
  },
  {
    "id": "p-seed-all-1",
    "scope": "all",
    "author": "Ms. Kinny",
    "at": "2026-08-17T09:30:00+08:00",
    "body": "Welcome to the KOC work gallery. Push finished work to your own folder and it shows up under your name. Anything you post here is visible to every team, so keep subject-specific chat on the subject boards below."
  },
  {
    "id": "p-seed-all-2",
    "scope": "all",
    "author": "Ms. Kinny",
    "at": "2026-08-17T09:35:00+08:00",
    "body": "Deadline reminder: Chapter 1 and 2 assets for all four subjects are due Friday 21 Aug. Mark a card as submitted even if the file is still rendering — I would rather see the plan early."
  },
  {
    "id": "p-seed-maths-1",
    "scope": "maths",
    "author": "Ms. Kinny",
    "at": "2026-08-17T18:45:00+08:00",
    "body": "Hugo has moved over from Chem, so we are five now. Hugo, your Balance Quest comic is in the review queue — nice work on keeping one story across all six pages."
  }
]);

KOC.reviews({});
