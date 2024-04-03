import _url from './_url';


export default function sendBeacon(endpoint, query = {}, form = {}) {
  if (!navigator.sendBeacon) return false;
  if (!Blob) return false;
  if (!URLSearchParams) return false;

  const url = _url(endpoint, query);
  const payload = (new URLSearchParams(form)).toString();

  // https://github.com/w3c/beacon/issues/10
  // https://stackoverflow.com/a/56646623/707580
  // 即使不考虑关于跨域的复杂配置，仅从性能出发也应该使用简单请求，从而少发送一次 OPTIONS
  const data = new Blob([ payload ], { type: 'application/x-www-form-urlencoded' }); // eslint-disable-line array-bracket-spacing

  return navigator.sendBeacon(url, data);
}
