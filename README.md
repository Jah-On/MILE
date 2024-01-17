# MILE

Math Inclusive Live Editor

<!-- Try it out [here](https://jah-on.github.io/MILE/)! -->

## What's new in MILE?

A lot! The current iteration of MILE, "MASCII-JS", adds several new features including...

- ASCIIMath as the language of choice.
- Revision history at one hour (or longer) periods.
- Bracket closing and bracket wrapping (for highlighted text).
- Better looking UI.
- Autosaving (at five minute intervals).
- Improved text suggestion replacement.
- Sorted projects (currently only by most recent but selectable options coming soon!).

## Documentation

MILE now uses ASCIIMath as the language of choice. Its list of commands and syntax can be found [here](http://asciimath.org/#syntax).

Suggestions are completed when the `Tab` key is pressed or the suggestion is clicked on.

Word suggestion list...
| Name | ASCIIMath Equivalent |
| ---- | -------------------- |
| abs | abs{} |
| alpha | alpha |
| bar | bar{} |
| because | :' |
| beta | beta |
| cancel | cancel{} |
| ceil | ceil{} |
| chi | chi |
| complexnumberset | CC |
| delta | delta |
| Delta | Delta |
| dot | dot{} |
| doubledot | ddot{} |
| emptyset | O/ |
| epsilon | epsilon |
| equals | = |
| eta | eta |
| floor | floor{} |
| fraction | frac{}{} |
| gamma | gamma |
| Gamma | Gamma |
| greaterthan | > |
| greaterorequals | >= |
| hat | hat{} |
| infinity | oo |
| intboth | int_{}^{} |
| integernumberset | ZZ |
| intover | int^{} |
| intunder | int_{} |
| iota | iota |
| kappa | kappa |
| lambda | lambda |
| Lambda | Lambda |
| lessthan | < |
| lessorequals | <= |
| limunder | lim_{} |
| mu | mu |
| naturalnumberset | NN |
| notequal | != |
| nu | nu |
| omega | omega |
| Omega | Omega |
| overbrace | obrace{}{} |
| overset | overset{}{} |
| partial | del |
| phi | phi |
| Phi | Phi |
| pi | pi |
| Pi | Pi |
| power | ^{} |
| prodboth | prod_{}^{} |
| prodover | prod^{} |
| produnder | prod_{} |
| psi | psi |
| Psi | Psi |
| rationalnumberset | QQ |
| realnumberset | RR |
| rho | rho |
| sigma | sigma |
| Sigma | Sigma |
| strikethrough | cancel{} |
| sumboth | sum_{}^{} |
| sumover | sum^{} |
| sumunder | sum_{} |
| tau | tau |
| therefore | :. |
| theta | theta |
| Theta | Theta |
| tilde | tilde{} |
| towards | -> |
| underbrace | ubrace{}{} |
| underline | ul{} |
| underset | underset{}{} |
| upsilon | upsilon |
| vec | vec{} |
| xi | xi |
| Xi | Xi |
| zeta | zeta |

## What happens to "Old MILE"?

"Old MILE" will still exist as it's own branch on this repository. If you need, or want, a deployment of "Old MILE", please send an email to **Jah-On-Inquiry [at] pm [dot] me** or open an issue.

### File extension table

| Extension | MILE Iteration/Code-Name  | Current Compatible | Deployment Link |
|-|-|-|-|
|`.majs`|`MASCII-JS` (**current**)|Yes|Coming soon!|
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
