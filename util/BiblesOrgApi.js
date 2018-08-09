import axios from "../node_modules/axios";
import apiKey from "./apiKey";

export default class BiblesOrgApi {
  static async versions() {
    return (await get("https://bibles.org/v2/versions.js")).versions;
  }

  static async books(versionId) {
    return (await get(`https://bibles.org/v2/versions/${versionId}/books.js`))
      .books;
  }

  static async chapters(bookId) {
    return (await get(`https://bibles.org/v2/books/${bookId}/chapters.js`))
      .chapters;
  }

  static async chapterText(chapterId) {
    const colonIndex = chapterId.indexOf(":");
    const query = chapterId.slice(colonIndex + 1).replace(".", "+");
    const version = chapterId.slice(0, colonIndex);
    return (await get(
      `https://bibles.org/v2/passages.js?q[]=${query}&version=${version}`
    )).search.result.passages[0];
  }

  static async verses(chapterId) {
    return (await get(`https://bibles.org/v2/chapters/${chapterId}/verses.js`))
      .verses;
  }
}

async function get(url) {
  return (await axios.get(url, {
    auth: {
      username: apiKey()
    }
  })).data.response;
}
