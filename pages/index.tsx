import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDataProvider } from "@/providers/DataProvider";

export default function Home() {
  const router = useRouter();
  const { pluginData } = useDataProvider();

  useEffect(() => {
    const defaultTab = pluginData.tabs?.[0];
    const tabName = pluginData.tabdata?.[defaultTab]?.title;

    if (tabName) {
      router.replace(`/plugins/${tabName.toLowerCase()}`);
    }
  }, [pluginData, router]);

  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="Manage your plugins" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.webp" />
      </Head>

      <div>Loading plugin manager</div>
    </>
  );
}
