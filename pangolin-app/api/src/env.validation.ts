import { plainToInstance } from 'class-transformer'
import {
  validateSync,
  IsOptional,
  IsString,
  IsNumber,
  Min,
  Max,
  IsUrl,
  ValidateIf,
} from 'class-validator'

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
  @IsUrl({ require_tld: false })
  TRUSTED_ORIGINS: string

  @IsOptional()
  @IsString()
  NODE_ENV?: string
  @ValidateIf((o) => o.NODE_ENV === 'test')
  @IsString()
  TEST_DATABASE_HOST: string
  @ValidateIf((o) => o.NODE_ENV === 'test')
  @IsNumber()
  @Min(0)
  @Max(65535)
  TEST_DATABASE_PORT?: number
  @ValidateIf((o) => o.NODE_ENV === 'test')
  @IsString()
  TEST_DATABASE_USERNAME?: string
  @ValidateIf((o) => o.NODE_ENV === 'test')
  @IsString()
  TEST_DATABASE_PASSWORD?: string
  @ValidateIf((o) => o.NODE_ENV === 'test')
  @IsString()
  TEST_DATABASE_NAME?: string
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
    interface ProcessEnv extends EnvironmentVariables {
      NODE_ENV?: 'test'
    }
  }
}
