export type PluginData = {
  tabs: string[];
  tabdata: {
    [key: string]: {
      title: string;
      icon: string;
      active: string[];
      disabled: string[];
      inactive: string[];
    };
  };
  plugins: {
    [key: string]: {
      title: string;
      description: string;
    };
  };
  disableAllPlugins?: boolean;
};

export type PluginDataResponse = {
  data: PluginData;
};
