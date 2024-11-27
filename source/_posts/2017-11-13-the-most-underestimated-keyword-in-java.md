---
layout: post
title:  "The Most Underestimated Keyword In Java"
date:   2017-11-13 21:00:00 +0300
image: /assets/broken-bike.jpg
categories: code java
comments: true
---

Imagine yourself riding a bicycle where all the screw-nuts are loosened. Everything is rattling and the bike is ready to fall apart. This is exactly how it feels to maintain code when this essential keyword we are going to discuss is not used or is used only sparingly for some class fields and constants.

{% asset_img broken-bike.jpg Broken Bike %}

### Always Use `final`

Literally, _always_. For constants and class fields, for method parameters, for declarations of exceptions in catch blocks, and for resource declaration in try-with-resources. In short, whenever and wherever possible. Including parameters of methods without a body (abstract methods and methods of an interface), to be consistent.

Even developers who understand why `final` has to be used for constants and for class fields sometimes wonder why should we use it in all other cases (for example, for method parameters). Let's try to explain the reasons.

### Benefits Of Using `final`

1. _It makes your code more maintainable_: For any method, you can be sure that its `final` parameters always have the same values that you passed.

2. _It makes your code more readable_: After some time of using `final`, you will notice that it is easier to spot where the method variables are declared because all such declarations start with the `final` keyword. The method does not look like a wall of text anymore. Try it yourself and you will see the difference.

3. And the most important one: ___it forces you to think harder, and you will write better code___. It prevents you from producing crappy code in many different ways.

As a simple example, it does not allow to produce methods like this (I cannot count how many of these I've seen in the legacy code!):

```java
String result = null;
if (success) {
    result = "some string";
}
return result;
```
If you are forced to use `final`, you have to rewrite it as:

```java
if (success) {
    return "some string";
}
return null;
```
Already better, isn't it? And, who knows, maybe you will now notice `return null` and remember that it is undesirable and you should throw an exception instead?

### "Yes, But It Pollutes My Code!"

Think about it this way. Different languages use different ways to declare variables. Scala has `val`, modern JavaScript has `const`, Java has... `final`. Does `const` pollute the code? If not, then how does `final` pollute it? What is the difference? Note that even the number of letters in these two keywords is the same!

### "Yes, But It May Reduce Performance!"

Yep, I've even heard this one once. The only explanation which comes to my mind is that some developers confuse the semantics of `final` and `volatile`. This objection is just wrong. Moreover, `final` is erased in compile time for local parameters and variables, i.e., they do not appear in the .class file. You can check it yourself using a decompiler.

### "I Am Still Not Convinced"

This was one disappointed comment left during a code review: "all variables are final..."

What should I recommend to this person? Start using it when writing Java code! Or try to write in Scala for some time and then switch back to plain old Java. The shift will happen in your way of thinking, and you will see how useful the `final` keyword is, and how it makes the code more readable and maintainable.

### To Summarize

`final` is your friend. It should be used everywhere. If you have a variable declaration which does not compile when you declare it `final`, it is a clear sign that you are doing something wrong and your code has to be refactored.
