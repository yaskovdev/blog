---
layout: post
title:  "13 mistakes you make in your code"
date:   2017-12-25 21:00:00 +0300
categories: code java
comments: true
---

While working with the code of even experienced developers, I noticed that they very often do the same mistakes which can dramatically reduce readability (and therefore maintainability) of the code.

### Static methods are very convenient

### "final" is only for constants

I mean it. Not only class fields must be declared final, but all kinds variables. I mean method variables, method arguments declaration (even if the method has no body), exception declaration in a catch block, resource declaration in a try-with-resources block.
Imagine yourself riding a bicycle where all possible nuts are loosened a bit. Everything is rattling and is ready to fall off. This is how it feels to maintain code where "final" is not used. "final" is a wrench which guarantees that you will never loose a wheel.
By the way, modern IDEs can be configured to highlight cases where "final" can be (but is not) used.

### I can pass data between methods using mutable class fields

### Too many classes reduce readability and performance of my code

Has a phobia of new classes creation (prefers to increase the size of existing classes turning them into unsupportable 8000-lines-of-code mess). Believes that introducing of new class noticeably reduces performance.

Has a phobia of new methods creation (prefers to increase the size of existing methods turning them into unsupportable 500-lines-of-code mess). Believes that introducing of new method noticeably reduces performance.

### Static imports make my code less readable

### Existing code is a black box

Does not embed new functionality into current code, instead puts it as much "aside" as possible, causing code duplicates and mess.

### I don’t need a new library, I can do it myself

### Comments make my code more clear

Prefers comments to self-explanatory names for variables, methods, classes etc.

### Over-engineered solutions show to everyone how smart I am

Invents over-engineered solutions. And then genuinely defends them as if they were their own children.

### Unit tests waste my time and do not allow me to refactor my code quickly

Never writes unit tests. If nevertheless does, uses hacky tools like Mockito or PowerMock.

### Checked exceptions are mistake in Java

Never uses checked exceptions. Does not understand why and when are they needed.

### Interfaces pollute my codebase, I have to avoid them

### Default encoding and time zone just work, why should I care about them?
