import path from 'path';
import fs from 'fs-extra';
import cssbeautify from 'cssbeautify';
import yargs from 'yargs';

import { MESSAGES } from './consts';

export type TokensCommandArguments = {
  cwd: string;
  template: string;
  dest: string;
}

const webCSSTemplate = `
  :root {
    [vars]
  }
`;

const cwdPath = (cwd: string, ...givenPaths: string[]) => path.resolve(cwd, ...givenPaths);

const tokensCommand: yargs.CommandModule<Record<string, unknown>, TokensCommandArguments> = {
  command: 'tokens [template] [dest]',
  describe: 'Create a new Web and JSON theme given a template.',
  builder: {
    cwd: {
      description: 'CWD to run the CLI to',
      type: 'string',
      default: process.cwd(),
    },
    template: {
      description: 'A JS template file that is using our tokens',
      demandOption: true,
      type: 'string',
    },
    dest: {
      description: 'Destination where to save the final theme',
      default: 'themes',
    },
  },
  async handler(argv): Promise<void> {
    const { template, dest, cwd } = argv;
    if (!template.includes('-template')) {
      throw new Error(MESSAGES.errors.templateNotCorrect);
    }

    const templateJSONImport = await import(cwdPath(cwd, template));
    const templateJSON = { ...templateJSONImport.default };

    const outputName = path.basename(template).replace('-template', '').replace('.js', '');

    const pathToJSON = cwdPath(cwd, dest, `${outputName}.json`);
    const pathToWeb = cwdPath(cwd, dest, `${outputName}.css`);
    const webCSSVars = Object.keys(templateJSON).reduce((acc, key) => acc.concat(`--${key}: ${templateJSON[key]};\n`), '');

    await fs.ensureDir(cwdPath(cwd, dest));
    await fs.writeJSON(pathToJSON, templateJSON, { spaces: 2 });
    await fs.writeFile(pathToWeb, cssbeautify(webCSSTemplate.replace('[vars]', webCSSVars), { indent: '  ', autosemicolon: true }));

    process.stdout.write(MESSAGES.success.themeGenerated);
  },
};

export default tokensCommand;
