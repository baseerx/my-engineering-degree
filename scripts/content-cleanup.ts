import { resolve } from "path";

import glob from "glob";
import { replaceInFile, ReplaceInFileConfig } from "replace-in-file";

const globSync = glob.sync;

const cwd = resolve(__dirname, "..");
const content = resolve(cwd, "content");

(async () => {
  const files = globSync("**/*.md", { cwd: content }).map((file) =>
    resolve(content, file)
  );
  const replaceOptions: ReplaceInFileConfig = {
    files,
    from: [
      /highlight:\n/g,
      /\|<br>/g,
      /\\\|/g,
      /\s?&nbsp;/g,
      /\[(\*+)([a-zA-Z\s-]+)\*+\]\(((?:https?|ftp):\/\/[^\s/$.?#].[^\s]*)\)/g,
      /([a-z])(\*+)\[/g,
      /\)(\*+)([a-z])/g,
      /\)([a-zA-Z])/g,
    ],
    to: [
      'highlight: false\n',
      '|\n',
      '|',
      '',
      '$1[$2]($3)$1',
      '$1 $2[',
      ')$1 $2',
      ') $1',
    ],
  };

  try {
    await replaceInFile(replaceOptions);

    console.info("[CONTENT-CLEANUP] Faulty content updated.");
    process.exit(0);
  } catch (error) {
    console.error(`[CONTENT-CLEANUP] ${error}`);
    process.exit(1);
  }
})();
