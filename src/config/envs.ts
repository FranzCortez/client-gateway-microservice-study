import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  // PRODUCTOS_MICROSERVICE_HOST: string;
  // PRODUCTOS_MICROSERVICE_PORT: number;
  // ORDERS_MICROSERVICE_HOST: string;
  // ORDERS_MICROSERVICE_PORT: number;
  NATS_SERVER: string[];
}

const envSchema = joi
  .object({
    PORT: joi.number().required(),
    // ORDERS_MICROSERVICE_HOST: joi.string().required(),
    // ORDERS_MICROSERVICE_PORT: joi.number().required(),
    // PRODUCTOS_MICROSERVICE_HOST: joi.string().required(),
    // PRODUCTOS_MICROSERVICE_PORT: joi.number().required(),
    NATS_SERVER: joi.array().items(joi.string()).required(),
  })
  .unknown(true);

const { error, value } = envSchema.validate({
  ...process.env,
  NATS_SERVER: process.env.NATS_SERVER?.split(','),
});

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  // productosMicroserviceHost: envVars.PRODUCTOS_MICROSERVICE_HOST,
  // productosMicroservicePort: envVars.PRODUCTOS_MICROSERVICE_PORT,
  // ordersMicroserviceHost: envVars.ORDERS_MICROSERVICE_HOST,
  // ordersMicroservicePort: envVars.ORDERS_MICROSERVICE_PORT,
  natsServer: envVars.NATS_SERVER,
};
