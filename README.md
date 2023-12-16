# MILE

Math Inclusive Live Editor

<!-- Try it out [here](https://jah-on.github.io/MILE/)! -->

# Is MILE/MIL stable?

This branch should not be considered stable, yet! If you want to use a stable version, see the "Old MILE" branch.

# Why did I make this?

I have Cerebral Palsy which makes writing math, especially for prolonged periods of time, challenging. I wanted a tool that allows for faster typing to compensate for my slower typing, easier to memorize, allows for editing multiple problems within one app/windows, formats the problems neatly, exports easily to PDF (via the print subsystem) or prints directly, and is universally accessable across devices/operating systems.

# Statement on accessibility...

MILE aims at making math more accessible as a whole but currently focuses on making the typing experience as efficient as possible. Little to no testing has been done to ensure proper behavior with screen readers, Braille, and other modalities. That being said, I try to ensure that all visual elements (buttons, images, etc.) have text alternatives or descriptors. 

# Is there an "offline" version?

All work is saved locally and there is an offline portable version of MILE currently. However, the offline file cannot read projects from the github.io site and vise versa. 

# How do I save my work?

MILE now saves your projects inside of your browser! However, these files are not backed up so it is your responsibilty to export individual projects to back them up or share among people/devices. 

# Documentation

Download the documentation <a href="https://raw.githubusercontent.com/Jah-On/MILE/main/docs/DOCGEN.mil" download="DOCGEN.mil" target="_blank">MIL</a> file and import it in the editor.
An autogenerated PDF version is being worked upon but does not work yet. 

# How can you help?

Please **kindly** report any bugs or provide format/operation/function suggestions! I am eager to hear form those with more advanced knowledge in math!

# Developer info

1. Make sure that Node.js and a package manager such as `npm` is installed
2. `npm install` to install the packages once
3. `npm run dev` to run it in development mode
4. `npm run build` to get a all-in-one, portable HTML file
