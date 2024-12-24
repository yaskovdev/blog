Объяснение CORS (Cross-Origin Resource Sharing) понятным, простым языком

Access-Control-Allow-Origin: https://developer.mozilla.org
Это говорит: "эй, браузер, к тому, что я (сервер) вернул в респонсе с этим хедором, можно давать доступ только JavaScript коду, который "крутится" на сайте https://developer.mozilla.org"
Основано на https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Origin.

In the preflight (aka OPTIONS) request the browser may send "Access-Control-Request-Headers: Content-Type", which means "May I pass Content-Type in the actual request?" And the server may reply with "Access-Control-Allow-Headers: Content-Type", which means "Okay, you may pass it." Same for HTTP methods.