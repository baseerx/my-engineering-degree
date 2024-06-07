import { basename, resolve } from "path";
import { promises, readFileSync } from "fs";

import glob from "glob";
import { replaceInFile, ReplaceInFileConfig } from "replace-in-file";

const globSync = glob.sync;
const { rename, writeFile } = promises;

const cwd = resolve(__dirname, "..");
const content = resolve(cwd, "content");
const assets = resolve(cwd, "assets", "img");
const uploads = resolve(cwd, "uploads");

const updatePaths = async () => {
  const files = globSync("**/*.md", { cwd: content }).map((file) =>
    resolve(content, file)
  );
  const replaceOptions: ReplaceInFileConfig = {
    files,
    from: "image: /uploads/",
    to: "image: "
  };

  try {
    await replaceInFile(replaceOptions);

    console.info("[CONTENT-IMGS] [updatePaths] Image paths updates.");
    return;
  } catch (error) {
    throw `[updatePaths] ${error}`;
  }
};

const moveImages = async () => {
  const contImgs = globSync("**/*.{png,jpg,jpeg}", { cwd: content });
  const upImgs = globSync("**/*.{png,jpg,jpeg}", { cwd: uploads });

  try {
    const contOps = contImgs.map((img) => {
      const src = resolve(content, img);
      const dist = resolve(assets, basename(img));

      return rename(src, dist);
    });
    const upOps = upImgs.map((img) => {
      const src = resolve(uploads, img);
      const file = readFileSync(src);
      const dist = resolve(assets, img);

      return writeFile(dist, file);
    });

    await Promise.all([...contOps, ...upOps]);

    console.info(
      "[CONTENT-IMGS] [moveImages] Moved images from /uploads/ to /assets/img/."
    );
    return;
  } catch (error) {
    throw `[moveImages] ${error}`;
  }
};

(async () => {
  try {
    await updatePaths();
    await moveImages();

    process.exit(0);
  } catch (error) {
    console.error(`[CONTENT-IMGS] ${error}`);
    process.exit(1);
  }
})();
