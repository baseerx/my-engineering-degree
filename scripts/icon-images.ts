import { basename, resolve } from "path";
import { existsSync, promises, readFileSync } from "fs";

import glob from "glob";
import { replaceInFile, ReplaceInFileConfig } from "replace-in-file";

const globSync = glob.sync;
const { writeFile } = promises;

const cwd = resolve(__dirname, "..");
const assets = resolve(cwd, "uploads");
const templates = resolve(cwd, "layouts" ,"partials" ,"svg");

const genTemplates = async () => {
  const svgs = globSync("**/*.svg", { cwd: assets })

  try {
    const transferOps = svgs.map((svg) => {
      const src = resolve(assets, svg);
      const dist = resolve(templates, `${basename(svg, ".svg")}.html`);
      if (existsSync(dist)) {
        const contents = readFileSync(src);

        return writeFile(dist, contents);
      }
    });

    await Promise.all(transferOps);

    console.info(
      "[ICONS-IMGS] [genTemplates] Generated templates from images."
    );
    return;
  } catch (error) {
    throw `[genTemplates] ${error}`;
  }
};

const cleanTemplates = async () => {
  const files = globSync("**/*.html", { cwd: templates }).map((file) =>
    resolve(templates, file)
  );
  const replaceOptions: ReplaceInFileConfig = {
    files,
    from: /<\?xml.*\n?<!DOCTYPE.*\n?.*\n?<svg/g,
    to: "<svg"
  };

  try {
    await replaceInFile(replaceOptions);

    console.info("[ICONS-IMGS] [cleanTemplates] Templates cleaned.");
    return;
  } catch (error) {
    throw `[cleanTemplates] ${error}`;
  }
};

(async () => {
  try {
    await genTemplates();
    await cleanTemplates();

    process.exit(0);
  } catch (error) {
    console.error(`[ICON-IMGS] ${error}`);
    process.exit(1);
  }
})();
