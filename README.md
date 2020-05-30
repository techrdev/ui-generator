# TECHR UI Generator

> Simple generator for UI stuff

## Usage

Firstly install it from GitHub Packages:

```bash
yarn add @thingstek/ui-generator
```

Then add a new command into your `package.json`. For example:

```json
...
"scripts": {
  "tokens": "techrui tokens my-theme-template.js myDestFolder"
}
...
```

And then just run:

```bash
yarn tokens
```

This will generate two output into `myDestFolder`:

- my-theme.css
- my-theme.json

### Template theme

A template theme is a JS file like this:

```js

const tokens = require('./your-tokens.json');

module.exports = {
  someBackground: tokens.some.of.your.color,
  anotherThing: tokens.another.of.your.thing,
  ...
}
```

### Output

Currently only two output are supported:

Web (CSS vars):

```css
:root {
  --someBackground: "#SOMETHING";
  --anotherThing: "#ANOTHER_THING";
  ...
}
```

JSON:
```json
{
  "someBackground": "#SOMETHING",
  "anotherThing": "#ANOTHER_THING",
  ...
}
```

## Development

Adding a new command is simple as add a new folder inside `src/commands` and start writing it 👌

The `command` folder should contain by default:

- `index.ts`
- `__tests__`

Other files can be added as helpers of the command and **must be tested** like the command itself.

### Run `dev`

You can run the CLI in dev mode just by running:

```bash
yarn dev [command] [theme-template.js] [destination]
```

Basically this will run `ts-node` against the `cli.js` file.

### Run tests

Jest is already configured to run with Typescript, just run:

```bash
yarn test
```

## Create a new release

For release the package we are currently using the GitLab link directly. Anyway `standard-version` is provided to just bump the version and push the tag automatically. In addition it will add a CHANGELOG.md, updating it every release, following this: [Conventional Commits](conventionalcommits.org/en/v1.0.0-beta.4/).

For releasing a new version just run:

```bash
yarn release
```

And then follow the guide from standard-version.



