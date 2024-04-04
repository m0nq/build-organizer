# Build Organizer - Project

## Drag & drop json files to organize various build stages in relation to it's phase

- A brief summary of your approach.
    - I wanted to take as simple of an approach from a users experience as possible. A user can both click on the file
      uploader target area as well as drag and drop files.
    - The processing of the files itself was the most complex part. I could've broken down the `processFiles` function
      into smaller, more readable functions. But it was important to ensure the ordering of the possible phases was
      created first.
- What assumptions did you make while working on this problem?
    - I assumed that the order of the phases would change, so accounted for variable phase ordering. I also assumed
      there would be a `phases.json` file present in order to determine the stages for each phase.
- Time spent (this will not be used to judge your submission, but purely for us to track candidate experience).
    - About 4 days

<!-- GETTING STARTED -->

## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Installation

_Below is an example of how you can instruct your audience on installing and setting up your app. This template doesn't
rely on any external dependencies or services._

1. Clone or download the repo
   ```sh
   git clone https://github.com/your_username_/Project-Name.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
4. Run build to host app natively,
   ```sh
   npm run build
   ``` 
   or type
   ```sh
   npm run dev
   ```
   to run the app in development mode and view page on `localhost:5173`

<p align="right">(<a href="#readme-top">back to top</a>)</p>
