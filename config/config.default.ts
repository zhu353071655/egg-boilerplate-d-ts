'use strict';

import { EggAppConfig, PowerPartial } from 'egg';

export interface BizConfig {
  sourceUrl: string;
  news: {
    pageSize: number;
    serverUrl: string;
  };
  logger: {
    level?: 'info' | 'all';
    aaaa: boolean
  };
  test: string,
  test2: {
    aa: boolean
  }
  local: {
    msg: number
  }
}

export default function(appInfo: EggAppConfig) {
  const config = {} as PowerPartial<EggAppConfig> & BizConfig;

  config.keys = appInfo.name + '123123';

  config.middleware = [ 'uuid' ];

  config.security = {
    csrf: {
      ignore: '123',
    },
  };

  config.customLoader = {
    model: {
      directory: 'app/model',
      inject: 'app',
      caseStyle: 'upper',
    },
  };

  config.redis = {
    client: {
      port: 6379,          // Redis port
      host: '127.0.0.1',   // Redis host
      password: '',
      db: 0,
    },
  };
  config.test = 'xxxx'
  config.test2 = {
    aa: true
  }
  config.logger = {
    level: undefined,
    aaaa: true
  }
  config.local = {
    msg: 111
  }
  return config
  // const bizConfig = {
  //   local: {
  //     msg: 'local',
  //   },

  //   uuid: {
  //     name: 'ebuuid',
  //     maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
  //   },
  // };

  // return {
  //   ...config as {},
  //   ...bizConfig,
  // };
}
