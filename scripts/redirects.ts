import { promises } from "fs";
import { resolve } from "path";

const { readdir, writeFile } = promises;

const cwd = resolve(__dirname, "..");
const content = resolve(cwd, "content", "careers");
const routing = resolve(cwd, ".cloudcannon");

const staticRedirects = [
  {
    from: "/(.*).html",
    status: 301,
    to: "/",
  },
  {
    from: '/_media_/(.*)',
    status: 301,
    to: '/'
  },
  {
    from: '/(.*)/index-md/',
    status: 301,
    to: '/'
  },
  {
    from: '',
    status: 301,
    to: '/'
  },
  {
    from: '/careers/(.*)/career-overview',
    status: 301,
    to: '/careers/$1/career-overview/'
  },
  {
    from: '/careers/(.*)/(.*)-career-overview/',
    status: 301,
    to: '/careers/$1/career-overview/'
  },
  {
    from: '/careers/',
    status: 301,
    to: '/near-you/'
  },
  {
    from: '/near-you',
    status: 301,
    to: '/near-you/'
  },
  {
    from: "/tags/",
    status: 301,
    to: "/",
  },
  {
    from: "/categories/",
    status: 301,
    to: "/",
  },
];

const createRedirects = async () => {
  try {
    const listRoutes = await readdir(content);
    const routes = listRoutes
      .filter(route => route !== '_index.md')
      .filter(route => route !== '.DS_Store')
      .map(route => ({
        from: `/careers/${route}/`,
        status: 301,
        to: `/careers/${route}/career-overview/`,
      }));
      const config = JSON.stringify(
        {
          routes: [
            ...routes,
            ...staticRedirects,
          ]
        },
        null,
        2
      );

    await writeFile(resolve(routing, "routing.json"), config);

    console.info(`[REDIRECTS] Updated redirects file.`);
    return
  } catch (error) {
    console.error(`[REDIRECTS] ${error}`);
    return;
  }
};

(async () => {
  try {
    await createRedirects();

    process.exit(0);
  } catch (error) {
    process.exit(1);
  }
})();
