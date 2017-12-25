---
layout: post
title:  "13 mistakes you make in your code"
date:   2017-12-25 21:00:00 +0300
categories: code java
comments: true
---

While working with the code of even experienced developers, I noticed that they very often do the same mistakes which can dramatically reduce readability (and therefore maintainability) of the code.

### Static methods are very convenient

In one of my projects I had the `SecurityContextUtil#getUser()` method. The method supposed to return a currently logged it user. Everything was fine, except that the method was `static`. As a result, every class that consumed the method was __literally untestable__ due to the tight coupling to the security context which is obviously absent during the unit testing phase.

Do not repeat this mistake. Avoid `static` methods.

### `final` is only for constants

This is a very popular fallacy. The truth is that _all possible variables_ must be declared `final`. `final` is a wrench that guarantees that you will never loose a wheel. You can find more details in [my previous article](/2017/11/13/the-most-underestimated-keyword-in-java).

### I can pass data between methods using mutable class fields

This is very dangerous approach. It has 2 issues:

1. Maintainability suffers. A method that utilizes mutable class fields to get necessary data lies about its input<sup>*</sup>. When you read such method you believe that it works only with its arguments, while in reality its behavior depends also on the class fields.
2. It does not work when the field is accessed by more than one thread.

### Too many classes reduce readability and performance of my code

Has a phobia of new classes creation (prefers to increase the size of existing classes turning them into unsupportable 8000-lines-of-code mess). Believes that introducing of new class noticeably reduces performance.

Has a phobia of new methods creation (prefers to increase the size of existing methods turning them into unsupportable 500-lines-of-code mess). Believes that introducing of new method noticeably reduces performance.

### Static imports make my code less readable

### Existing code is a black box

Does not embed new functionality into current code, instead puts it as much "aside" as possible, causing code duplicates and mess.

### I don’t need a new library, I can do it myself

### Comments make my code more clear

No. They just generate noise. Prefer self-explanatory names for variables, methods, classes etc. to comments. If you have to write a comment for your code, this is a signal that your code needs to be refactored to the state when the comment becomes absolutely obvious and redundant.

### Over-engineered solutions show everyone that I am smart

Invents over-engineered solutions. And then genuinely defends them as if they were their own children.

### Unit tests waste my time and do not allow me to refactor my code quickly

Never writes unit tests. If nevertheless does, uses hacky tools like Mockito or PowerMock.

### Checked exceptions are mistake in Java

Never uses checked exceptions. Does not understand why and when are they needed.

### Interfaces pollute my codebase, I have to avoid them

### Default encoding and time zone work just fine, why should I care about them?

<sup>*</sup> First time I encountered this useful term in [this article](https://www.toptal.com/qa/how-to-write-testable-code-and-why-it-matters).