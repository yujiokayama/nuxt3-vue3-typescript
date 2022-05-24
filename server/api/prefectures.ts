import type { IncomingMessage, ServerResponse } from "http";

export type TPrefecture = {
  prefCode: number;
  prefName: string;
};

export type TResponsePrefecture = {
  message: string | null;
  result: TPrefecture[];
};

export default async (req: IncomingMessage, res: ServerResponse) => {
  const response: TResponsePrefecture = await $fetch(
    "https://opendata.resas-portal.go.jp/api/v1/prefectures",
    {
      headers: {
        "X-Api-Key": "xkQnzVoWWXsE0d2ubcIjpBIAHQbx3aJJ27HqxyjS",
      },
    }
  );
  return await response.result;
};
