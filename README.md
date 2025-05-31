# Math Inclusive Live Editor (MILE)

Try it out [here](https://jah-on.github.io/MILE/)!

## Documentation

### How to use?

MILE operates on the concept of "Projects". A "Project" may represent a homework assignment, quiz, test, exam, etc. Within each project, you can have multiple "problems". A "problem" may represent a homework problem or test question. 

Upon opening MILE for the first time, one will land on the "Projects" page that has no projects.

![Screenshot showcasing the "Projects" page displays a mostly black screen with some sparse white elements. In the top left corner, there's the word "MILE" in white, capitalized text. Below it, slightly to the right, a small white icon resembling paper with a folded corner and an arrow pointing to the center of the page is visible. To the right of this icon, there's a dashed white square outline, approximately 1/10th the width of the screen. Inside this square, a small white plus sign is centered.](https://github.com/user-attachments/assets/4aef2754-14fb-4928-bf9e-ec6b82d6aaac)

There is a left side panel (HTML ID `sideBar`) that will contain navigation or function buttons for all pages. One the "Projects" page, the only button in the panel is the "Import" button (HTML ID `importButton`). This button allows one to import `.majs` project files. Note, MILE does not have device syncronization capabilities at the moment so backing up and copying projects is the user's responsibility. It does however automaticaly save projects inside the browser as they are created and modified. 

Inside the main body of the page (HTML ID `list`) is where projects will be listed. The first item in the list will always be the "Add Project" button that has the plus sign bordered by a dotted outline (HTML ID `addProject`). When that button is clicked, a new unnamed project is created. 

![Screenshot builds upon the previous one with additional white and light blue elements. Newly added to the right of the dashed square is another white outlined rectangle, the same size as the dashed square but with a solid white border line. Inside this new rectangle, in the upper part, there's a smaller light blue rectangle with the text "Name?" in placeholder text. Below this light blue rectangle, arranged horizontally, are four small, minimalist icons within white outline that depict a pen, trash bin, clipboard, and clock face.](https://github.com/user-attachments/assets/e6a0e74f-9e3c-43ed-b23a-fa5b6aa446b7)

The name field (HTML ID `name`) is automatically focused (outlined in blue rectangle) as it expects a project name. MILE does support empty and duplicate project names but these are highly discouraged practices. When the name field is unfocued (the blue rectangle disappears), the project name has been updated. A projects name can be changed at any time by refocusing the name field (clicking where the text or navigating to it using accessibility tools) and modifying the text accordingly. 

Within each project box (whose HTML ID is the UUID of the project), the bottom will always display four buttons. They are, in order left to right, "Edit" (depicted as a pen), "Delete" (depicted as a trash bin), "Copy" (depicted as a clipboard), and "Revisions" (depicted as a clock). "Edit" switches to the "Problems" page for the project. "Delete" deletes the project and stored browser data. Note that a precautionary browser pop-up confirmation window will appear to confirm the deletion. Downloaded files are not affected by this button. "Copy" duplicates the project and the duplicated project will be monikered with the additional name followed by `(1)`. Revision history is duplicated too. "Revisions" shows the saved revisions of the project. Below depicts an example view...

![Further building upon the last screenshots, this one showcases the same contents as before. Except now, a blurred overlay covers most of the screen, revealing a central white window that lists revision dates and times for a project. A "Close" button is at the bottom of this window.](https://github.com/user-attachments/assets/b59f1a7d-f57c-405e-9816-7da6de63ae78)

A window within the page (HTML ID `revisionList`) will appear with a list of stored revisions. There is a "Close" button at the bottom (HTML ID `closeRevisions`) that closes the revision list. Each revision shows the date in U.S. format followed by the time in the browser's timezone. Clicking on one of the revision will revert the problems and revision history to that point. Note, a precautionary browser pop-up confirmation window will appear to confirm the reverting of the project's state. Clicking "Ok" in the browswer prompt will close the revisions list and the project has been reverted. Selecting "Cancel" in that prompt will bring the user back to the revision list without changing anything. ﻿﻿

Now this section will talk about the "Problems" page that is depicted below.

![image](https://github.com/user-attachments/assets/c97db593-3021-4694-9ae4-0f67d6988a2b)

### Underlying Typesetting Language

MILE now uses ASCIIMath as the language of choice. Its list of commands and syntax can be found [here](http://asciimath.org/#syntax).

Suggestions are completed when the `Tab` key is pressed or the suggestion is clicked on.

<!-- FOR DOC GEN -->
| Name | ASCIIMath Equivalent |
| ---- | -------------------- |
| abs | abs{} |
| alpha | alpha |
| bar | bar{#{var}} |
| because | :' |
| beta | beta |
| cancel | cancel{#{expression}} |
| ceil | ceil{#{expression}} |
| chi | chi |
| complexnumberset | CC |
| delta | delta |
| Delta | Delta |
| dot | dot{#{var}} |
| doubledot | ddot{#{var}} |
| emptyset | O/ |
| epsilon | epsilon |
| equals | = |
| eta | eta |
| floor | floor{#{expression}} |
| fraction | frac{#{numerator}}{#{denominator}} |
| gamma | gamma |
| Gamma | Gamma |
| greaterthan | > |
| greaterorequals | >= |
| hat | hat{#{expression}} |
| infinity | oo |
| intboth | int_{#{lowerBound}}^{#{upperBound}} |
| integernumberset | ZZ |
| intover | int^{#{upperBound}} |
| intunder | int_{#{lowerBound}} |
| iota | iota |
| kappa | kappa |
| lambda | lambda |
| Lambda | Lambda |
| lessthan | < |
| lessorequals | <= |
| limunder | lim_{#{limit}} |
| mu | mu |
| naturalnumberset | NN |
| notequal | != |
| nu | nu |
| omega | omega |
| Omega | Omega |
| overbrace | obrace{#{expression}} |
| overset | overset{#{sym}}{#{expression}} |
| partial | del |
| phi | phi |
| Phi | Phi |
| pi | pi |
| Pi | Pi |
| power | ^{exponent} |
| prodboth | prod_{#{lowerBound}}^{#{upperBound}} |
| prodover | prod^{#{upperBound}} |
| produnder | prod_{#{lowerBound}} |
| psi | psi |
| Psi | Psi |
| rationalnumberset | QQ |
| realnumberset | RR |
| rho | rho |
| sigma | sigma |
| Sigma | Sigma |
| strikethrough | cancel{#{expression}} |
| sumboth | sum_{#{lowerBound}}^{#{upperBound}} |
| sumover | sum^{#{upperBound}} |
| sumunder | sum_{#{lowerBound}} |
| tau | tau |
| text | text(#{text}) |
| therefore | :. |
| theta | theta |
| Theta | Theta |
| tilde | tilde{#{var}} |
| times | × |
| towards | -> |
| underbrace | ubrace{#{expression}} |
| underline | ul{#{expression}} |
| underset | underset{#{sym}}{#{expression}} |
| upsilon | upsilon |
| vec | vec{#{var}} |
| xi | xi |
| Xi | Xi |
| zeta | zeta |
<!---->

## Features

### Current
- ASCIIMath as the language of choice.
- Revision history at one hour (or longer) periods.
- Bracket closing and bracket wrapping (for highlighted text).
- Better looking UI.
- Autosaving (at five minute intervals).
- Improved text suggestion replacement.
- Sorted projects (currently only by most recent but selectable options coming soon!).

## What happens to "Old MILE"?

"Old MILE" will still exist as it's own branch on this repository. If you need, or want, a deployment of "Old MILE", please send an email to **Jah-On-Inquiry [at] pm [dot] me** or open an issue.

### File extension table

| Extension | MILE Iteration/Code-Name  | Current Compatible | Deployment Link |
|-|-|-|-|
|`.majs`|`MASCII-JS` (**current**)|Yes|[Main](https://jah-on.github.io/MILE/)|
|`.mil` |`Old MILE`               |No |            |

## How can you help?

Please **kindly** report any bugs or provide format/operation/function suggestions!

Another great way would be by adding/improving the suggestions in the CSV file

## Developer Info

Before doing steps in any section, except `Modifying the CSV file`, be sure to...

1. Ensure Node.js and a package manager such as `npm` are installed
2. Clone this repo (new to GitHub? [Learn here!](https://docs.github.com/en/get-started/quickstart/downloading-files-from-github))

### Adding suggestions to the CSV file

The CSV file represents each suggestion on its own line. Each suggestion contains the word, the ASCIIMath equivalent, and the completion offset. The completion offset sets how far back to move the cursor when a a suggestion is inserted. This file should not contain any spaces, tabs, etc. If you don't have a GitHub account but want to submit additions or modification, please email me the changed CSV file along with the purpose of each change.

### Using the nextTextGen utility script

This script is used to generate important structures such as markdown tables for documentation or JS maps that MILE uses in the code. The script must be ran from the root of the cloned project. Run it with `node utils/nextTextGen.js <command>` where command is the target structure. 

The currently supported commands are...

|Word form|Short form|Standard form|Description|
|-|-|-|-|
|`help` |`-h`| `--help`|Prints the list of commands|
|`map`  |`-m`|  `--map`|Prints out MILE JS Map|
|`table`|`-t`|`--table`|Prints out markdown table of suggestions|

### Generating MILE yourself

1. `npm install` to install the packages once
2. `npm run dev` to run it in development mode
3. `npm run build` to get a all-in-one, portable HTML file

## Statement on accessibility

MILE aims at making math more accessible as a whole but currently focuses on making the typing experience as efficient as possible. Little to no testing has been done to ensure proper behavior with screen readers, Braille, and other modalities. That being said, I try to ensure that all visual elements (buttons, images, etc.) have text alternatives or descriptors.

## FAQ

### Why did I make this?

I have Cerebral Palsy which makes writing math, especially for prolonged periods of time, challenging. I wanted a tool that allows for faster typing to compensate for my slower typing, easier to memorize, allows for editing multiple problems within one app/windows, formats the problems neatly, exports easily to PDF (via the print subsystem) or prints directly, and is universally accessible across devices/operating systems.

### Is there an "offline" version?

All work is saved locally and there is an offline portable version of MILE currently. However, the offline file cannot read projects from the github.io site and vise versa.

### How do I save my work?

MILE now saves your projects inside of your browser! However, these files are not backed up so it is your responsibility to export individual projects to back them up or share among people/devices.
