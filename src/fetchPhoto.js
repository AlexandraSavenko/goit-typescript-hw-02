import axios from "axios";
export const fetchPhoto = async (query, page = 1, perPage = 12) => {
  const responce = await axios.get(`https://api.unsplash.com/search/photos`, {
    headers: {
      Authorization: `Client-ID _M2rXGxlX9xDK1iu9GI31ka_JVewW7yHFos3Jc0kt_k`,
      "Accept-Version": "v1",
    },
    params: {
      query,
      page,
      per_page: perPage,
    },
  });
  return responce.data.results;
};
