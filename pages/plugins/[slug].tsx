import styles from "@/styles/plugins.module.css";

import {
  CalendarIcon,
  CoinIcon,
  GridIcon,
  SwitchIcon,
} from "@/components/icons";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Toggle } from "@/components/Toggle";
import { useEffect } from "react";
import { useDataProvider } from "@/providers/DataProvider";

const IconMap = {
  "icon-marketing": <GridIcon />,
  "icon-finance": <CoinIcon />,
  "icon-people": <CalendarIcon />,
};

export default function Page() {
  const router = useRouter();
  const { pluginData, savePluginData } = useDataProvider();
  const allPluginsEnabled = !pluginData?.disableAllPlugins;

  const slug = router.query.slug as string;
  const tabId = Object.keys(pluginData?.tabdata || {}).find((key) => {
    return pluginData.tabdata[key].title.toLowerCase() === slug;
  });
  const tabDataForPlugin = pluginData.tabdata?.[tabId as string];
  const pluginList = [
    ...(tabDataForPlugin?.disabled || []),
    ...(tabDataForPlugin?.active || []),
    ...(tabDataForPlugin?.inactive || []),
  ];

  const handleToggleAllPlugins = (isActive: boolean) => {
    const newPluginData = { ...pluginData };
    newPluginData.disableAllPlugins = !isActive;

    savePluginData(newPluginData);
  };

  const handleToggle = (pluginId: string) => (isActive: boolean) => {
    const newPluginData = { ...pluginData };
    const tabData = newPluginData.tabdata[tabId as string];
    const activePlugins = new Set(tabData?.active || []);
    const inActivePlugins = new Set(tabData?.inactive || []);

    if (isActive) {
      activePlugins.add(pluginId);
      inActivePlugins.delete(pluginId);
    } else {
      inActivePlugins.add(pluginId);
      activePlugins.delete(pluginId);
    }

    tabData.active = Array.from(activePlugins);
    tabData.inactive = Array.from(inActivePlugins);
  };

  useEffect(() => {
    if (pluginData?.tabdata && !tabId) {
      router.push("/404");
    }
  }, [tabId, router, pluginData.tabdata]);

  if (!pluginData?.tabdata) return null;

  return (
    <>
      <Head>
        <title>Manage plugins</title>
        <meta name="description" content="Manage your plugins" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.webp" />
      </Head>

      <div className={styles.wrapper}>
        <aside
          className={`${styles.sidebar} ${
            allPluginsEnabled ? styles.pluginsEnabled : styles.pluginsDisabled
          }`}
        >
          <Link href="/" className={styles.logo}>
            Data
            <span>Guard</span>
          </Link>

          <nav className={styles.navigation}>
            {pluginData.tabs?.map((tab) => {
              const tabData = pluginData.tabdata[tab];
              const isActive =
                router.query.slug === tabData.title.toLowerCase();

              return (
                <Link
                  href={`/plugins/${tabData.title.toLowerCase()}`}
                  className={isActive ? styles.active : ""}
                  key={tab}
                >
                  {IconMap[tabData.icon as keyof typeof IconMap]}{" "}
                  {tabData.title}
                </Link>
              );
            })}
          </nav>

          <footer className={styles.sidebarFooter}>
            <p>All plugins {allPluginsEnabled ? "enabled" : "disabled"}</p>
            <Toggle
              onToggle={handleToggleAllPlugins}
              Icon={SwitchIcon}
              IconProps={{ className: styles.switchIcon }}
              hideLabel
              isActive={allPluginsEnabled}
            />
          </footer>
        </aside>

        <main className={styles.main}>
          <h1 className={styles.title}>{slug} plugins</h1>

          {pluginList.map((pluginId) => {
            const plugin = pluginData.plugins[pluginId];
            const isActive =
              pluginData.tabdata[tabId as string].active.includes(pluginId);
            const isDisabled =
              pluginData.disableAllPlugins ||
              pluginData.tabdata[tabId as string].disabled.includes(pluginId);

            return (
              <div
                key={pluginId}
                className={`${styles.plugin}${
                  isDisabled ? ` ${styles.disabled}` : ""
                }`}
              >
                <div className={styles.pluginInfo}>
                  <h2>{plugin.title}</h2>
                  <p>{plugin.description}</p>
                </div>

                <div className={styles.pluginAction}>
                  <Toggle
                    isActive={isActive}
                    onToggle={handleToggle(pluginId)}
                  />
                </div>
              </div>
            );
          })}
        </main>
      </div>
    </>
  );
}
