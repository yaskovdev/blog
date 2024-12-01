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

The fitness function takes the top value from the boolean stack and compares it to the expected result. The expected result is `true` if the number is even and `false` otherwise.

## Crossing Over Push Programs

Remember that the crossover is a process of creating a new individual by combining two parents.

How do we combine two Push programs?

A program is a tree of instructions. Push programs are no exception. To combine two trees, we can select a random node from each tree and *swap the subtrees that root from that node*. The result will be two new trees. Since we only need one new individual, we can discard one of the new trees.

For example, if we have the next two trees and the random nodes are marked with yellow:

{% asset_img crossing-over-before.png Before Crossing Over %}

Then the result of the swapping will be:

{% asset_img crossing-over-after.png After Crossing Over %}

Now we can discard one of the trees and use another one as the new individual.

## Mutating Push Programs

To mutate a push program we simply select a random subtree and replace it with another randomly generated tree of instructions.

For example, the subtree that grows from the node marked with red:

{% asset_img mutation-before.png Before Mutation %}

May mutate into another subtree:

{% asset_img mutation-after.png After Mutation %}

# The Results

We are finally ready to use Psh to run the genetic programming and see what the evolution will come up with.

## Solution 1

Let's start from the most neat solution that the evolution has found:

```push
(exec.stackdepth 
    (integer.% boolean.frominteger boolean.not) float.dup)
```

It is equivalent to the following C# code:

```csharp
bool IsEven(int number) => !Convert.ToBoolean(number % 2);
```

Note how it invented the number `2`: it's just the depth of the execution stack at the beginning of the execution (`exec.stackdepth`).

The solution is also doing dummy work that does not bring us any closer to solving the problem (`float.dup`). This is a consequence of the fitness function imperfection. Indeed, our fitness function is not giving preference to concise and efficient solutions. Just like in the real world: if the natural selection does not favor a trait, the next generations will most likely not have it.

## Solution 2

Another way to check if a number is even that involves more elaborate Push instructions:

```push
(false code.quote boolean.not code.stackdepth code.do*range)
```

`code.do*range` executes an instruction that is on the top of the `code` stack one time more than the difference between the top two number on the `integer` stack. The top two numbers on the integer stack are `2` and our input number. The program, essentially, applies `boolean.not` to `false` `n - 1` times, where `n` is our input number.

If `n` is even, then `n - 1` is odd, then the result is `true`. If `n` is odd, then `n - 1` is even, then the result is `false`.

An equivalent C# code would be:

```csharp
bool IsEven(int number)
{
    var increase = 2 <= number;
    var answer = false;
    for (var i = 2; increase && i <= number || !increase && i >= number; i = increase ? i + 1 : i - 1)
    {
        answer = !answer;
    }

    return answer;
}
```

It also illustrates how `code.do*range` works: it increases or decreases the current index to move it closer to the destination index.

## Solution 3

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

## Solution 4

This is probably the worst possible way to check if a number is even.

```push
(
    integer.abs
    integer.negtrue
    integer.dup
    integer.abs
    integer.pow
    exec.do*times
    code.=
    exec.=
    code.dup
    exec.do*times
)
```

It is equivalent to the following C# code:

```csharp
bool IsEven(int number)
{
    const int executionLimit = 150;
    var answer = true;
    var numberOfIterations =
        Math.Pow(-Math.Abs(number), Math.Abs(number));
    for (var i = 0; i < numberOfIterations; i++)
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

For numbers `-2`, `0`, `2` it gives the wrong answer, because for them the `numberOfIterations` is not big enough for the loop to hit the execution limit. Just like a real evolution that creates animals fit for the environment they live in, the genetic programming produces solutions that are fit from the point of view of the fitness function. In our case, the fitness function is using a sample from a range of integer numbers and is taking into consideration some of the edge cases, like, for example, numbers that are too close to zero.

It relies on the fact that the `execution-limit` was set to `150` during the evolution, meaning that no program (individual) was allowed to execute more than 150 instructions during the fitness calculation.

# Summary

But can the evolution write computer programs? Sure it can.

But the true power of genetic programming is being able to find solutions for tasks that are not easy to solve by humans. Next time we will take a look at one of such tasks. Stay tuned!
