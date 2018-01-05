---
layout: post
title:  "13 ugly mistakes you make in your code"
date:   2017-12-25 21:00:00 +0300
image: /assets/13.jpg
categories: code java
comments: true
---

While writing code, you make the same mistakes again and again. Some of them are quite minor, while others could lead to really expensive consequences. I am going to list the most popular of these mistakes below, with no particular order. Next time you will be working on a new feature, make sure you won't fall into these errors. And notify me, if I will.

<img alt="13" src="{{ page.image }}">

### "Comments make my code more clear"

In reality they just generate noise.

Prefer self-explanatory names for variables, methods, classes etc. to comments. If you have to write a comment for your code, this is a signal that your code needs to be refactored to the state when the comment becomes absolutely obvious and redundant.

### "Static methods are very convenient"

In one of the security frameworks there was the `SecurityContextUtil#getUser()` method. The method returned a currently logged in user. Everything was fine, except that the method was `static`. As a result, every class that consumed the method was __literally untestable__ due to the tight coupling to the security context which is unavailable during the unit testing phase.

Do not repeat this mistake. Avoid `static` methods.

### "_final_ is only for constants"

This is a very popular fallacy. The truth is that _all possible variables_ must be declared `final`. `final` is a wrench that guarantees that you will never loose a wheel. You can find the detailed explanation in [my previous article](/2017/11/13/the-most-underestimated-keyword-in-java).

### "I can pass data between methods using mutable class fields"

This is very dangerous approach. It has 2 issues:

1. Maintainability suffers. A method that utilizes mutable class fields to get necessary data lies about its input<sup>*</sup>. When you read such method you believe that it consumes only its arguments, while in reality its behavior depends also on the class fields.
2. It does not work when the field is accessed by more than one thread.

So only parameters. No exceptions to this rule!

### "Too many classes reduce readability of my code"

Do you also have this phobia? Were you also in a situation when you need to decide either to create a new class or to increase an existing one _a bit_? Did you finally choose the second option even though by doing that you violated the Single Responsibility Principle?
 
I noticed that maintainable code always has one feature: it consists of a big number of small classes. Not vice versa. This is not sufficient condition for code to be maintainable. But it is definitely the necessary one.
 
Create new classes more often. Think twice before appending new methods to existing classes.

### "Interfaces pollute my codebase, I have to avoid them"

This is very similar to the previous one. As interfaces clearly state what is the API of your package and reduce coupling, they have to be used when appropriate. I.e., quite often.

### "Static imports make my code less readable"

Compare

```java
SomeVeryLongUtilityClassName.checkIf(AnotherVeryLongEnumName.IN_PROGRESS)
```

with

```java
checkIf(IN_PROGRESS)
```

Really less readable? Or you believe that `SomeVeryLongUtilityClassName` or `AnotherVeryLongEnumName` add some clarify to your code? Note that in the vast majority of cases they only pollute it.

### "Existing code is a black box"

It is way easier to write new code than to read one written by someone else. As a result you start implementing new functionality without understanding how the component works. This leads to code duplicates and mess.

You have to _embed_ new functionality into current code, instead of putting it as much aside as possible. To do it, you have to understand in details how does it work. Spend some time to have such understanding. Open the black box.

### "I don’t need the new library, I can write the method myself"

Imagine you need to join strings with a separator. Quite simple and popular task. You are going to write the method yourself.

But wait a minute! Before doing this, make sure nobody already did it for you. Most likely one did. And even more likely with better quality. Not because you are not that smart. You just have the different priority: you have to write your complex business logic, not simply join some strings. Having this bigger priority, it is really easy to forget about an important corner case and join the strings in a wrong way.

The less code you have, the less painful it is to maintain it. Write less code. Use ready solutions and libraries.

### "Over-engineered solutions show everyone that I am smart"

Such point of view is very unprofessional. Or even worse: you may believe that if the only person who understands your code is you, you will be never rolled off from the project.

The bad news is that even you will not understand anything _in your own code_ in several months or even earlier. A good manager knows about it and will try to get rid of you as early as possible, while the level of the mess in the project is still under control.

Your code should be as simple as possible. If your solution happened to be over-engineered and one of your colleagues pointed to that, do not try to defend it as if it is your own child. Refactor as soon as possible. Otherwise you will have much more fun later, when you will have to remember all the details from scratch.

### "Unit tests waste my time and do not allow me to modify my code quickly"

You have to treat unit tests as an investment in the future. Yes, it takes a bit more time to keep your unit tests up to date. But this time is nothing in comparison with the time you will have to spend finding and fixing tons of tricky bugs caused by changes in untested code.

### "Checked exceptions are redundant"

All possible exceptions could be divided into 2 categories: ones which you have to handle and ones which you cannot handle (or it does not have sense to handle them). In Java, there are checked exceptions for the former case and unchecked exception for the latter.

Checked exception have the advantage that _they force you to handle them_. Otherwise your code will not even compile.

Of course, checked exceptions seem really annoying: they make you think more. That takes your time and energy. But again: this is the investment in the future.

For example, the `InterruptedException` is checked. In this way you will never forget to handle interruption of your thread properly (e.g., close necessary resources, notify other threads about the interruption, etc.). You will spend a bit more time now to save much more time in future.

Use checked exceptions in your code when appropriate. This will allow you and other developers to write better code.

### "Default encoding and time zone work just fine, why should I care about them?"

Because they do not work fine. You just were lucky so far.

Java is very complaisant. It kindly tries to save you from extra thinking by implicit providing default encodings and time zones whenever possible. It is doing you a disservice.

The consequences of using default time zone are considered in [the separate article](/2017/12/11/why-is-20-12-2017-12-00-not-a-moment-in-time). As for default encoding, there is an awesome [article by Joel Spolsky](https://www.joelonsoftware.com/2003/10/08/the-absolute-minimum-every-software-developer-absolutely-positively-must-know-about-unicode-and-character-sets-no-excuses/).

### Summary

This was the list of mistakes which are very repetitive. Most of them are caused by the momentary benefit. You believe that you save time and effort, while in reality you just postpone and accumulate the problems.

Did I forget something?

<sup>*</sup> First time I encountered this useful term in [this article](https://www.toptal.com/qa/how-to-write-testable-code-and-why-it-matters).