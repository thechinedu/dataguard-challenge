import pluginDataJSON from "@/data/plugins.json";

import { PluginDataResponse } from "@/types";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PluginDataResponse>
) {
  if (req.method === "POST") {
    const reqBody = JSON.parse(req.body);
    const result = { data: reqBody } as PluginDataResponse;

    res.status(200).json(result);
    return;
  }

  res.status(200).json(pluginDataJSON);
}
