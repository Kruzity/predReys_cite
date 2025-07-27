const getEnvVar = (name, defaultValue = '') => {
  return import.meta.env[name] || defaultValue;
};

const NODE_ENV = getEnvVar('VITE_NODE_ENV', 'stage');

const config = {
  stage: {
    AuthApiUri: getEnvVar('VITE_AUTH_API_URI', 'https://stageauth.predreysdoc.com/'),
    NsiApiUri: getEnvVar('VITE_NSI_API_URI', 'https://stagensi.predreysdoc.com/'),
  },
  prod: {
    AuthApiUri: getEnvVar('VITE_AUTH_API_URI', 'https://auth.predreysdoc.com/'),
    NsiApiUri: getEnvVar('VITE_NSI_API_URI', 'https://nsi.predreysdoc.com/'),
  }
};

export default config[NODE_ENV] || config.stage;

export const isStage = NODE_ENV === 'stage';
export const isProd = NODE_ENV === 'prod';
export const currentEnv = NODE_ENV;