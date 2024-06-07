import { promises } from 'fs';
import { resolve } from 'path';

import glob from 'glob';

const globSync = glob.sync;
const { rename } = promises;

const cwd = resolve(__dirname, '..');
const content = resolve(cwd, 'content', 'careers');

const cleanupIndexFiles = async () => {
  try {
    const indexFiles = globSync('index.md', { cwd: content }).map(file =>
      resolve(content, file)
    );

    if (indexFiles.length === 0) {
      console.info('[PAGE-CLEANUP] No index files needing correction.');
      return;
    }

    const corrOps = indexFiles.map(file => {
      const src = resolve(content, file);
      const dist = resolve(content, file.replace('index.md', '_index.md'));

      return rename(src, dist);
    });

    await Promise.all(corrOps);

    console.info(`[PAGE-CLEANUP] ${indexFiles.length} index files corrected.`);
    return;
  } catch (error) {
    console.error(`[PAGE-CLEANUP] ${error}`);
    return;
  }
};
const cleanupRouteFiles = async () => {
  try {
    const routeFiles = globSync('**/*.md', {
      cwd: content,
    }).filter(file => !file.includes('index.md'));

    if (routeFiles.length === 0) {
      console.info('[PAGE-CLEANUP] No route files needing correction.');
      return;
    }

    const corrOps = routeFiles.map(file => {
      const src = resolve(content, file);

      const parts = file.split('/');
      const prepend = parts[0];
      const filename = parts[1];
      const cleanFilename = filename
        .replace(`${prepend}-`, '')
        .replace('salary-career-outlook.md', 'salary-and-career-outlook.md')
        .replace('education-training.md', 'education-and-training.md')
        .replace('licensing-certification.md', 'licensing-and-certification.md')
        .replace(/(how-to-become)-.*/g, 'how-to-become.md');
      const cleanRoute = `${prepend}/${cleanFilename}`;

      const dist = resolve(content, cleanRoute);

      return rename(src, dist);
    });

    await Promise.all(corrOps);

    console.info(`[PAGE-CLEANUP] ${routeFiles.length} route files corrected.`);
    return;
  } catch (error) {
    console.error(`[PAGE-CLEANUP] ${error}`);
    return;
  }
};

(async () => {
  try {
    await cleanupIndexFiles();
    await cleanupRouteFiles();

    process.exit(0);
  } catch (error) {
    process.exit(1);
  }
})();
