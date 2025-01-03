---
layout: post
title: "Can We Write Complex Programs in Push?"
date: 2024-12-21 16:33:16
show_date: true
categories: [ push, psh, turing-completeness, universal-register-machine, urm ]
comments: true
excerpt: "When I first saw Push, I wondered: Is this suspiciously simple language really powerful enough for any piece of software to be written in it?"
---

When I first saw Push, I wondered: Is this suspiciously simple language really powerful enough to express _any_ piece of software?

If it is, then artificial evolution "equipped" with Push will eventually create arbitrarily complex software. If it isn't, there will always be programs that it will never produce, no matter how long I wait. In this case, the question then becomes: What are those "unreachable" programs?

If you’re wondering what I'm talking about, you might have missed my previous article. You can catch up by reading {% post_link 2024-11-29-intro-to-genetic-programming-can-evolution-write-computer-programs '"Intro To Genetic Programming: Can Evolution Write Computer Programs?"' %}. Alternatively, you can quickly learn about Push [here](https://erp12.github.io/push-redux/pages/intro_to_push/).

{% asset_img mechanical-calculator.png Mechanical Calculator %}

# Turing Completeness

If I could prove that Push is Turing-complete, it would mean that Push can compute any function that is computable. [This article](https://evinsellin.medium.com/what-exactly-is-turing-completeness-a08cc36b26e2) provides a great explanation of Turing-completeness.

According to the Church–Turing thesis, any mechanical device, no matter how complex, can compute only computable functions ([source](https://en.wikipedia.org/wiki/Computable_function)).

This would mean that anything a computer can do, Push could also do.

In theory<sup>*</sup>, this implies that an evolutionary process using Push could eventually create software of unlimited complexity, provided it had enough time and storage space.

# How to Prove Turing Completeness

One of [the ways](https://iwriteiam.nl/Ha_bf_Turing.html) to prove that a language is Turing-complete<sup>**</sup> is to show that it can simulate a Universal Turing Machine.

I don’t need to simulate a Universal Turing Machine directly, though. Instead, I can show that it's possible to simulate a language that is already proven to simulate a Universal Turing Machine. Ideally, this language should be either simple or very similar to the one I’m trying to prove is Turing-complete.

# Universal Register Machine

One of the simplest languages that can simulate a Universal Turing Machine is the Universal Register Machine (URM).

The language manipulates an array of registers. Each register can store an integer. The language has only five commands:

1. `an` — increment register `n`;
2. `sn` — decrement register `n`;
3. `x;y` — execute command x and then y;
4. `(x)n` — execute command `x` while register `n` is nonzero; and
5. `.` — halt.

Some URM program examples include:

Add register 3 to register 2:

```urm
(a2;s3)3.
```

Swap registers `1` and `2`:

```urm
(s1;a3)1; (s2;a1)2; (a2;s3)3.
```

Multiply register 2 with register 3:

```urm
(a4;a5;s2)2; ((a2;s4)4; s3; (a1;a4;s5)5; (a5;s1)1)3.
```

Daniel Cristofani managed to [prove](http://brainfuck.org/urmutm.txt) that URM with only 5 registers is Turing-complete.

Therefore, __to prove that Push is Turing-complete, I need to show that it can simulate URM with 5 registers__.

# Writing a URM Interpreter in Push

At first, I was not sure if it was even possible, let alone how to approach it. Luckily, Lee Spector, the creator of Push, [drew my attention](https://github.com/erp12/pyshgp/discussions/167#discussioncomment-11430700) to the `yank` and `shove` instructions which provide random access to Push stacks, essentially turning them into random-access memory. All that remained was to use the instructions correctly.

## Stage 1: Writing a URM Interpreter in C#

I decided to start with a URM interpreter in a more familiar language — C#. Then I could gradually get rid of the C# specific features to turn the implementation into something that I could easily (ideally almost "mechanically") translate into Push.

This part was relatively straightforward, and you can find the C# implementation [here](https://github.com/yaskovdev/sandbox/blob/master/UniversalRegisterMachineInterpreter/UniversalRegisterMachineInterpreter/OriginalInterpreter.cs).

You may notice that the interpreter only supports registers from `0` to `9`, however, it is more than enough for my purposes—remember that I only need to simulate URM programs with 5 registers.

## Stage 2: Re-Writing the Interpreter Without Relying on Variables and Strings

In Push, there are no conventional variables, including those to store function arguments. I can only use the stacks, which act like arrays with random access, thanks to the `yank` and `shove` instructions.

This means that I should now rewrite my C# interpreter so that it can only use an array for all the data it needs. What data does it need, specifically? The answer is the URM program itself, the registers, the integer pointer to the current URM instruction, and the [auxiliary integer variable `b` that it uses to count the number of brackets](https://github.com/yaskovdev/sandbox/blob/master/UniversalRegisterMachineInterpreter/UniversalRegisterMachineInterpreter/OriginalInterpreter.cs#L26).

To accommodate all of that, I decided to organize the memory as follows:

{% asset_img urm-interpreter-memory.png URM Interpreter Memory %}

Now I finally understand what my programming teacher was explaining back when I was attending university. He said that in the [Von Neumann architecture](https://en.wikipedia.org/wiki/Von_Neumann_architecture), instructions and data are stored in the same memory and appear indistinguishable from each other.

Another issue to address is that a URM program is a string, but our memory is an array of integers. To solve this, I decided to encode a URM program as an array of integers as follows:

| URM Symbol | Encoding |
|------------|----------|
| .          | 0        |
| a          | -1       |
| s          | -2       |
| (          | -3       |
| )          | -4       |
| 1          | 1        |
| 2          | 2        |
| 3          | 3        |
| 4          | 4        |
| 5          | 5        |

The result is (quite an ugly) [C# implementation](https://github.com/yaskovdev/sandbox/blob/master/UniversalRegisterMachineInterpreter/UniversalRegisterMachineInterpreter/LimitedInterpreter.cs). Although it is not pretty, I can now translate it into Push relatively easily.

## Stage 3: Translating the Interpreter in C# into Push

### Adding Multiline Programs Support to Psh

If you've seen my previous article, you may know that I have been using [Psh](https://github.com/yaskovdev/Psh) to run Push programs.

However, Psh did not support multiline programs.

I quickly abandoned the futile attempts to write the interpreter in one line, and instead added the support for multiline Push programs to Psh.

### Adding Comments Support to Psh

Another problem with Psh was that it did not support code comments. You rarely need comments in conventional languages—meaningful names for variables and functions make comments an almost redundant feature. But because Push has neither variables nor functions, comments are essential. Since the [official Push specification](http://faculty.hampshire.edu/lspector/push3-description.html) says nothing about the format of the comments, I decided to add them to Psh in this way:

```push
(1 2 integer.+) # This line adds 1 and 2
```

### Finding a Way to "Debug" Push Programs

As John Carmack [explained](https://youtu.be/tzr7hRXcwkw?t=232) in one of his interviews, it is crucial to be able to debug your code, because your head is a "faulty interpreter."

Unfortunately, Psh does not have a debugger.

There is a way to mitigate this issue, though: the `exec.flush` instruction. The instruction causes the Push interpreter to stop immediately. So, you can think of it as a breakpoint.

Since Psh prints the Push stacks after each instruction, I could see the state of the stacks at the "breakpoint," just like in a normal debugger:

{% asset_img psh-output.png Psh Output %}

There are limitations. For example, I couldn't resume the program execution after hitting such a "breakpoint." However, it was worth giving it a try before writing the debugger myself.

By the way, the same `exec.flush` instruction is what I need to implement the `.` (halt) command in URM.

### Translating the C# `if-else` Statement Into Push

After solving the above issues, the only thing left was to find the Push alternatives for the remaining C# statements.

The `if-else` statement in C#

```csharp
if (condition)
{
    // The body of the if statement
}
else
{
    // The body of the else statement
}
```

can be expressed in Push using the conditional execution (`exec.if`):

```push
<condition> exec.if
(
    # The body of the if statement
)
(
    # The body of the else statement
)
```

### Translating the C# `while` Statement Into Push

The `while` loop that looks like this in C#

```csharp
while (condition)
{
    // The body of the loop
}
```

can be written in Push using the Y combinator (`exec.y`) and the conditional execution (`exec.if`):

```push
exec.y
(
    <condition> exec.if
    (
        # The body of the loop
    ) 
    (
        exec.pop
    )
)
```

### Translating the C# Indexing Operator Into Push

The interpreter needs to access array elements by index quite a lot. The C# version is doing it like this: `memory[i]`. The `[]` is called "the indexing operator." It allows for reading or writing the array element at the specified index.

In Push, I can only "access" the top of the stack. So, I need to use `integer.yank` to move the element I need to the top of the stack. Then I can modify the element and use `integer.shove` to move it back. For example:

```csharp
memory[60] += 1;
```

turns into:

```push
60 integer.yank
1 integer.+
60 integer.shove
```

If I only need to read the element without modifying it, I can use `integer.yankdup` (no need to `integer.shove` it in this instance). For example:

```csharp
memory[6] == 0;
```

becomes:

```push
6 integer.yankdup
0 integer.=
```

### Putting it all Together

After applying the above transformations to the C# code, I ended up with the [__final Push implementation of the interpreter__](https://gist.github.com/yaskovdev/71010ede2d070ed88c11334160fedc88).

The interpreter takes the registers and the encoded URM program as input, executes the program, and produces the final state of the registers as the result.

## Testing the Interpreter

Let's test the URM interpreter against the next input:

```push
0 0 6 3 0 0
-3 -1 4 -1 5 -2 2 -4 2 -3 -3 -1 2 -2 4 -4 4 -2 3 -3 -1 1 -1 4 -2 5 -4 5 -3 -1 5 -2 1 -4 1 -4 3 0
```

The second line is the encoded URM program that multiplies register 2 (initialized with `6` in the first line) with register 3 (initialized with `3`). The result of the program is the next `integer` stack:

```
0 0 18 0 6 6 -3 -1 4 -1 5 -2 2 -4 2 -3 -3 -1 2 -2 4 -4 4 -2 3 -3 -1 1 -1 4 -2 5 -4 5 -3 -1 5 -2 1 -4 1 -4 3 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 37 0
```

As you can see, the state of the registers has changed to:

```
0 0 18 0 6 6
```

The register 2 now contains `18`, which is the expected result of the multiplication (the program treats registers 4 and 5 as auxiliary registers).

# To Summarize

Now that we've successfully simulated a URM with 5 registers in Push — and a URM with 5 registers can simulate a Universal Turing Machine — we can conclude that Push is Turing-complete. In fact, we could strip away most of Push's features and still retain a Turing-complete language.

This demonstrates that Push is powerful enough to represent any computation, and by extension, any piece of software.

----

<sup>*</sup> In practice, Turing-completeness is often not enough. For example, Push programs might become so slow and memory-intensive that they can't scale to the size of real-world programs. But—let's deal with one problem at a time.
<sup>**</sup> Strictly speaking, a language itself cannot be Turing-complete. When I say "a language is Turing-complete," I actually mean that a computational system using the language to express programs is Turing-complete.
