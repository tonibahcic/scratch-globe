import {getCountries} from "../Countries/conutries";

const getFlagUrls = () => {
  let baseUrl = "https://cdn.jsdelivr.net/gh/lipis/flag-icons@6.7.0/flags/4x3/XX.svg"
  return getCountries().slice(0,500).map(c => {
    let url = baseUrl.replace("XX", c.flagCode.toLowerCase())
    return {
      code: c.flagCode.toLowerCase(),
      url: url
    }
  })
}

const flagUrls: any[] = getFlagUrls();

const promises = () => flagUrls.map(urlMap => {
  // TODO: Try get from local storage / cache
  return fetch(urlMap.url)
    .then((response) => response.blob())
    .then(async blob => {
      let text = await blob.text()
      // TODO: Save to local storage / cache
      return {
        code: urlMap.code,
        svg: btoa(text)
      } as Flag
    });
})

// TODO: Promise.all() fails fast, one request would mean all requests failed
export let flags: Flag[] = await Promise.all(promises())

interface Flag {
  code: string,
  svg: string
}

