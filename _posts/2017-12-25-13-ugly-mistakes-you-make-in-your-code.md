---
layout: post
title:  "13 Ugly Mistakes You Make In Your Code"
date:   2017-12-25 21:00:00 +0300
image: /assets/13.jpg
categories: java code
comments: true
---

When writing code, you will make the same mistakes again and again. Some of them can be quite minor, while others could lead to really expensive consequences. I am going to list the most common of these mistakes below, in no particular order. Next time you work on a new feature, make sure you won't fall into any of these traps. And please notify me, if _I_ do.

<img alt="13" src="{{ site.url }}{{ page.image }}">

### "Comments Make My Code Clearer"

In reality, they just generate noise.

I'd recommend using self-explanatory names for variables, methods, classes etc. instead of comments. If you have to write a comment for your code, this is a signal that your code needs to be refactored until the comment becomes absolutely obvious and redundant.

### "Static Methods Are Very Convenient"

In one of the security frameworks, there was the `SecurityContextUtil#getUser()` method. The method returned a currently logged-in user. Everything was fine, except that the method was `static`. As a result, every class that consumed the method was __literally untestable__ due to the tight coupling of the security context, which is unavailable during the unit testing phase.

Do not repeat this mistake. Avoid `static` methods.

### "`final` Is Only For Constants"

This is a very popular fallacy. The truth is that _all possible variables_ must be declared `final`. `final` is a wrench that guarantees that you will never lose a wheel. You can find a more detailed explanation in [my previous article]({{ site.url }}/2017/11/13/the-most-underestimated-keyword-in-java).

### "I Can Pass Data Between Methods Using Mutable Class Fields"

This is a very dangerous approach. It has two issues:

1. Maintainability suffers. A method that utilizes mutable class fields to get necessary data lies about its input<sup>*</sup>. When you read such a method, you believe that it consumes only its arguments, while in reality, its behavior depends also on the class fields.
2. It does not work when the field is accessed by more than one thread.

You should only use parameters. No exceptions to this rule!

### "Too Many Classes Reduce Readability Of My Code"

Do you also have this phobia? Have you also been in a situation when you needed to decide whether to create a new class or to increase an existing one _just a bit_? Did you finally choose the second option, even though by doing that you violated the Single Responsibility Principle?
 
I have noticed that maintainable code always has one feature: it consists of a large number of small classes. Not vice versa. This is not a sufficient condition for the code to be maintainable. But it is definitely a necessary one.
 
Create new classes more often. Think twice before appending new methods to existing classes.

### "Interfaces Pollute My Codebase. I Have To Avoid Them!"

This is very similar to the previous mistake. As interfaces clearly state what the API of your package is and reduce coupling, they have to be used when appropriate, i.e., quite often.

### "Static Imports Make My Code Less Readable"

Compare

```java
SomeVeryLongUtilityClassName.checkIf(AnotherVeryLongEnumName.IN_PROGRESS)
```

with

```java
checkIf(IN_PROGRESS)
```

Is this _really_ less readable? Or do you just believe that `SomeVeryLongUtilityClassName` or `AnotherVeryLongEnumName` add some clarity to your code? Note that in the vast majority of cases, they only pollute it.

### "Existing Code Is A Black Box"

It is much easier to write new code than it is to read one written by someone else. As a result, you can start implementing new functionality without understanding how the component works. This leads to code duplicates and a lot of unnecessary mess.

You have to _embed_ new functionality into current code, instead of putting it as much aside as possible. To do this, you have to understand in details how it works. Spend some time learning this method. Open the black box.

### "I Don’t Need The New Library. I Can Write The Method Myself!"

Imagine you need to join strings with a separator. Quite a simple and popular task, right? So you decide to write the method yourself.

But wait a minute! Before doing this, make sure no one already did it for you. Most likely, someone did, and even more likely, with better quality. Not because you are slow or incapable. You just have a different priority: you have to write your complex business logic, not just simply join some strings. Having this more important priority, it is really easy to forget about an important corner case and join the strings incorrectly.

The less code you have, the less painful it is to maintain it. Write less code. Use ready solutions and libraries.

### "Complicated Solutions Show How Smart I Am"

Such a point of view is very unprofessional. Even worse, if you believe that if you are the only person who understands your code, you will never complete the project.

The bad news is that even _you_ will not understand everything in your own code in several months, or even earlier. A good manager knows this will happen and will try to get rid of you as soon as possible, while the mess in the project is still under control.

_Your code should be as simple as possible_. If your solution happens to be over-engineered and one of your colleagues points that out, do not try to defend it as if it is your own child. Refactor as soon as possible. Otherwise, you will have much more "fun" later, when you will have to remember all the details from scratch.

### "Unit Tests Waste My Time And Do Not Allow Me To Modify My Code Quickly"

You have to treat unit tests as an investment for the future. Yes, it takes a bit more time to keep your unit tests up-to-date. But this time is nothing in comparison with the time you will have to spend finding and fixing tons of tricky bugs caused by changes in untested code.

### "Checked Exceptions Are Redundant"

All possible exceptions can be divided into two categories: ones that you have to handle and ones that you cannot handle (or it does not have sense to handle them). In Java, there are checked exceptions for the former case and unchecked exceptions for the latter.

Checked exceptions have the advantage that _they force you to handle them_. Otherwise, your code will not even compile.

Of course, checked exceptions seem really annoying: they make you think more. That takes your time and energy. But again: this is your investment for the future.

For example, the `InterruptedException` is checked. This way, you will never forget to handle the interruption of your thread properly (e.g., close necessary resources, notify other threads about the interruption, etc.). You will spend a bit more time now to save so much more time in the future.

Use checked exceptions in your code when appropriate. This will allow you and other developers to write better code.

### "Default Encoding And Time Zone Work Just Fine, Why Should I Care About Them?"

Because they do not work fine. You have just been lucky so far.

Java is very complacent. It kindly tries to save you from extra thinking by implicitly providing default encodings and time zones whenever possible. It is doing you a disservice.

The consequences of using the default time zone are considered in [a separate article]({{ site.url }}/2017/12/11/why-is-20-12-2017-12-00-not-a-moment-in-time). As for default encoding, there is [an awesome article by Joel Spolsky](https://www.joelonsoftware.com/2003/10/08/the-absolute-minimum-every-software-developer-absolutely-positively-must-know-about-unicode-and-character-sets-no-excuses/) to explain more.

### To Summarize

This is a list of mistakes which I have found to be very repetitive and time-consuming. Most of them are caused by a misguided belief in a short-term benefit. You believe that you save time and effort, while in reality you just postpone and accumulate the problems. It is best to avoid them whenever possible.

Have I forgotten something?

<sup>*</sup> First time I encountered this useful term was in [this article](https://www.toptal.com/qa/how-to-write-testable-code-and-why-it-matters).
