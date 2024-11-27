---
layout: post
title:  "UTC – A Time Standard Or A Time Zone?"
date:   2017-10-30 21:00:00 +0300
image: /assets/big-utc-clock.png
categories: utc
comments: true
---

The short answer is **both**. Let me explain.

There are some [popular resources](https://www.timeanddate.com/time/gmt-utc-time.html) which clearly state that UTC is not a time zone, but a time standard. However, on some operating systems you can find UTC in the list of time zones. Also in Java, for example, this simple call `TimeZone.getTimeZone("UTC")` does return a `TimeZone` object without any problem.

<img alt="UTC as time zone in Windows" src="{{ site.url }}/assets/utc-as-time-zone-in-windows.png">

Let's finally clarify what UTC is. To do this, we have to understand the difference between a time standard and a time zone.

### What Is A Time Standard?

When discussing an event, we want to be able to identify when it happened (or when it will happen). In other words, we want to match every possible event with some number, which is called the time of the event. But there is an infinite number of ways of how we can do this. The most convenient of these ways were formalized, given names (labeled) and became standards. One of these standards was called UTC (Coordinated Universal Time). UTC is, obviously, not the only standard; there are also GMT, UT, TDT, etc. [There are quite a few of them](https://en.wikipedia.org/wiki/Time_standard).

You can think of UTC (or any other time standard) as a big clock in the middle of the Universe, common to everyone.

<img alt="Big UTC Clock" src="{{ site.url }}{{ page.image }}">

### What Is A Time Zone?

A time zone is a more complex concept. It usually corresponds to some region in the world. It consists of:

1. The UTC offset. The offset is just the difference between the time of the specific time zone and UTC time. Usually, it is expressed in an integer number of hours. But there are few exceptions when the number of hours is not an integer. The offset is different during DST (daylight saving time).
2. A time of the DST start and end.
3. All the changes in these first two parts this region had during its history.

So a time zone is still the clock which shows the time according to the UTC standard. But beside the clock, you also have the UTC offset, the DST rules and the history of any changes in the offset and in the DST rules.

### So What Is UTC?

I think that the term "UTC" is overloaded, because "UTC" refers to more than one concept. Depending on a context, **it can be a time standard or a special time zone**. The time zone is special because it has these two features:

1. There is no country (yet) which officially uses UTC time zone for any of its regions.
2. The UTC time zone always has the same time as the UTC time standard. In other words, the UTC offset for the UTC time zone (it's confusing, isn't it? Exactly why I think it's an overloaded term) is always 0 and can be written, for example, as UTC+00:00. Obviously, the UTC time zone does not have DST. Also, the history of changes of the offset and the DST is empty, because these factors never change.

Thanks to the people who answered [this question](https://stackoverflow.com/questions/44756430/why-utc-which-is-not-a-time-zone-is-considered-as-a-time-zone-in-java-and-not) for their answers.
