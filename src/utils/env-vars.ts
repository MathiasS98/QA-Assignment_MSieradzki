export class EnvVars {
  static isEnvSet(envName: string): boolean {
    return !!process.env[envName];
  }

  static requireEnv(envName: string): string | never {
    if (this.isEnvSet(envName)) {
      return process.env[envName];
    }
    throw new Error(`Required env variable ${envName} is not set!`);
  }
}
