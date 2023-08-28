import { PluginData } from "@/types";
import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const DataProviderContext = createContext<{
  pluginData: PluginData;
  savePluginData: (data: PluginData) => void;
} | null>(null);

export const DataProvider: FC<PropsWithChildren> = ({ children }) => {
  const [pluginData, setPluginData] = useState<PluginData>({} as PluginData);

  const fetchPluginData = async () => {
    try {
      const fetchRes = await fetch("/api/plugins");
      const pluginDataRes = await fetchRes.json();
      const { data } = pluginDataRes;

      setPluginData(data);
    } catch {
      setPluginData({} as PluginData);
    }
  };

  const savePluginData = async (data: PluginData) => {
    try {
      const fetchRes = await fetch("/api/plugins", {
        method: "POST",
        body: JSON.stringify(data),
      });
      const pluginDataRes = await fetchRes.json();
      const { data: responseData } = pluginDataRes;

      setPluginData(responseData);
    } catch {
      setPluginData({} as PluginData);
    }
  };

  useEffect(() => {
    fetchPluginData();
  }, []);

  return (
    <DataProviderContext.Provider value={{ pluginData, savePluginData }}>
      {children}
    </DataProviderContext.Provider>
  );
};

export const useDataProvider = () => {
  const context = useContext(DataProviderContext);

  if (!context) {
    throw new Error(
      "useDataProvider must be used within a DataProviderContext"
    );
  }

  return context;
};
