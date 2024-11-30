---
layout: post
title: "Intro To Genetic Programming: Can Evolution Write Computer Programs?"
date: 2024-11-29 14:41:57
show_date: true
image: /assets/tallinn.png
categories: [ genetic-programming, push ]
comments: true
excerpt: Evolution is a powerful force. It has created the human brain, the eye's retina and the tapir. But can it write computer programs?
---

Evolution is a powerful force. It has created the human brain, the eye's retina and the tapir. But can it write computer programs?

# Genetic Algorithms

I'm sure you have heard about the [genetic algorithms](https://www.mathworks.com/help/gads/what-is-the-genetic-algorithm.html). They are a method of solving optimization problems that is based on natural selection, the process that drives biological evolution.

One classic (and somewhat artificial) example of the problem that can be solved by the genetic algorithms is the backpack problem.

It goes like this. You have a backpack and a set of items. Each item has a weight and a value. You have to put the items into the backpack so that the total weight does not exceed the maximum weight of the backpack and the total value of the items is maximized.

For example, you have a backpack that can hold `5 kg` and the following items:

| Item   | Weight | Value |
|--------|--------|-------|
| Laptop | 3 kg   | 150 € |
| Book   | 2 kg   | 100 € |
| Phone  | 1 kg   | 50 €  |
| Watch  | 1 kg   | 70 €  |

A combination of items is called a solution or, in the context of the genetic algorithms, an individual. In case if the backpack problem, an individual can be represented as a binary string. For example, the string `1010` means that you put the laptop and the phone into the backpack. A set of individuals is called a "population". 

The genetic algorithms work as follows:

1. Randomly generate the initial population. In our case the population could be consisting of the next individuals: `{ 1000, 0110, 1110 }`.
2. Evaluate the fitness of each individual in the population. In our case, the fitness is the total value of the items in the backpack. Note that the fitness of the last individual is `0`. It is because its total weight exceeds our constraint (the maximum weight of the backpack).

    | Individual | Total Weight | Total Value |
    |------------|--------------|-------------|
    | `1000`     | 3 kg         | 150 €       |
    | `0110`     | 3 kg         | 150 €       |
    | `1110`     | 6 kg         | 0 €         |
3. Select the best individuals ("parents") from the population. The selection is based on the fitness of the individuals. The higher the fitness, the higher the chance to become a parent. In our example the selection will be `{ 1000, 0110 }`.
4. Create a new population by crossing over or mutating the selected individuals. The crossover is a process of creating a new individual by combining two parents. The combining can be done in different ways. For example, you can take the first half of the first individual and the second half of the second individual.
The mutation is a process of changing an individual randomly. In our example the new population could be `{ 1010, 0100, 1001 }`, where the first two individuals are the result of the crossover and the last one is the result of the mutation of one of the parents.
5. Go to step 2.

The algorithm ends when on step 2 the fitness of the best individual is higher than some predefined threshold or the maximum number of iterations is reached.

In our example we may find the best individual after a few iterations. It is the individual `1011` that represents the combination of the laptop, the phone and the watch. However, just like in with the real evolution, it is not guaranteed that the algorithm will find the most fit individual.

# From Genetic Algorithms To Genetic Programming

But what if instead of packing the backpack you want a genetic algorithm to write a computer program? Can it do that?

Yes. You just need to replace the backpack items with the instructions of a programming language. Then your individuals become computer programs. The fitness of the individuals is evaluated based on the result of the program execution. The crossover and mutation stay pretty much the same.

Using genetic algorithms to write computer programs is called [genetic programming](https://en.wikipedia.org/wiki/Genetic_programming).

### Push Programming Language

TODO: a few words about Turing-completeness of the Push.

Were you ever wondering why is the part of our brain that is responsible for processing signals from our eyes located on the back side of our brain? Wouldn't it be more logical to put it to the front side? Or why the giraffe *** nerve is twice as long as its neck, while it could be only a couple of centimeters work?

How would you check if an integer number is even?

I bet you would do something like this:

```java
boolean isEven(int number) {
    return number % 2 == 0;
}
```

Or maybe like this, if you tend to preliminarily optimize your code:

```java
boolean isEven(int number) {
    return number & 1 == 0;
}
```

In Push the solution would look like below one, assuming the input is on the integer stack.
```push
(2 integer.% 0 integer.=)
```

Interesting way to check if a number from [0, 10) is even:

```push
(false code.quote boolean.not code.stackdepth code.do*range)
```

`code.do*range` executes an instruction that is on the top of the code stack as many times as the number on the top
of the integer stack. The number on the top of the integer stack is what we want to check for evenness (let's say the
number is `n`). I.e., we apply `boolean.not` to `true` `n` times. If `n` is even, the result is `false`. If `n` is odd,
the result is `true`.

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
