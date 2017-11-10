---
layout: post
title:  "The most underestimated keyword in Java"
date:   2017-11-13 21:00:00 +0300
categories: java
---

Imagine yourself riding a bicycle where all the nuts are loosened a bit. Everything is rattling and is ready to fall off. This is exactly how it feels to maintain code where "final" is not used or used only from time to time for some class fields and constants.

### Always use "final"

Literally _always_. For constants and class fields (that was obvious), for method parameters, for declarations of exceptions in catch blocks and for resource declaration in try-with-resources. In short, everywhere where possible.

This makes the code more maintainable: even if you have a big method (which is bad, but it's a different topic), you can be sure that its parameters definitely have the same values which were passed to the method.

This makes the code more readable: after some time of using "final" you will notice that it is easier to spot where the method variables are declared because all such declarations start with final. The method (even if it is a big one) does not look as a wall of text anymore.

This does not allow to write methods like (cannot count how many of them I've seen in legacy code):
```java
String result = null;
if (success) {
    result = "some string";
}
return result;
```
The person who is forced to use "final" will have to rewrite it like this:
```java
if (success) {
    return "some string";
}
return null;
```
Already better, isn't it? And, who knows, maybe he will now remember, that `return null` is something bad and an exception should be thrown instead.

### Yes, but "final" pollutes the code

Think about this in the next way. Different languages use different ways to declare variables. Scala has "val", modern JavaScript has "const", Java has... "final". Why do you think "final" pollutes the code, but, for example, "const" does not? What is the difference? Note that even the number of letters in these two keywords is the same.

### Yes, but "final" may reduce performance

Yes, once I've heard even this. I believe this is just because some developers confuse semantics of "final" and one of "volatile". This is just not true. Moreover, "final" is erased in compile time for local parameters and variables, i.e., they do not appear in the .class file.

### I am still not convinced

Try to write in Scala for some time and then switch back to plain old Java. Most likely some shift will happen in your way of thinking and you will understand how useful the "final" keyword is and how it makes the code more readable and maintainable.

### Summary

"final" should be used everywhere. If you have a variable declaration which does not compile when you declare it "final", it is a clear sign that you are doing something wrong and your code has to be refactored.