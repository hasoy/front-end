import URLS from "../constants/Host";

interface IStatusResponse {
  current_ingredient: string;
  pattern: {
    explanation: string;
    title: String;
    consensus?: boolean;
    haram?: boolean;
    schoolOfThought?: string[];
  };
}
// calls the backend to check the status of the ingredients. Expects ingredients seperated by commas
export const temporaryStatus = async (
  ingredientsSeperatedByCommas: string
): Promise<IStatusResponse[]> => {
  const url = `${URLS.HOST}${URLS.CHECK_STATUS}`;
  const formdata = new FormData();
  formdata.append("data", ingredientsSeperatedByCommas);
  const res = await fetch(url, { method: "POST", body: formdata, redirect: "follow" });
  const text = await res.json();
  return text;
};
