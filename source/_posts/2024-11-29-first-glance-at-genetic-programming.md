---
layout: post
title: "Intro To Genetic Programming: Can Evolution Write Computer Programs?"
date: 2024-11-29 14:41:57
show_date: true
image: /assets/tallinn.png
categories: [ genetic-algorithms, genetic-programming, push ]
comments: true
excerpt: Evolution is a powerful force. It has created the eye’s retina, the human brain and the tapir. But can it write computer programs?
---

Evolution is a powerful force. It has created the eye's retina, the human brain and the tapir. But can it write computer programs?

{% asset_img tapir.png Tapir %}

# Genetic Algorithms

I'm sure you have heard about the [genetic algorithms](https://www.mathworks.com/help/gads/what-is-the-genetic-algorithm.html). They are a method of solving optimization problems that is based on natural selection, the process that drives biological evolution.

One classic (and somewhat artificial) example of the problem that can be solved by the genetic algorithms is the backpack problem.

It goes like this: You have a backpack and a set of items. Each item has a weight and a value. You need to pack the items into the backpack so that the total weight does not exceed its maximum capacity, while maximizing the total value of the items.

For example, you have a backpack that can hold `5 kg` and the following items:

| Item   | Weight | Value |
|--------|--------|-------|
| Laptop | 3 kg   | 150 € |
| Book   | 2 kg   | 100 € |
| Phone  | 1 kg   | 50 €  |
| Watch  | 1 kg   | 70 €  |

A combination of items is called a solution or, in the context of the genetic algorithms, an individual. In case if the backpack problem, an individual can be represented as a binary string. For example, the string `1010` means that you put the laptop and the phone into the backpack. A set of individuals is called a "population". 

The genetic algorithms work as follows:

1. Randomly generate the initial population. In our case the population could be consisting of the next individuals:

   | Individual                                       |
   |--------------------------------------------------|
   | `1000` (take only the laptop)                    |
   | `0110` (take the book and the phone)             |
   | `1110` (take the laptop, the book and the phone) |
2. Evaluate the fitness of each individual in the population. In our case, the fitness is the total value of the items in the backpack. Note that the fitness of the last individual is `0`. It is because its total weight exceeds our constraint (the maximum capacity of our backpack).

    | Individual | Total Weight | Total Value |
    |------------|--------------|-------------|
    | `1000`     | 3 kg         | 150 €       |
    | `0110`     | 3 kg         | 150 €       |
    | `1110`     | 6 kg         | 0 €         |
3. Select the best individuals ("parents") from the population. The selection is based on the fitness of the individuals. The higher the fitness, the higher the chance to become a parent. In our example the parents will be: `1000`, `0110`.
4. Create a new population by crossing over or mutating the selected individuals. The crossover is a process of creating a new individual by combining two parents. The combining can be done in different ways. For example, you can take the first half of the first individual and the second half of the second individual.
The mutation is a process of changing an individual randomly. In our example the new population could be `{ 1010, 0100, 1001 }`, where the first two individuals are the result of the crossover and the last one is the result of the mutation of one of the parents.
5. Go to step 2.

The algorithm ends when on step 2 the fitness of the best individual is higher than some predefined threshold or the maximum number of iterations (also called "generations") is reached.

In our example we may find the best individual after a few iterations. It is the individual `1011` that represents the combination of the laptop, the phone and the watch. However, just like in with the real evolution, it is not guaranteed that the algorithm will find the most fit individual.

# From Genetic Algorithms To Genetic Programming

But what if instead of packing the backpack you want a genetic algorithm to write a computer program? Can it do that?

Yes. You just need to replace the backpack items with the instructions of a programming language. Then your individuals become computer programs. The fitness of the individuals is evaluated based on the result of the program execution. The crossover and mutation stay pretty much the same.

Using genetic algorithms to write computer programs is called [genetic programming](https://en.wikipedia.org/wiki/Genetic_programming).

# Finding The Right Language

But what programming language should we use to represent the individuals? Not every language suits this task.

Consider, for example, the next valid C# program:

```csharp
int i = 10;
int j = i - 2;
```

Now imagine that due to the crossover or mutation the instructions have swapped:

```csharp
int j = i - 2;
int i = 10;
```

This program will not compile. In fact, almost all the individuals of a population will be invalid programs, meaning that we won't be able to even calculate their fitness. Clearly, C# and similar languages are too strict for genetic programming.  We need a more forgiving language.

One option is Perl. It is so forgiving that [93% of paint splatters are valid Perl programs](https://www.mcmillen.dev/sigbovik/).

Another option is [Push](https://erp12.github.io/push-redux/pages/intro_to_push/). It is also very forgiving, however, it has an additional advantage: since it was created specifically for evolutionary computation, there is [a significant number of genetic programming libraries for Push](http://faculty.hampshire.edu/lspector/push.html).

## Push

Push is a very simple stack-backed interpreted language. The interpreter reads the instructions from left to right. If it sees a number, it pushes it to the stack. If it sees an operation, it pops the necessary elements from the stack, applies the operation to them and pushes the result back to the stack.

In addition to the `integer`s, Push has a few more types of data: `boolean`, `float`, `code`, `exec` and `name`, each of which has its own stack. You can read more about Push in the [official documentation](http://faculty.hampshire.edu/lspector/push3-description.html).

The result of a program execution is what is left on the stack after the last instruction is executed.

Our C# example would look like this in Push:

```push
(10 2 integer.-)
```

It instructs the Push interpreter to:

1. Push `10` to the stack.
2. Push `2` to the stack.
3. Subtract the top two numbers from the stack and push the result back to the stack. The result will be `8`.

The second example would be:

```push
(2 integer.- 10)
```

It says to the interpreter:

1. Push `2` to the stack.
2. Subtract the top two numbers from the stack and push the result back to the stack.
   Oh no, we only have one number on the stack! The C# compiler would raise the error, but the Push interpreter will simply ignore the instruction and proceed as if nothing happened.
3. Push `10` to the stack. So the result will be two numbers: `10 2`.

# Running Genetic Programming With Push

After checking the available Push implementations, I've ended up using the [Psh](https://github.com/yaskovdev/Psh) — a Push interpreter and genetic algorithm written in Java. It is supports most of the Push instructions and the main stages of genetic algorithms (including crossover and mutation).

How would you check if an integer number is even?

I bet you would do something like this:

```csharp
bool IsEven(int number) => number % 2 == 0;
```

Or maybe like this:

```csharp
bool IsEven(int number) => (number & 1) == 0;
```

In Push the solution would look like this, assuming the input is already on the integer stack:

```push
(2 integer.% 0 integer.=)
```

Now let's see how the evolution will tackle this task. For that, let's set up [the genetic programming problem](https://github.com/yaskovdev/Psh/blob/master/src/main/resources/gpsamples/IsNumberEven.pushgp).

As you can see from the file, we are going to run up to `10000` generations maintaining the population of `700` individuals. At each iteration, `70%` of the population will be selected for the crossover and `30%` for the mutation.

## Crossing Over Push Programs

Remember that the crossover is a process of creating a new individual by combining two parents.

How do we combine two Push programs?

A program is a tree of instructions. Push programs are no exception. To combine two trees, we can select a random node from each tree and *swap the subtrees that root from that node*. The result will be two new trees. Since we only need one new individual, we can discard one of the new trees.

For example, if we have the next two trees and the random nodes are marked with yellow:

{% asset_img before-crossing-over.png Before Crossing Over %}

Then the result of the swapping will be:

{% asset_img after-crossing-over.png After Crossing Over %}

Now we can discard one of the trees and use another one as the new individual.

## Mutating Push Programs

To mutate a push program we simply select a random subtree and replace it with another randomly generated tree of instructions.

## The Results

### Solution 1

Interesting way to check if a number is even:

```push
(false code.quote boolean.not code.stackdepth code.do*range)
```

`code.do*range` executes an instruction that is on the top of the code stack as many times as the number on the top
of the integer stack. The number on the top of the integer stack is what we want to check for evenness (let's say the
number is `n`). I.e., we apply `boolean.not` to `true` `n` times. If `n` is even, the result is `false`. If `n` is odd,
the result is `true`.

### Solution 2

Correct way:
```push
(exec.stackdepth 
    (integer.% boolean.frominteger boolean.not) float.dup)
```

Note how the evolution invented the number `2`: just the depth of the execution stack (`exec.stackdepth`).

### Solution 3

```push
(
    exec.stackdepth
        (integer.- exec.stackdepth)
        (integer.% boolean.frominteger)
        float.%
)
```

It is equivalent to the following C# code:

```csharp
bool IsEven(int number) =>
    Convert.ToBoolean((number - 3) % 2);
```

The evolution "invented" the numbers `3` and `2` again using the depth of the execution stack at certain points of the program execution.

### Solution 4

This is probably the worst possible way to check if a number is even.

```push
(integer.abs integer.neg true integer.dup integer.abs integer.pow exec.do*times code.= exec.= code.dup exec.do*times)
```

It only works if the absolute value of the number is `4` or bigger. It relies on the fact that the `execution-limit` was set to `150` during the evolution, meaning that no program was allowed to execute more than 150 instructions during the fitness calculation.

It is equivalent to the following C# code:

```csharp
bool IsEven(int number)
{
    const int executionLimit = 150;
    var answer = true;
    for (var i = 0; i < Math.Pow(-Math.Abs(number), Math.Abs(number)); i++)
    {
        if (i == executionLimit)
        {
            return answer;
        }

        i = i + 1 - 1; // Do some dummy work
    }

    answer = false;

    return answer;
}
```

# Summary

Were you ever wondering why is the part of our brain that is responsible for processing signals from our eyes located on the back side of our brain? Wouldn't it be more logical to put it to the front side? Or why the giraffe recurrent laryngeal nerve is twice as long as its neck, while it could be only a couple of centimeters long?

