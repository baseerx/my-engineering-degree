# Documentation

## Data

All subpages carry their own copy and data. Meaning, everything you see on a subpage is taken from the file itself. Even the footer and header menus are generated from data in the `./content/` directory. With the exception of the homepage, funnel widget, and programs page. These utilize the data files located in the `./data/` directory. These are easily accessible through the CMS' **Data** section.

## Content

Every page (other than the homepage) is rendered from a Markdown file located somewhere in the `./content/` directory. The routing for the site is determined by the directory structure. For example:
```
./content/careers/dental-assistant/_index.md --> toptradeschools.com/content/careers/dental-assistant/

./content/careers/dental-assistant/career-overview.md --> toptradeschools.com/content/careers/dental-assistant/career-overview/
```

> **Note:** Files named `index.md` or `_index.md` will render as the homepage for the parent folder, as seen in the first above example. The difference between the two files is that the file prefixed with `_` will act as a List Template (Section). While the route will be the same regardless, Hugo will use completely different templates to render the page. So make sure this is intentional and reserve the use of `_index.md` for folders containing other pages _only_.

New pages can be created from the CMS.

## Images

There 2 types of images on the site:

### Static

Static images for content pages are stored in Cloudinary. These can easily be uploaded via the CMS for the page itself. Every page has an image uploader labeled **Image**. To add a new image:

- Click on the input field. If there's an existing image, click on the image.
- Select "Explore existing files".
- From the topmost dropdown, select the Cloudinary account named `damruetek`.
- Click on the "Add asset" button

From there, a Cloudinary modal will come up allowing you to either select an existing image or upload a new one.

A **PNG** is prefered. This is because the best resolution of the image is needed to generate the correct set of formats and resolutions. All images need to be below 10MB or they will be rejected by Cloudinary.

### Homepage Icons

Icons are used on the Career Slider on the homepage. They are a little different. These are SVGs, which have hover/focus animations. To achieve this, inlined SVGs are needed. However, the only way to inline an SVG with Hugo is via an HTML partial.

There is a script that runs at build time that will extract SVGs and convert them into HTML for Hugo to use. But they need to be uploaded to the correct directory.

For every Career section on the CMS, you'll be able to upload its corresponding icon via the Icon uploader located on every `_index.md` file for each Career. This will send the icon to the correct folder and Hugo will take care of the rest.

To add a new image:

- Click on the input field. If there's an existing image, click on the image.
- Select "Upload a new file" or "Explore existing files".
- Pick a file from your local machine or an existing one.

After you're done making changes, you can hit Save.

> **Note:** The icon _must_ be named properly for this process to work. It will need to match the slug for the page. That is, if the Career is Dental Assistant, then the file should be named dental-assistant.svg respectively.

### Career Overview Icons

Unlike the Homepage slider icons, these are PNGs and can be seen on individual Career pages. Files for these icons can be found on the `assets/img/icons` directory.

Just like the Homepage Icons, these follow a strict naming convention. The name of the file must match the name of the various career file names. Like so:
```md
- career-overview.md = career-overview.png
- certification.md = certification.png
- education-and-training.md = education-and-training.png
- how-to-become.md = how-to-become.png
- licensing-and-certification.md = licensing-and-certification.png
- salary-and-career-outlook.md = salary-and-career-outlook.png
```

Once an icon is placed in the `icons` directory, Hugo will understand that icon corresponds to it's parent page. No further action is needed.

#### Icon Titles

Under ever icon is a corresponding title. This title is directly taken from the page title itself. For example, what ever title is used on `education-and-training.md`, will be used as the title for the icon on the slider.

## Icon Sliders

These are generated based on the corresponding content directory. For example, Career icons utilize the `content/careers` directory. Hugo loops over every page in the directory and sorts them by the `weight` attribute in ascending order. From there, icons and titles are picked up as explained on the [Images](#images) section.