---
layout: post
title:  "How Evolution Would Check If An Integer Number Is Even"
date:   2022-12-22 21:00:00 +0300
image: /assets/tallinn.png
categories: city
comments: true
---

Were you ever wondering why is the part of our brain that is responsible for processing signals from our eyes located on the back side of our brain? Wouldn't it be more logical to put it to the front side? Or why the giraffe *** nerve is twice as long as its neck, while it could be only a couple of centimeters work?

How would you check if an integer number is even?

I bet you would do something like this:

```java
boolean IsEven(int number) {
    return number % 2 == 0;
}
```

Or maybe like this, if you tend to preliminarily optimize your code:

```java
boolean IsEven(int number) {
    return number & 1 == 0;
}
```

In Push the solution would look like below one, assuming the input is on the integer stack.
```push
(2 integer.% 0 integer.=)
```

Interesting way to check if a number from [0, 10) is even (TODO: figure out how it works):

```push
(false code.quote boolean.not code.stackdepth code.do*range)
```

Correct way:
```push
(exec.stackdepth (integer.% boolean.frominteger boolean.not) float.dup)
```
Interesting how the evolution invented the number 2: just the depth of the exec stack.

Also correct, but I cannot say what it is doing:
```push
(float.rand (((exec.stackdepth integer.% exec.do*count) boolean.fromfloat ((((exec.stackdepth) boolean.swap code.do*count) integer.abs) boolean.not boolean.not boolean.not exec.do*count boolean.not)) float.pow ()) float.shove ())
```

The most crazy way:
```push
(exec.equal boolean_swap float_add exec.yankdup exec.yankdup exec.y boolean.rot (code.cdr integer.stackdepth float.mult) integer.yank exec.equal integer.rot exec.equal boolean.not exec.y boolean.not)
```

TODO: (false) vs (boolean.rand) (both are right in 50% of cases).
