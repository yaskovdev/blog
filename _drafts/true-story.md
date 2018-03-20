I could not count how many wild versions did I have. But the secret was much simpler.

Internally in the code it was like this:

```java
DateUtil.countAge("280237-7918")
```

But should be like this:

```java
DateUtil.countAge("280237-7918", new Date())
```