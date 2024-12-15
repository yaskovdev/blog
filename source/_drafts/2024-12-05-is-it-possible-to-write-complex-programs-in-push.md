---
layout: post
title: "Is It Possible to Write Complex Programs in Push?"
date: 2024-12-05 16:33:16
show_date: true
categories: [ push, psh, turing-completeness, universal-register-machine, urm ]
comments: true
excerpt: "When I first saw Push, I wondered: Is this suspiciously simple language really powerful enough for any piece of software to be written in it?"
---

When I first saw Push, I wondered: Is this suspiciously simple language really powerful enough to express _any_ piece of software?

If it is, then artificial evolution "equipped" with Push will eventually create arbitrarily complex software. If it isn't, there will always be programs that it will never produce, no matter how long we wait. In this case the question becomes: what are those "unreachable" programs?

If you’re wondering what I'm talking about, you might have missed my previous article. You can catch up by reading {% post_link 2024-11-29-intro-to-genetic-programming-can-evolution-write-computer-programs '"Intro To Genetic Programming: Can Evolution Write Computer Programs?"' %}. Alternatively, you can quickly learn about Push [here](https://erp12.github.io/push-redux/pages/intro_to_push/).

{% asset_img turing-completeness.png Turing Completeness %}

# Turing Completeness

If we could prove that Push is Turing-complete, it would mean that Push can compute any function that is computable. [This article](https://evinsellin.medium.com/what-exactly-is-turing-completeness-a08cc36b26e2) provides a great explanation of Turing-completeness.

According to the Church–Turing thesis, any mechanical device, no matter how complex, can compute only computable functions ([source](https://en.wikipedia.org/wiki/Computable_function)).

This would mean that anything a computer can do, Push could also do.

In theory, this implies that an evolutionary process using Push could eventually create software of unlimited complexity, provided it had enough time and storage space.

# How To Prove Turing Completeness?

One of [the ways](https://iwriteiam.nl/Ha_bf_Turing.html) to prove that a language is Turing-complete is to show that it can simulate a Universal Turing Machine.

We don't have to simulate a Universal Turing machine directly though. Instead, we can show that we can simulate a language X that, in turn, can simulate a Universal Turing machine. The language X, ideally, should either be simple or very similar to the language we are trying to prove Turing-complete.

# Universal Register Machine

One of the simplest languages that can simulate a Universal Turing Machine is the Universal Register Machine (URM).

The language maintains an array of registers. Each register can store an integer. The language has only five commands:

1. `an` — increment register `n`,
2. `sn` — decrement register `n`,
3. `x;y` — execute command x and then y,
4. `(x)n` — execute command `x` while register `n` is nonzero,
5. `.` — halt.

Some URM program examples:

Add register 3 to register 2:

```urm
(a2;s3)3.
```

Swap non-negative values in registers `1` and `2`:

```urm
(s1;a3)1; (s2;a1)2; (a2;s3)3.
```

Multiply register 2 with register 3:

```urm
(a4;a5;s2)2; ((a2;s4)4; s3; (a1;a4;s5)5; (a5;s1)1)3.
```

Daniel Cristofani managed to [prove](http://brainfuck.org/urmutm.txt) that URM with only 5 registers is Turing-complete.

Therefore, __to prove that Push is Turing-complete, we need to show that it can simulate URM with 5 registers__.

# Writing a URM Interpreter in Push

At first, I was not sure if it was even possible and how to approach it. Luckily, Lee Spector, the creator of Push, [drew my attention](https://github.com/erp12/pyshgp/discussions/167#discussioncomment-11430700) to the `yank` and `shove` instructions which provide random access to Push stacks, essentially turning them into URM registers. All that remained was to apply the instructions correctly.

## Stage 1: Writing a URM Interpreter in C#

I decided to start with a URM interpreter in a more familiar language — C#. Then I could gradually get rid of the C# specific features to turn the implementation into something that I could easily (ideally almost "mechanically") translate into Push.

This part was relatively easy, you can find the code [here](https://github.com/yaskovdev/sandbox/blob/master/UniversalRegisterMachineInterpreter/UniversalRegisterMachineInterpreter/OriginalInterpreter.cs).

The interpreter only supports registers from `0` to `9`, however, it is more than enough for our purposes: remember that we only need to simulate URM programs with 5 registers.

## Stage 2: Re-Writing the Interpreter in C# Without Using Local Variables

In Push, we do not have the luxury of local variables, including function arguments. We can only use the stacks, which we can think of as arrays of registers, thanks to the `yank` and `shove` instructions.

This means that I have to now rewrite my C# interpreter so that it could only use an array of registers for all the data it needs. What data specifically? The URM program itself, the registers, an integer pointer to the current URM instruction, and an [auxiliary integer variable that the interpreter uses to count the number of brackets](https://github.com/yaskovdev/sandbox/blob/master/UniversalRegisterMachineInterpreter/UniversalRegisterMachineInterpreter/OriginalInterpreter.cs#L26).

## Stage 3: Re-Writing the Interpreter in C# in Push

TODO: explain the encoding table that maps URM characters to integers.

# Psh Improvements

1. Add multiline support.
2. Add a way to leave comments.

# To Summarize

In fact, you could cut most of the features of Push and still have a Turing-complete language.
