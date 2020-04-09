const checkEnvVariable = (val: any, msg: string, defaultVal?: string) => {
  if (val === null || val === undefined || val === '') {
    if (defaultVal) {
      console.warn(`${msg} use default: ${defaultVal}`);
      return defaultVal;
    }
    throw Error(msg);
  }
  return val;
};


export const API_KEY = checkEnvVariable(process.env.API_KEY, 'Api key not provided');
export const AUTH_DOMAIN = checkEnvVariable(process.env.AUTH_DOMAIN, 'auth domain not provided');
export const DATABASE_URL = checkEnvVariable(process.env.DATABASE_URL, 'db url not provided');
export const PROJECT_ID = checkEnvVariable(process.env.PROJECT_ID, 'project id not provided');
export const STORAGE_BUCKET = checkEnvVariable(process.env.STORAGE_BUCKET, 'storage not provided');
export const MESSAGING_SENDER_ID = checkEnvVariable(process.env.MESSAGING_SENDER_ID, 'msg sender id not provided');
export const APP_ID = checkEnvVariable(process.env.APP_ID, 'app id not provided');
export const MEASUREMENT_ID = checkEnvVariable(process.env.MEASUREMENT_ID, 'analytic id not provided');
