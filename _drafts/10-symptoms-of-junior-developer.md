---
layout: post
title:  "You do these 10 mistakes when you code"
date:   2017-06-01 11:00:00 +0300
categories: code java
---

While working with the code of even experienced developers, I noticed that they very often do the same mistakes which can dramatically reduce readability (and therefore maintainability) of the code.

### Use static methods

### Pass data between methods using mutable class fields

Passes data between methods using mutable class fields.

### Don't use "final"

I mean it. Not only class fields must be declared final, but all kinds variables. I mean method variables, method arguments declaration (even if the method has no body), exception declaration in a catch block, resource declaration in a try-with-resources block.
Imagine yourself riding a bicycle where all possible nuts are loosened a bit. Everything is rattling and is ready to fall off. This is how it feels to maintain code where "final" is not used. "final" is a wrench which guarantees that you will never loose a wheel.
By the way, modern IDEs can be configured to highlight cases where "final" can be (but is not) used.

### Avoid new classes creation

Has a phobia of new classes creation (prefers to increase the size of existing classes turning them into unsupportable 8000-lines-of-code mess). Believes that introducing of new class noticeably reduces performance.

### Avoid new methods creation

Has a phobia of new methods creation (prefers to increase the size of existing methods turning them into unsupportable 500-lines-of-code mess). Believes that introducing of new method noticeably reduces performance.

### Believe static imports are evil

Never uses static imports

### Never modify existing code to not break something

Does not embed new functionality into current code, instead puts it as much "aside" as possible, causing code duplicates and mess.

### Do not use ready solutions

Does not use ready solutions, writes their own instead.

### Explain yourself with as much comments as possible

Prefers comments to self-explanatory names for variables, methods, classes etc.

### Show to everyone you are smart: write over-engineered solutions

Invents over-engineered solutions. And then genuinely defends them as if they were their own children.

### Unit tests just waste your time, do not write them

Never writes unit tests. If nevertheless does, uses hacky tools like Mockito or PowerMock.

### Checked exceptions are mistake in Java, avoid them

Never uses checked exceptions. Does not understand why and when are they needed.

### Interfaces pollute your codebase, never use them

Never uses interfaces.

### Always explicitly pass encodings

### Always explicitly specify time zones
