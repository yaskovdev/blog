---
layout: post
title:  "The most underestimated keyword in Java"
date:   2017-11-13 21:00:00 +0300
categories: code java
comments: true
---

Imagine yourself riding a bicycle where all the screw-nuts are loosened. Everything is rattling and is ready to fall off. This is exactly how it feels to maintain code where the keyword we are going to speak about is not used or used only from time to time for some class fields and constants.

<img alt="Broken bike" src="/assets/broken-bike.jpg">

### Always use final

Literally _always_. For constants and class fields, for method parameters, for declarations of exceptions in catch blocks and for resource declaration in try-with-resources. In short, everywhere where possible. Including parameters of methods without a body (abstract methods and methods of an interface), to be consistent.

Even developers who understand why `final` has to be used for constants and for class fields sometimes are wondering why should we use it in all other cases, for example for method parameters. Let's try to explain the reasons.

### Benefits of using final

It makes the code more maintainable: for any method you can be sure that its `final` parameters definitely have the same values which were passed to it.

It makes the code more readable: after some time of using `final` you will notice that it is easier to spot where the method variables are declared because all such declarations start with the `final` keyword. The method does not look as a wall of text anymore. Try it yourself and you will see the difference.

And the most important one: __it forces developers to think harder to write better code__. It does not allow to produce methods like this (cannot count how many of them I've seen in the legacy code):
```java
String result = null;
if (success) {
    result = "some string";
}
return result;
```
The person who is forced to use `final` will have to rewrite it to:
```java
if (success) {
    return "some string";
}
return null;
```
Already better, isn't it? And, who knows, maybe he will now notice `return null` and remember that it is something bad and an exception should be thrown instead.

### Yes, but it pollutes the code

Think about this in the next way. Different languages use different ways to declare variables. Scala has `val`, modern JavaScript has `const`, Java has... `final`. Does `const` pollute the code? If no, then why does `final` pollute it? What is the difference? Note that even the number of letters in these two keywords is the same.

### Yes, but it may reduce performance

Yep, once I've heard even this. The only explanation which came to my mind is that some developers confuse semantics of `final` and one of `volatile`. The objection is just wrong. Moreover, `final` is erased in compile time for local parameters and variables, i.e., they do not appear in the .class file. You can check by yourself using a decompiler.

### I am still not convinced

Once one of reviewers left literally the next disappointed comment during some code review: "all variables are final..."

What can I recommend to such person? Start using it when writing Java code. Or just try to write in Scala for some time and then switch back to plain old Java. The shift will happen in your way of thinking and you will see how useful the `final` keyword is and how it makes the code more readable and maintainable.

### Summary

`final` is your friend. It should be used everywhere. If you have a variable declaration which does not compile when you declare it `final`, it is a clear sign that you are doing something wrong and your code has to be refactored.