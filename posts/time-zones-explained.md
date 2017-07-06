# Draft

### Ideal world

Let's imagine an ideal world. In this world there exists only one clock which always shows the same time. The time never changes and goes evenly. This clock, common for everyone, is called UTC. What is wrong in this world? Why our world cannot be as simple as this? Why do we need all such complications as leap seconds, time zones, daylight saving time and so on?

### Does a minute really have 60 seconds?

Our ideal world is not plane. In reality, all inhabitants of the world live on a surface of a planet called Earth. The planet rotates around its axis.

We want our UTC clock to be synchronized with the Earth rotation (TODO: reason?). This means that after every equal interval of time the Earth should rotate to the same position that was the interval of time before (TODO: what we want/what we have illustration). But, unfortunately, the rotation of the Earth is not even: it slows down, just a bit. It even *could* speed up, theoretically. But in practice it always slows down. What can we can to not have difference between the Earth rotation and UTC accumulated?

Let's constantly monitor the difference. And once it becomes 0.9 seconds, let's "stop" our UTC clock for one second to let the Earth to catch up. Such "stop" can be achieved by introducing minutes that have 61 seconds. As a result, the statement "a minute has 60 seconds" is false. In reality a minute can have either 60 or 61 seconds. Most of minutes, however, have 60 seconds indeed. By the way, the statement "an hour has 60 minutes" is perfectly true, there are no "leap minutes", thanks god. But obviously "an hour has 3600 seconds" is false: can have more (and, theoretically, even less).

These additional second are called *leap seconds*. For the sake of justice we must notice, that in theory there could be negative leap seconds, so, theoretically, there could be minutes which have 59 seconds. But in practice this is very unlikely to happen: the Earth rotation is slowing down.

OK, now, after we introduced the second type of minutes (longer minutes), we can finally assume that the Earth rotates evenly. Of course, in reality it is not true, but our "complication" with the leap seconds allows us to continue *as if* it was true. Whenever we use a term "minute", we refer to a "normal" minute, which has 60 seconds.

##### Does it mean I might see something like 23:59:60 on my clock?

Yes.

##### Is a variable like MS_IN_HOUR = 60 * 60 * 1000 still valid?

Yes, *in majority of cases*. But you need to be careful here. If you have an event and you want to know, say, which time was on UTC clock exactly one hour before the event, you cannot just subtract MS_IN_HOUR from the timestamp of your event.

### Time zones

Some inhabitants of our ideal world are dissatisfied:
 1. They want to have a moment of time called "midday".
 2. Also they want to have the sun exactly at its highest point above the head at that moment.
 3. And finally, they want this moment to be exactly at 12:00.

There is no problem with 1 and 2. For any particular place on our Earth let's spot the moment when the sun is in the highest point and call it "midday". The problem is that as we have only one common UTC clock which shows the same time for any place on (and also inside and outside) the Earth, we cannot achieve that all "middays", which happen on the Earth, happen at 12:00. This will be true only for a small part of the Earth surface.

So the only solution we have here is to introduce more clocks. Damn it. Namely, we divide the surface of the Earth in areas. Each area has its own clock. To not complicate things even more, let's require that the time of a clock of each area differs from the time of the UTC clock on an integer amount of minutes. Let's call those areas *time zones*. And the difference between the time zone clock time and the UTC clock time will be called *offset*.

##### So, is UTC a time standard or a time zone?

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

### History of changes in the offset

Even to answer a simple question "How many seconds ago the event happened?" we need to know what was the offset at the moment of the event.

### Daylight saving time

Coming soon.