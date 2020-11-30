export interface AppStorageVolume {
  host: string;
  container: string;
}

export interface AppDomains {
  enabled: boolean;
  vhosts: string[];
  globalEnabled: boolean;
  globalVhosts: string[];
}

export interface AppNetwork {
  attachPostCreate: string;
  attachPostDeploy: string;
  bindAllInterfaces: boolean;
  webListeners: string[];
}

export interface AppProxyPort {
  scheme: string;
  hostPort: number;
  containerPort: number;
}

export interface AppProxyInfo {
  enabled: boolean;
  portMap: string[];
  type: string;
}

export interface App {
  name: string;
  storage: AppStorageVolume[];
  domains: AppDomains;
  network: AppNetwork;
  proxyPorts: AppProxyPort[];
  proxyInfo: AppProxyInfo;
  processInfo: unknown;
}
