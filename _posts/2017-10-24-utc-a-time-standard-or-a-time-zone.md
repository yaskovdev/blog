---
layout: post
title:  "UTC — a time standard or a time zone?"
date:   2017-09-23 17:28:39 +0300
categories: utc
---

## UTC — a time standard or a time zone?

There are some [popular resources](https://www.timeanddate.com/time/gmt-utc-time.html) which clearly state that UTC is not a time zone, but a time standard.

On the other hand, on some operating systems you can find UTC in the list of time zones. Also in Java, for example, this simple call `TimeZone.getTimeZone("UTC")` does return TimeZone object without any problems.

![UTC as time zone in Windows](/assets/placeholder.png)

Let's finaly clarify what is UTC: a time standard or a time zone? To do it let's first understand what is each of them.

### What is a time standard?

We want for each event to be able to say when did it happen (or will happen). Other words, we want to match every possible event with some number which is called a time of the event. But there is an infinite number of ways how we can do it. The most convenient of these ways were formalized, given names (labeled) and became standards. One of these standards was called UTC (Coordinated Universal Time). UTC is, obviously, not the only standard, there are also GMT, UT, TDT, etc. [Quite many](https://en.wikipedia.org/wiki/Time_standard) of them.

You can think of UTC (or any other time standard) as a big clock in the middle of the Universe, common to everyone.

![Big UTC Clock](/assets/placeholder.png)

### What is a time zone?

A time zone is a more complex concept. It consists of:

1. The UTC offset. The offset is just the difference between the time of the timezone and UTC time. Usually it is expressed in integer number of hours. But there are few exceptions when the number of hours is not integer.
2. A time of DST (daylight saving time) start and end.
3. The full history of changes in 1. and 2.

So a time zone is still the clock which shows the time according to the UTC standard. But besides the clock you also have the UTC offset, the DST rules and the history of any changes in the offset and in the DST rules.

![Time Zone](/assets/placeholder.png)

### So what is UTC?

As it usually happens, term "UTC" is overloaded. Other words, "UTC" refers to more than one concept. Namely, depending on a context, *it can be a time standard or a specific time zone* with the next 2 features:
1. There is no country (yet) which officially uses UTC timezone
2. The UTC timezone always has the same time as UTC time standard. Other words, the UTC offset for the UTC time zone (sounds not very well, but that's because of the overload) is always 0 and can be written for example as UTC+00:00.