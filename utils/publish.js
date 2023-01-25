/*
 * Make sure to `npm install -D gh-pages`
 *
 * Then add the following to your package.json. You'll have to change the build part though.
 * "deploy": "vite build --base=/tgi-pages/ && node utils/publish.js"
 *
 * And make sure to set it to "type": "module" in the package.json
 * 
 * And then, deploy takes everything from the /dist/ folder and force-pushes it to the gh-pages branch
 */
import { publish } from "gh-pages";

publish("dist", { history: false, dotfiles: true }, (err) => {
  if (err) console.error(err);
  else console.log("Published to GitHub");
});
