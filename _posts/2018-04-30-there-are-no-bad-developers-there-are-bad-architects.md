This happened when I was supporting deployment of a huge enterprise system of a bank.

The deployment was not automated. Special people with access were doing the necessary changes. I, as a developer, was telling them in details what to do. Why I was not allowed to do it directly is a different story. Probably it was due to stupidness security reasons.

The Jenkins job that deployed a component became red. I started to dig into it and realized that the unit tests failed. That was quite a surprise, because nobody touched the component for a month and all the previous builds were green.

OK, the code didn’t change. This means that the service takes some data (probably some price coefficients) from the outside (that can be either another service or a database).

But after spending quite 

It was far not that obvious to understand that the test depends on current date because the age of a customer was calculated using his birthday, which, in turn was calculated using the customer’s ID card number.

Morality Of The Story

Never allow your unit tests depend on anything external.

----

"There Are No Bad Developers, There Are Bad Architects"
there-are-no-bad-developers-there-are-bad-architects

There was an orphaned component, nobody touched it for almost half a year. Then the client asked me to fix a small bug in the component.

I started building the component and found out that the tests (that always used to pass before) started failing. That was a bit demotivating because I had not made any changes in the code yet.

The tests were trying to explain me what went wrong. But the message they used for it was not too informative. Some of them were saying that "expected: 200, actual: 210", while others just threw `ArrayIndexOutOfBoundsException`, being even more stingy at the details.

1. Probably something was changed? No, I don't see any commits
2. Maybe it takes some prices or coefficients from another service? No, I don't see any communications in the logs.

### The Mystery

I could not count how many wild versions came to my mind.

But the secret was much simpler.

### The Disclosure

I already [mentioned]({{ site.url }}/2017/12/11/why-is-20-12-2017-12-00-not-a-moment-in-time) that `DateUtil` library is a pure evil. In less that several months the library decided to demonstrate once again how evil it is.

The code against which the unit tests were running was calculating a price for a certain service based on the age of a customer. The older the customer, the more expensive the service.

The age of the customer was derived from his social security number. The author of the code decided to not re-invent the wheel and re-use the existing library to calculate the age.

So deeply in the code under testing there was the call like this:

```java
int age = DateUtil.countAge("280237-7918")
```

I guess now you already can see why the tests started to fail.

Exactly, because since the previous tests run the customer became one year older. So the age increased by one. So the actual price became a bit bigger than expected. So the tests started failing.

### Who Is Responsible?

I am trying to imagine myself developing this functionality. I am forced to use certain libraries. At the same time, these libraries force me to write untestable code. Other words, I am forced to write untestable code.

And this is everywhere. I am forced to use Eclipse instead of IntelliJ IDEA due to so-called "company policy". I am not allowed to use MobaXterm by the similar reasons.

### How To Solve?

Like this:

```java
int age = DateUtil.countAge("280237-7918", new Date())
```

If you are in a situation when you have what you have (`countAge` that takes only one parameter), then you can consider extracting it to a different class, like this:

```java
class Age {
    
    int fromSsn(final String ssn) {
        return DateUtil.countAge(ssn);
    }
}
```

You can then make this class a dependency of the class you are trying to test and mock (or fake) it with a dummy class that does not depend on a current year.

### To Summarize

Either be careful when choosing a library. Or do not increase a price of a service for the elderly customers.
