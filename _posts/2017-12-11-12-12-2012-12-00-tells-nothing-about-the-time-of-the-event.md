---
layout: post
title:  "Why 12.12.2012 12:00 is not the moment of time?"
date:   2017-12-11 21:00:00 +0300
categories: java utc
comments: true
---

The event happened `12.**.2012 12:00`. Can you tell me, when exactly? Not really, because something is missing? How about `21.12.2012 12:00`? If you think that now you can, you are wrong. You still do not know the exact moment of time. However, the missing part is much less obvious now.

### The UTC offset<sup>*</sup> is just as important as the day, month, year, hour, etc.

Returning to our example, only `12.12.2012 12:00 UTC+03:00` gives you enough information about when the event happened. But are you sure you always remember about the `UTC+03:00` part? Even worse, is it always given to you?

### A real life example

Imagine you have a RESTful service that provides you data in the XML format. And you are interested in the date when the subscription to your service was made.

```xml
<subscription>
    <startDate>20060501</startDate>
</subscription>
```

Luckily, some of caring developers of your company created a handy utility class to parse such dates, so you can just call `Date date = DateUtil.dateValue("20060501")` and have the date of the subscription. And a _tricky bug_ as well.

I guess the reason is clear already. The [JavaDoc](https://docs.oracle.com/javase/6/docs/api/java/util/Date.html) states: "The class Date represents a specific instant in time, with millisecond precision." But, as we just discussed, `20060501` is not enough to determine the specific instant in time, you need also the UTC offset. So you have two options:

1. Request the missing part from the service. This is robust, but not always possible.
2. Make an assumption about the UTC offset yourself and make sure your code takes it into account.

And no matter what option you choose, you have to stop using `DateUtil`. It pretends to be your friend by making your life easier, but in reality it gives you a great opportunity to make a mistake. Instead of throwing an exception that says "Sorry, mate, cannot parse you date, it does not contain enough information to be parsed" or using some other way to save you from the mistake, it just silently guesses the missing part (by using server time zone, for example) and returns the wrong result.

### This is not my case, I do not have the DateUtil

OK, maybe you do not have `DateUtil` in your company. But more popular `SimpleDateFormat` suffers from exactly the same issues.

Your best bet is start using new [Java 8 Date and Time API](http://www.oracle.com/technetwork/articles/java/jf14-date-time-2125367.html). Or, if you are still using an older version of Java, consider [Joda Time library](http://www.joda.org/joda-time/). One of their advantages is that they do not allow you to make a mistake by forcing you to provide the complete information.

### Summary

Never forget about the UTC offset when working with dates. Use modern APIs and libraries, they can help you with this.

------

<sup>*</sup> Not necessarily the UTC offset should be given to you. Time zone also fills the gap, as it keeps the offset information. So `12.12.2012 12:00 Europe/Moscow` would be also perfectly OK. Though remember about the [differences between the UTC offset and a time zone](/2017/10/30/utc-a-time-standard-or-a-time-zone).
