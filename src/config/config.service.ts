import * as Joi from 'joi';
import * as fs from 'fs';
import * as dotenv from 'dotenv';
import { Injectable } from '@nestjs/common';

export interface EnvConfig {
  [key: string]: any;
}

export enum Environment {
  development = 'development',
  production = 'production',
  test = 'test',
  provision = 'provision',
}

@Injectable()
export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor() {
    const NODE_ENV = process.env.NODE_ENV || Environment.development;
    const filePath = `${NODE_ENV}.env`;
    const config = dotenv.parse(fs.readFileSync(filePath));
    this.envConfig = this.validateInput({ ...config, NODE_ENV });
  }

  get databasePassword(): string {
    return this.envConfig.DATABASE_PASSWORD;
  }

  get databaseHost(): string {
    return this.envConfig.DATABASE_HOST;
  }

  get databasePort(): number {
    return this.envConfig.DATABASE_PORT;
  }

  get databaseUsername(): string {
    return this.envConfig.DATABASE_USERNAME;
  }

  get databaseName(): string {
    return this.envConfig.DATABASE_NAME;
  }

  get databaseSynchronize(): boolean {
    return this.envConfig.DATABASE_SYNCHRONIZE;
  }

  get databaseDropSchema(): boolean {
    return this.envConfig.DATABASE_DROP_SCHEMA;
  }

  get jwtSecret(): Environment {
    return this.envConfig.JWT_SECRET;
  }

  get env(): Environment {
    return this.envConfig.NODE_ENV;
  }

  get port(): Environment {
    return this.envConfig.PORT;
  }

  /**
   * Ensures all needed variables are set, and returns the validated JavaScript object
   * including the applied default values.
   */
  private validateInput(envConfig: any): EnvConfig {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      NODE_ENV: Joi.string()
        .valid(['development', 'production', 'test', 'provision'])
        .default('development'),
      PORT: Joi.number().default(3001),
      DATABASE_PASSWORD: Joi.string(),
      DATABASE_HOST: Joi.string().required(),
      DATABASE_PORT: Joi.number().required(),
      DATABASE_USERNAME: Joi.string().required(),
      DATABASE_NAME: Joi.string().required(),
      DATABASE_SYNCHRONIZE: Joi.boolean().required(),
      DATABASE_DROP_SCHEMA: Joi.boolean().default(false),
      JWT_SECRET: Joi.string().empty('').trim().required(),
    });

    const { error, value: validatedEnvConfig } = Joi.validate(envConfig, envVarsSchema, {
      allowUnknown: true,
    });
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    return validatedEnvConfig;
  }
}
