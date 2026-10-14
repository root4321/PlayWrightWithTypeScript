import fs from 'fs';
import path from 'path';

export interface LoginDataset {
  url?: string;
  userEmail: string;
  userPassword?: string;
  expectedUrlPart?: string;
  expectedIndicator?: string;
  expectedErrorMessage?: string;
}

export interface LoginDataFile {
  positiveUser: LoginDataset;
  negativeUser: LoginDataset;
  [key: string]: LoginDataset | any;
}

export class JsonReader {
  /**
   * Reads and parses any JSON file from a project-relative or absolute path.
   * @param relativeOrAbsolutePath Path to the JSON file
   */
  public static readJson<T = any>(relativeOrAbsolutePath: string): T {
    const resolvedPath = path.isAbsolute(relativeOrAbsolutePath)
      ? relativeOrAbsolutePath
      : path.resolve(process.cwd(), relativeOrAbsolutePath);

    if (!fs.existsSync(resolvedPath)) {
      throw new Error(`JSON file not found at path: ${resolvedPath}`);
    }

    try {
      const fileData = fs.readFileSync(resolvedPath, 'utf-8');
      return JSON.parse(fileData) as T;
    } catch (error) {
      throw new Error(`Failed to parse JSON file at ${resolvedPath}: ${(error as Error).message}`);
    }
  }

  /**
   * Reusable helper to get login data sets from the default loginData.json.
   * @param datasetKey Optional key such as 'positiveUser' or 'negativeUser'
   */
  public static getLoginData<K extends keyof LoginDataFile>(datasetKey?: K): LoginDataFile[K] {
    const allData = this.readJson<LoginDataFile>('src/test-data/loginData.json');
    if (datasetKey) {
      const selected = allData[datasetKey];
      if (!selected) {
        throw new Error(`Dataset key "${String(datasetKey)}" not found in loginData.json`);
      }
      return selected;
    }
    return allData as any;
  }
}
