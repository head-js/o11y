```javascript
const analytics = window.analytics;

analytics.page();

{
  "type": "page",
  "messageId": "",
  "timestamp": "",
  "sentAt": "",
  "anonymousId": "",
  "context":{
    "library": {},
    "locale": "",
    "timezone": "",
    "page": { "path": "", "referrer":"", "search": "", "title": "", "url": "" },
    "userAgent": "",
    "userAgentData": {},
  },
  "properties": { "path": "", "referrer": "", "search": "", "title": "", "url": "" },
}

analytics.track('click', { 'hello': 'world' });

{
  "type": "track",
  "event": "click", <-
  "messageId": "",
  "timestamp": "",
  "sentAt": "",
  "anonymousId": "",
  "context":{
    "library": {},
    "locale": "",
    "timezone": "",
    "page": { "path": "", "referrer":"", "search": "", "title": "", "url": "" },
    "userAgent": "",
    "userAgentData": {},
  },
  "properties": { "hello": "world" },
}
```
