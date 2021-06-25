import Env from '@ioc:Adonis/Core/Env'

interface IUploadConfig {
  driver: 's3' | 'disk';
  config: {
    disk: {
      url: string;
      folder: string;
    };
    aws: {
      key: string;
      secret: string;
      bucket: string;
      region: string;
      folder: 'development' | 'production'
    };
  };
}

export default {
  driver: Env.get('STORAGE_DRIVER', 'disk'),
  config: {
    disk: {
      url: Env.get('APP_URL'),
      folder: Env.get('FOLDER_UPLOAD', 'uploads')
    },
    aws: {
      key: Env.get('AWS_ACCESS_KEY_ID'),
      secret: Env.get('AWS_SECRET_ACCESS_KEY'),
      bucket: Env.get('AWS_S3_BUCKET', 'auster-app'),
      region: Env.get('AWS_REGION'),
      folder: Env.get('NODE_ENV', 'development')
    },
  },
} as IUploadConfig;