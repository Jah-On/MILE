# MILE

Editor for the Math Indicative Language (MIL)

Try it out [here](https://jah-on.github.io/MILE/)!

![image](https://user-images.githubusercontent.com/58399643/211452069-96e7ad1b-0512-4878-a065-2b4a7c1adae3.png)

Currently, the only out of the box way to use this program is through the above link. The all in one (AIO) generation system does not work properly in GitHub at the moment. 

# How do I save my work?

Use the export button on the main page to save a MIL file. Alternatively, you can download the all in one HTML file by pressing CTRL + S. Note that the all in one file is still buggy between browsers and needs improvement. 

# What is MIL?

MIL stands for Math Indicative Language and allows for more efficient math display typing compared to LaTeX or LibreOffice's Formula Object language. MIL is also more freely typed.

The two main ways that MIL is more efficient is firstly by using semicolons as invisible groupings compared to curly brackets in LibreOffice's FOL. Semicolons are more centrally located and do not require modifier keys. Secondly, all character math operations (i.e. + - \*) have shortened word equivalents. This means that no modifier key needs to be pressed besides for visible grouping to achieve the same output.

# Why did I make this?

I have Cerebral Palsy which makes writing math, especially for prolonged periods of time, challenging. I wanted a tool that allows for faster typing to compensate for my slower typing, easier to memorize, allows for editing multiple problems within one app/windows, formats the problems neatly, exports easily to PDF (via the print subsystem) or prints directly, and is universally accessable across devices/operating systems.

# Examples

![image](https://user-images.githubusercontent.com/58399643/211452137-4fe79896-bcad-4342-8134-4dc66675f4fa.png)
![image](https://user-images.githubusercontent.com/58399643/211452179-2d95a7bc-b5bf-4864-b011-cff5f6f22a15.png)

# Documentation

Download the documentation <a href="https://raw.githubusercontent.com/Jah-On/MILE/main/docs/DOCGEN.mil" download="DOCGEN.mil" target="_blank">MIL</a> file and import it in the editor.
A PDF version is being worked upon but working yet. 

# How can you help?

Please **kindly** report any bugs or provide format/operation/function suggestions! I am eager to hear form those with more advanced knowledge in math!

# Developer info

1. Make sure that Node.js and a package manager such as `npm` is installed
2. `npm install` to install the packages once
3. `npm run dev` to run it in development mode
4. `npm run build` to get a all-in-one, portable HTML file
