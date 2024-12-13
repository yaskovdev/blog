---
layout: post
title: "Which HTTP Status Code Should My REST API Use For Errors?"
date: 2024-12-07 18:39:16
show_date: true
categories: [ development ]
comments: true
excerpt: "500, 400 and 404 are all you need."
---

Which HTTP status code should my REST API return in case of an error?

This is a question that developers ask themselves surprisingly often. Or perhaps it's not that surprising: after all, the popularity of RESTful services keeps growing, errors always happen, and there exist [a few dozens](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#client_error_responses) of the `4xx` and `5xx` status codes.

{% asset_img client-vs-server.png Client Vs. Server %}

# Who is to Blame?

Just like in real life, when crap happens, the first thing you might ask is: __who is to blame for this__?

In this instance, there are only two possible answers: either the client or the server. Usually, it is very easy to figure out which one is guilty.

If the server is to blame, this is a server error — return `500`.

If the client is to blame, this is a client error — return `400`. 

One common category of client errors is when the client requests a non-existing resource. In this case, return `404`.

# A Few Words About Custom Exceptions

Modern frameworks for building REST APIs (like Spring or ASP.NET) provide a way to map custom exceptions to HTTP status codes. You can introduce the following custom exceptions and map them to the status codes like this:

| Custom Exception            | HTTP Status Code |
|-----------------------------|------------------|
| `ServerErrorException`      | `500`            |
| `ClientErrorException`      | `400`            |
| `ResourceNotFoundException` | `404`            |

Throw those exceptions in your code and let the framework handle the rest.

# To Summarize

Keep things simple. Do not make up complex rules trying to categorize errors as "business" or "technical" and then look for the HTTP codes to map to those categories.

Do not try to be too specific trying to map every possible error to its own HTTP error code: there is no requirement for you to utilize all the existing HTTP error codes.

`500`, `400` and `404` are all you need. Keep things as simple as possible for as long as possible, and only make them more complex if it's absolutely necessary.
