import os

def main():
    with open("MILE.html", "rb") as fileIO:
        base_html = fileIO.read()
    base_html = base_html.replace(b'        <link rel="stylesheet" href="./MILE.css">\n', b'')
    with open("MILE.css", "rb") as fileIO:
        base_css = fileIO.read()
    output_html = base_html.replace(b'/*INSERT_CSS*/', base_css)
    joined_js = b''
    for js_file in os.listdir("js/"):
        with open("js/" + js_file, "rb") as fileIO:
            base_js = fileIO.read()
        while ((base_js.find(b'import ') != -1) & ((base_js.find(b'export ') == -1))):
            base_js = base_js[base_js.find(b'\n') + 1:]
        if (base_js.find(b'import ') != -1):
            base_js = base_js[base_js.find(b'export '):]
        while (base_js.find(b'export ') != -1):
            base_js = base_js.replace(b'export ', b'')
        joined_js += base_js
    
    while (joined_js[0] == 10):
        joined_js = joined_js[1:]
    
    output_html = output_html.replace(b'//INSERT_JS//', joined_js)

    module_location = output_html.find(b'<script type="module"')
    while (module_location != -1):
        output_html = output_html[:module_location - 8] + output_html[module_location:]
        module_location = output_html.find(b'<script type="module"')
        output_html = output_html.replace(output_html[module_location:output_html[module_location:].find(b'</script>') + module_location + 10], b'')
        module_location = output_html.find(b'<script type="module"')

    with open("MILE_AIO.html", "wb") as fileIO:
        fileIO.write(output_html)

if __name__ == "__main__":
    main()