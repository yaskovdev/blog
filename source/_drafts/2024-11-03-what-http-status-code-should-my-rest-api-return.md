---
layout: post
title: "What HTTP Status Code Should My REST API Return?"
date: 2024-11-03 14:20:19
show_date: true
categories: [ development ]
comments: true
excerpt: "500, 400 and 404 are all you need."
---

What HTTP status code should my REST API return? It is the question that developers ask themselves surprisingly often. Or maybe it's not that surprising: after all, the popularity of RESTful services is growing, errors always happen and there exist [a few dozens](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#client_error_responses) of the `4xx` and `5xx` status codes (the list keeps growing).

# The Simple Rule

Just like in the real life, if crap happens, first thing you need to ask is: who is to blame for what has happened?

There are only two possible answers: either the client or the server. Usually it is very easy to figure out which is guilty.

If the server is to blame, return `500`.

If the client is to blame, return `400`. 

It is also very common to treat a situation when the client requested a non-existing resource separately, so you can return `404` in this case.

Modern frameworks for building REST APIs (like Spring or ASP.NET) provide a way to map custom exceptions to HTTP status codes. You can introduce the next custom exception and map them in this way:

| Custom Exception            | HTTP Status Code |
|-----------------------------|------------------|
| `ServerErrorException`      | `500`            |
| `ClientErrorException`      | `400`            |
| `ResourceNotFoundException` | `404`            |

# To Summarize

Keep things simple. No need to invent complex rules trying to figure out whether it is a "business" or a "technical" error and then to try to find the HTTP codes to map those categories to.

Do not try to be too specific about what happened: there is no requirement for you to utilize all the existing HTTP error codes.

`500`, `400` and `404` are all you need. Keep things simple as long as possible and only make them more complex if it's absolutely necessary.
