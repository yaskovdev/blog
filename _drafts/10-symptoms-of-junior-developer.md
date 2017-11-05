---
layout: post
title:  "10 hints how to become a true enterprise developer"
date:   2017-06-01 11:00:00 +0300
categories: java code
---

While working with the code of even experienced developers, I noticed that they very often do the same mistakes which can dramatically reduce readability (and therefore maintainability) of the code.

### Make a method static, it is so convenient

### Do not pollute methods with all these arguments, pass data between methods using mutable class fields

Passes data between methods using mutable class fields.

### "final" keyword is redundant in Java

Sincerely convinced that "final" is an excessive keyword, never uses it.

### Avoid new classes creation

Has a phobia of new classes creation (prefers to increase the size of existing classes turning them into unsupportable 8000-lines-of-code mess). Believes that introducing of new class noticeably reduces performance.

### Avoid new methods creation

Has a phobia of new methods creation (prefers to increase the size of existing methods turning them into unsupportable 500-lines-of-code mess). Believes that introducing of new method noticeably reduces performance.

### Never use static imports

10. Never uses static imports

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
