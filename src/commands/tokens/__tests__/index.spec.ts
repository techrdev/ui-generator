/* eslint-disable @typescript-eslint/await-thenable */
import { Arguments } from 'yargs';
import path from 'path';
import fs from 'fs-extra';
import { toMatchFile } from 'jest-file-snapshot';

import tokensCommand, { TokensCommandArguments } from '..';
import { MESSAGES } from '../consts';

expect.extend({ toMatchFile });

const args = (cwd: string, template: string, dest = ''): Arguments<TokensCommandArguments> => ({
  cwd,
  template,
  dest,
  $0: '_',
  _: [],
});

describe('Given the tokens command handler', () => {
  const tempThemesDir = path.resolve(__dirname, 'themes');
  const tempThemeWebPath = path.resolve(__dirname, 'themes/theme.fixture.css');
  const tempThemeJSONPath = path.resolve(__dirname, 'themes/theme.fixture.json');
  const snapFolder = path.resolve(__dirname, '__file_snapshots__');

  afterAll(async () => {
    await fs.remove(tempThemesDir);
  });

  describe('when a template has not `-template` in name', () => {
    it('should throw an error', async () => {
      const argv = args(__dirname, 'some-wrong');

      // OMG JEST and throw async is bad!
      try {
        await tokensCommand.handler(argv);
      } catch (error) {
        expect(error.message).toBe(MESSAGES.errors.templateNotCorrect);
      }
    });
  });

  describe('when template is provided correctly', () => {
    it('should create a themes folder with Web and JSON version of the tokens', async () => {
      const argv = args(__dirname, 'fixtures/theme-template.fixture.js', tempThemesDir);

      await tokensCommand.handler(argv);

      const webFileExist = await fs.pathExists(tempThemeWebPath);
      const jsonFileExist = await fs.pathExists(tempThemeJSONPath);

      expect(webFileExist).toBe(true);
      expect(jsonFileExist).toBe(true);
    });

    it('should match the snapshots', async () => {
      const webTheme = await fs.readFile(tempThemeWebPath, 'utf-8');
      const jsonTheme = await fs.readFile(tempThemeJSONPath, 'utf-8');

      expect(webTheme).toMatchFile(path.resolve(snapFolder, 'web.snapshot'));
      expect(jsonTheme).toMatchFile(path.resolve(snapFolder, 'json.snapshot'));
    });
  });
});
