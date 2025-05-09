// https://raw.githubusercontent.com/ajipaon/static-moslem/master/quran/surah/ar.muyassar/010.json
const staticUri =
  "https://raw.githubusercontent.com/ajipaon/static-moslem/master";

export const languageList = () => {
  return `${staticUri}/language/data.json`;
};

export const surahUrl = (edition: string, surah: string) => {
  return `${staticUri}/quran/surah/${edition}/${surah}.json`;
};

export const editionListUrl = () => {
  return `${staticUri}/quran/editions.json`;
};
