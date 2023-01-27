import imgkit
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
import time

tableOutput = "| Key word or symbol | Output |\n| :----------------: | :----: |\n"

left_no_arg = ["ens", "infinity", "ins", "nns", "\'", "prime", "rans", "rens"]

left_one_arg = ["abs", "coprod", "int", "iint", "iiint", "lim", "liminf", "limsup", "lint", "llint", "lllint", "-", "minus", "neg", "+", "plus", "prod", "sum", "sqrt"]

left_two_arg = ["coprodo", "coprodu", "frac", "into", "intu", "iinto", "iintu", "iiinto", "iiintu", "limo", "limu", "liminfo", "liminfu", "limsupo", "limsupu", "linto", "lintu", "llinto", "llintu", "lllinto", "lllintu", "logbase", "sumo", "sumu", "prodo", "produ"]

left_tri_arg = ["coprodb", "intb", "iintb", "iiintb", "limb", "liminfb", "limsupb", "lintb", "llintb", "lllintb", "prodb", "sumb"]

midl_two_arg = ["and", "approx", "cdot", "cminus", "cns", "copen", "cplus", "cslash", "ctimes", "def", "div", "|", "divides", "dlarrow", "dlrarrow", "drarrow", "=", "equals", "equiv", ">", "gthan", "gethan", "geslant", "/", "imgof", "in", "intersect", "<", "lthan", "lethan", "leslant", ">>", "mgthan", "<<", "mlthan", "ndivides", "notin", "noteq", "nprec", "nsubset", "nsubsete", "nsucc", "nsupset", "nsupsete", "owns", "or", "origof", "ortho", "parallel", "^", "pow", "prec", "preceq", "precsim", "prop", "setm", "setq", "sim", "simeq", "stimes", "subset", "subsete", "succ", "succeq", "succsim", "supset", "supsete", "*", "times", "toward", "union", "xtimes"]

driver = webdriver.Firefox()
driver.get("https://jah-on.github.io/MILE/")

time.sleep(3)

nameInput = driver.find_element(By.ID, "baseForm").find_element(By.TAG_NAME, "input")
nameInput.send_keys("1")
nameInput.send_keys(Keys.ENTER)

time.sleep(1)

driver.find_elements(By.CLASS_NAME, "editProblem")[4].click()

time.sleep(3)

MILInput = driver.find_element(By.ID, "1")

for fn in left_no_arg:
    MILInput.clear()
    MILInput.send_keys(fn)
    time.sleep(0.1)
    driver.execute_script("document.getElementsByClassName('segment')[0].style.padding = '5px';")
    with open("images/" + fn + ".png", "wb") as fileIO:
        fileIO.write(driver.find_element(By.CLASS_NAME, "segment").screenshot_as_png)
    tableOutput += "| " + fn + " | ![" + fn + "](images/" + fn + ".png) |\n"

for fn in left_one_arg:
    MILInput.clear()
    MILInput.send_keys(fn + " x")
    time.sleep(0.1)
    driver.execute_script("document.getElementsByClassName('segment')[0].style.padding = '5px';")
    with open("images/" + fn + ".png", "wb") as fileIO:
        fileIO.write(driver.find_element(By.CLASS_NAME, "segment").screenshot_as_png)
    tableOutput += "| " + fn + " | ![" + fn + "](images/" + fn + ".png) |\n"

for fn in left_two_arg:
    MILInput.clear()
    MILInput.send_keys(fn + " x y")
    time.sleep(0.1)
    driver.execute_script("document.getElementsByClassName('segment')[0].style.padding = '5px';")
    with open("images/" + fn + ".png", "wb") as fileIO:
        fileIO.write(driver.find_element(By.CLASS_NAME, "segment").screenshot_as_png)
    tableOutput += "| " + fn + " | ![" + fn + "](images/" + fn + ".png) |\n"

for fn in left_tri_arg:
    MILInput.clear()
    MILInput.send_keys(fn + " x y z")
    time.sleep(0.1)
    driver.execute_script("document.getElementsByClassName('segment')[0].style.padding = '5px';")
    with open("images/" + fn + ".png", "wb") as fileIO:
        fileIO.write(driver.find_element(By.CLASS_NAME, "segment").screenshot_as_png)
    tableOutput += "| " + fn + " | ![" + fn + "](images/" + fn + ".png) |\n"

for fn in midl_two_arg:
    MILInput.clear()
    MILInput.send_keys("x " + fn + " y")
    time.sleep(0.1)
    driver.execute_script("document.getElementsByClassName('segment')[0].style.padding = '5px';")
    with open("images/" + fn + ".png", "wb") as fileIO:
        fileIO.write(driver.find_element(By.CLASS_NAME, "segment").screenshot_as_png)
    tableOutput += "| " + fn + " | ![" + fn + "](images/" + fn + ".png) |\n"


print(tableOutput)

driver.close()