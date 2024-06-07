# Top Trade Schools

A portal that helps people find programs and schools near them.

## [Documentation](https://github.com/ChalantVentures/career-portal/blob/main/DOCS.md)

## References

- [AllAlliedHealthSchools](https://www.allalliedhealthschools.com/)
- [LearnHowToBecome](https://www.learnhowtobecome.org/)
- [MedicalTecnhologySchools](https://www.medicaltechnologyschools.com)
- [NaturalHealers](https://www.naturalhealers.com/)
- [CareerExplorer](https://www.careerexplorer.com/)

## Stack

- [Hugo](https://gohugo.io) (v0.93.0+)
- [Tailwind](https://tailwindcss.com)
- [CloudCannon](https://tailwindcss.com)

## Getting Started

Dependencies run on Node v16.15.1 and it's recommended that you utilize this specific version. A `.nvmrc` file is located in the repo with the specified version. You can use [nvm](https://github.com/nvm-sh/nvm) or [fnm](https://github.com/Schniz/fnm) to install this version on the local environment.


Once you're on the right Node version, you can install the npm dependencies:
```
npm install
```

Make sure you have [Hugo v0.93.0 or higher installed](https://gohugo.io/installation/). After that, you can run the production build command to test that everything you need is installed and working:
```
npm run build:prod
```

To run the local server, you can use the start command:
```
npm run start
```
This will run a few scripts in parallel before Hugo starts, then run the Tailwind watcher alongside Hugo.
