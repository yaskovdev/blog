---
layout: post
title:  "Why is 20.12.2017 12:00 not a moment in time?"
date:   2017-12-11 21:00:00 +0300
image: /assets/moment-in-time.jpg
categories: java utc
comments: true
---

Your friend Joyce from another country wants you to have a video call at `20.**.2017 12:00`. Will you join? Oh, so you cannot, because you don't know the exact moment in time? How about at `20.12.2017 12:00`? If you think that now you know, you are wrong. However, the missing part is much less obvious now.

<img alt="Moment in time" src="{{ page.image }}">

### The UTC offset<sup>*</sup> is just as important as the day, month, year, hour, etc.

Returning to the above example, only `20.12.2017 12:00 UTC+03:00` gives you enough information about when the call should happen. But are you sure you always remember about the `UTC+03:00` part? Even worse, is it always given to you?

### A real life example

Imagine you have a RESTful service that provides you data in the XML format. And you are interested in the date when the subscription to your service was made.

```xml
<subscription>
    <startDate>20060501</startDate>
</subscription>
```

Luckily, some of caring developers of your company created a handy utility class to parse such dates, so once you called the service, you can just write `Date date = DateUtil.dateValue("20060501")` and have the date of the subscription. And a _tricky bug_ as well.

I guess the reason of the bug is clear already. The [JavaDoc](https://docs.oracle.com/javase/6/docs/api/java/util/Date.html) states: "The class Date represents a specific instant in time, with millisecond precision." But, as we just discussed, `20060501` is not enough to determine the specific instant in time, you need also the UTC offset. So you have two options:

1. Request the missing part from the service, so that it will return `20060501 UTC` to you. This is robust, but not always possible.
2. Make the right assumption about the UTC offset yourself and make sure your code takes it into account.

And stop using `DateUtil`. It pretends to be your friend by making your life easier, but in reality it gives you a great opportunity to make a mistake. Instead of throwing an exception that says "Sorry, mate, cannot parse you date, it does not contain enough information to be parsed" or using some other way to save you from the mistake, it just silently guesses the missing part (by using server time zone, for example) and returns the wrong result.

### Yes, but this is not my case, I do not use the DateUtil

Well, maybe you do not have any `DateUtil`s in your code. But more popular `SimpleDateFormat` suffers from exactly the same issues. Make sure you do not use it either.

Instead, use new [Java 8 Date and Time API](http://www.oracle.com/technetwork/articles/java/jf14-date-time-2125367.html) or [Joda Time](http://www.joda.org/joda-time/), if you got stuck with an old Java. One of the advantages of these libraries is that they force you to provide the complete information. In this way they do not allow you to make the mistake.

### Summary

Always take care about the UTC offset when working with dates. Use modern APIs and libraries, they can help you with this.

<sup>*</sup> Not necessarily the UTC offset should be given to you. Time zone also fills the gap, as it keeps the offset information. So `20.12.2017 12:00 Europe/Moscow` would be also perfectly OK. Though remember about the [differences between the UTC offset and a time zone](/2017/10/30/utc-a-time-standard-or-a-time-zone).
