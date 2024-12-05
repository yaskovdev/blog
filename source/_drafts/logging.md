---
layout: post
title:  "Could logging be simpler?"
date:   2017-09-23 17:28:39 +0300
categories: [ guide java logging ]
comments: true
---

1. You are going to implement your logging library called Awesome Logging. Print to standard output stream of the process

```java
final Logger logger = new Logger();
logger.info("started");
```

2. Wait, this is not enough, I want also to write to a file. And in case of errors even send an email 

logger -> StandardOutputStreamAppender, FileAppender, EmailAppender

3. Thank you, now I have my email box full of spam. I told send emails only in case of errors, not for every message!

No problem:

logger(level=info) -> StandardOutputStreamAppender, FileAppender; logger(level=error) -> EmailAppender

4. Bad news. Your competitor implemented their own logging library called Cool Logging. Even worse: some developers already started to use it.

Project A -> Project B ( -> Awesome Logging), Project C ( -> Cool Logging)

=> 2 configurations for B and C, you need now to maintain both. What if there will be more Projects?

Solution: create API (aka facade), let each project use it. Put the implementation and configuration by yourself. API is called Slf4j, implementations are different, e.g., Log4J, LogBack, NOP (yes-yes), and so on.