import { plainToInstance } from 'class-transformer'
import { validateSync, IsString, IsNumber, Min, Max } from 'class-validator'

class EnvironmentVariables {
  @IsString()
  DATABASE_HOST: string
  @IsNumber()
  @Min(0)
  @Max(65535)
  DATABASE_PORT: number
  @IsString()
  DATABASE_USERNAME: string
  @IsString()
  DATABASE_PASSWORD: string
  @IsString()
  DATABASE_NAME: string
  @IsString()
  JWTSECRET: string
  @IsString()
  PEPPER: string
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  })
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  })

  if (errors.length > 0) {
    throw new Error(errors.toString())
  }
  return validatedConfig
}

declare global {
  namespace NodeJS {
    interface ProcessEnv extends EnvironmentVariables {}
  }
}
