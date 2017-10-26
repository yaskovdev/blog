---
layout: post
title:  "What on Earth is UTC?"
date:   2017-09-23 17:28:39 +0300
categories: jekyll update
---

## What on Earth is UTC?

### UTC — a time standard or a time zone?

There are some [popular resources](https://www.timeanddate.com/time/gmt-utc-time.html) which clearly state that UTC is not a time zone, but a time standard.

On the other hand, on some operation systems you can find UTC in the list of time zones. Also in Java, for example, this simple call `TimeZone.getTimeZone("UTC")` does return TimeZone object without any problems.

![UTC as time zone in Windows](/assets/placeholder.png)

Let's finaly clarify what is UTC: a time standard or a time zone?

### What is a time standard?

We want for each event to be able to say when did it happen (or will happen). Other words, we want to match every possible event with some number which is called a time of the event. But tere is an infinite number of ways how we can do it. The most convenient of these ways were given labels and turned into time standards. One of these standards was called UTC (Coordinated Universal Time). UTC is, obviously, not the only standard, there are also GMT, UT, TDT, etc. [Tons](https://en.wikipedia.org/wiki/Time_standard) of them.

You can think of UTC (or any other time standard) as a big and precise clock, common to everyone.

![Big UTC Clock](/assets/placeholder.png)

### What is a time zone?

A time zone is a more complex concept. It consists of:

1. The UTC offset
2. A time of DST start and end
3. The full history of any changes in 1. and 2were formalized, given a name (labeled) and became standards.

So a time zone is still the clock which show time according to the UTC standard. But besides the clock you also have the UTC offset, the DST rules and the history of any changes in the offset and in the DST rules.

![Time Zone](/assets/placeholder.png)

### So what is UTC?

As it usually happens, term "UTC" is overloaded. Other words, "UTC" refers to more than one concept. Namely, depending on a context, it can be a time standard or a time zone with the two specific features. First of all, there is no country (yet) which officially uses UTC timezone. Second of all, the UTC timezone always has the same time as UTC time standard. Other words, the UTC offset for the UTC time zone (sounds not very well, but that's because of the overload) is always 0 and can be written for example as UTC+00:00.