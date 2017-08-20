# Draft

### Ideal world

Let's imagine an ideal world. In this world there exists only one clock which always shows the same time. The time never changes and goes evenly. This clock, common for everyone, is called UTC. What is wrong with this world? Why cannot our world be as simple as that? Why do we need all such complications as leap seconds, time zones, daylight saving time and so on?

Let's have a look again on the ideal world and understand why in reality it would have problems. Let's fix the problems one by one and get to the world we have now: not ideal, but one of the best possible.

### Does a minute really have 60 seconds?

The world is not plane. In reality, we live on a surface of a planet called Earth. The planet rotates around its axis.

We want our UTC clock to be synchronized with the Earth rotation (TODO: reason?). This means that after every equal interval of time the Earth should rotate to the same position that was in the beginning of the interval (TODO: what we want/what we have illustration). But, unfortunately, the rotation of the Earth is not even: it slows down, just a bit. It even *could* speed up, theoretically. But in practice it always slows down. What can we do to not have the difference between the Earth rotation and UTC accumulated?

Let's constantly monitor the difference. And once it reaches 0.9 seconds, let's "stop" our UTC clock for one second to let the Earth to catch up. Such "stop" can be achieved by introducing minutes that have 61 seconds. As a result, the statement "a minute has 60 seconds" is false. On the other hand, we achieve the desired synchronization. This additional 61st second is called *leap second*.

Potentially, a minute can have 59, 60 or 61 seconds. Most of minutes have 60. Some of them have 61. There *could be* minutes which have 59 seconds. But in practice this is very unlikely to happen: the Earth rotation is slowing down.

By the way, the statement "an hour has 60 minutes" is perfectly true, there are no "leap minutes", thanks god. But obviously "an hour has 3600 seconds" is false: can have more (and, theoretically, even less).

OK, now, after we introduced the second type of minutes (longer ones), we can finally assume that the Earth rotates evenly. Of course, in reality it is not true, but our "complication" with the leap seconds allows us to continue *as if* it was true. Whenever we use a term "minute", we refer to a "normal" minute, which has 60 seconds.

#### Does it mean I might see something like 23:59:60 on my clock?

Yes.

#### Is a variable like MS_IN_HOUR = 60 * 60 * 1000 still valid?

Yes, *in majority of cases*. But you need to be careful here. If you have an event and you want to know, say, which time was on UTC clock exactly one hour before the event, you cannot just subtract MS_IN_HOUR from the timestamp of your event.

### Time zones

Some inhabitants of our ideal world are dissatisfied:
 1. They want to have a moment of time called "midday".
 2. Also they want to have the sun exactly at its highest point above the head at that moment.
 3. And finally, they want this moment to be exactly at 12:00.

There is no problem with 1 and 2. For any particular place on our Earth let's spot the moment when the sun is in the highest point and call it "midday". The problem is that as we have only one common UTC clock which shows the same time for any place on (and also inside and outside) the Earth, we cannot achieve that all "middays", which happen on the Earth, happen at 12:00. This will be true only for a small part of the Earth surface.

So the only solution we have here is to introduce more clocks. Damn it. Namely, we divide the surface of the Earth in areas. Each area has its own clock. To not complicate things even more, let's require that the time of a clock of each area differs from the time of the UTC clock on an integer amount of minutes. Let's call those areas *time zones*. And the difference between the time zone clock time and the UTC clock time will be called *offset*.

#### So, is UTC a time standard or a time zone?

Both.

As you most likely know, in software development UTC is sometimes referred to as a time zone. If to be *super precise*, that is not true: UTC is a time standard. But to make life of software developers simpler we can "override" the term "UTC" specially for them. As a result, just like many other words, it will have 2 meanings:

1. The time standard
2. A special kind of time zone for which there is no country which is officially using it and which always had, has and will have the offset equal to 0 minutes

So do not be surprised if, say, in Java 7 you see code like this:

```java
TimeZone utc = TimeZone.getTimeZone("UTC");
```

Or in Windows you see UTC in the list of time zones, like this:

TODO: screenshot from Windows

### History of changes in a time zone

So a time zone can be thought as a clock. The time, the clock shows, differs from one of UTC clock by an integer amount of minutes. A time zone can be fully described as UTC+N, where N shows the number of minutes, for example UTC+5:30 or UTC-2:00. N is also called "an offset from UTC" sometimes.

But that's not enough again. Imagine the City ABC. It is located in such place that it is conveinent to use UTC+3:00 as the time zone. The mayor of the city changed. The new mayor likes even numbers more, so he decided to change the time zone from UTC+3:00 to UTC+4:00. Noone could stop him from doing this, cause he's a mayor.

But as a result, our simple model with offsets does not work anymore. Now a time zone is not only current offset, but also all previous offsets. Other words, now a time zone also includes the history of the changes. Now time zone is not only the clock, but also the table with changes which looks somehow like this:

Offset  |Valid until
--------|-----------------------
UTC+3:00|20.08.2017 00:00 UTC
UTC+4:00|n/a (still valid)

Do we need to keep all this historical data? Yes. Even to answer a simple question "How many seconds ago the event happened?" we need to know not only the current offset but also the offset at the moment of the event.

This is better to understand by example. Imagine that a UFO landed on August, 19 in the City ABC. And you want to answer the question: how many seconds ago the event happened? You know that at the moment of landing the clock on the city tower was showing midnight. Now there is 21 of August and the clock shows midnight again. Other words, you need to find the difference in milliseconds between `19.08.2017 00:00` and `21.08.17 00:00`. Seems like a simple task, isn't it? Since then till now exactly `48 hours` passed. One hour has `3600` seconds. So the difference is `48 * 3600 = 172800` seconds. But the result is wrong! Had it not been for the mayor's changes in the timezone, it would be correct. But now we need to consider the changes to find the correct answer.

To do this let's convert both time of the UFO landing and current time to UTC and calculate the difference once again. For current time it's simple: current offset is UTC+4:00, current time is `21.08.17 00:00`, so current UTC time will be 4 hours less, namely `20.08.17 20:00 UTC`. What about the landing time, `19.08.2017 00:00`? To find the UTC time for it it's not enough to know current offset. And that's why we need the historycal data. Based on our above table the offset at that time was UTC+3:00, so the landing time by UTC clock will be only 3 hours less, namely `18.08.2017 21:00 UTC`. The difference between `20.08.17 20:00 UTC` and `18.08.2017 21:00 UTC` is `3 + 24 + 20 = 47 hours`. So the correct difference in seconds is `47 * 3600 = 169200`. Had it not been for the historical data, it would be impossible to find the correct difference.

Note: even now the answer theoretically could be incorrect due to the leap seconds described above. But we assume in our calcualtions that no leap seconds were added/subtracted for any minute between the given dates. TODO: check this.

### Daylight saving time

The mayor of the City ABC cannot calm down still. Now he decided to split a year into 2 halfs. And have one offset for the first half and a different offset for the second half of the year. Why? Well, he just *wants*. He wants it so much that even came up with an explanation why the idea allows to save money (TODO: include a link to DST reasons explanation here).

Now we need to complicate our model even more. We already have current offset and the history of the offset changes as a time zone. Now we introduce the next information: integer number of minutes for one of the halfs of the year (asumming 0 for another) which represent the different from the offset, 2 moments of time in a year we move the clocks forward and back. And also the history of changes for these new 2 parameters.
