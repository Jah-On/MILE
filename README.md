# MILE

Math Inclusive Live Editor

<!-- Try it out [here](https://jah-on.github.io/MILE/)! -->

# What's new in MILE?

A lot! The current iteration of MILE, "MASCII-JS", adds several new features which are...

- ASCIIMath as the language of choice.
- Revision history at one hour (or longer) periods.
- Bracket closing and bracket wrapping (for highlighted text).
- Better looking UI.
- Autosaving (at five minute intervals).
- Improved text suggestion replacement.
- Sorted projects (currently only by most recent but selectable options coming soon!).

<br>

# Documentation

MILE now uses ASCIIMath as the language of choice. Its list of commands and syntax can be found [here](http://asciimath.org/#syntax).

Word suggestion list...
| Name | ASCIIMath Equivalent |
| ---- | -------------------- |
| abs | abs{} |
| bar | bar{} |
| cancel | cancel{} |
| ceil | ceil{} |
| dot | dot{} |
| doubledot | ddot{} |
| floor | floor{} |
| frac | frac{}{} |
| fraction | frac{}{} |
| hat | hat{} |
| infinity | oo |
| intboth | int_{}^{} |
| intover | int^{} |
| intunder | int_{} |
| limunder | lim_{} |
| overbrace | obrace{}{} |
| overset | overset{}{} |
| partial | del |
| power | ^{} |
| prodboth | prod_{}^{} |
| prodover | prod^{} |
| produnder | prod_{} |
| strikethrough | cancel{} |
| sumboth | sum_{}^{} |
| sumover | sum^{} |
| sumunder | sum_{} |
| tilde | tilde{} |
| towards | -> |
| underbrace | ubrace{}{} |
| underline | ul{} |
| underset | underset{}{} |
| vec | vec{} |


<br>

# What happens to "Old MILE"?

"Old MILE" will still exist as it's own branch on this repository. If you need, or want, a deployment of "Old MILE", please send an email to **Jah-On-Inquiry [at] pm [dot] me** or open an issue. 

### File extension table

| Extension | MILE Iteration/Code-Name  | Current Compatible | Deployment Link |
|-|-|-|-|
|`.majs`|`MASCII-JS` (**current**)|Yes|Coming soon!|
|`.mil` |`Old MILE`               |No |            |

<br>

# Why did I make this?

I have Cerebral Palsy which makes writing math, especially for prolonged periods of time, challenging. I wanted a tool that allows for faster typing to compensate for my slower typing, easier to memorize, allows for editing multiple problems within one app/windows, formats the problems neatly, exports easily to PDF (via the print subsystem) or prints directly, and is universally accessable across devices/operating systems.

# Statement on accessibility...

MILE aims at making math more accessible as a whole but currently focuses on making the typing experience as efficient as possible. Little to no testing has been done to ensure proper behavior with screen readers, Braille, and other modalities. That being said, I try to ensure that all visual elements (buttons, images, etc.) have text alternatives or descriptors. 

# Is there an "offline" version?

All work is saved locally and there is an offline portable version of MILE currently. However, the offline file cannot read projects from the github.io site and vise versa. 

# How do I save my work?

MILE now saves your projects inside of your browser! However, these files are not backed up so it is your responsibility to export individual projects to back them up or share among people/devices. 

# How can you help?

Please **kindly** report any bugs or provide format/operation/function suggestions! I am eager to hear form those with more advanced knowledge in math!

# Developer info

1. Make sure that Node.js and a package manager such as `npm` is installed
2. `npm install` to install the packages once
3. `npm run dev` to run it in development mode
4. `npm run build` to get a all-in-one, portable HTML file
