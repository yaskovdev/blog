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

There are [three ways](https://iwriteiam.nl/Ha_bf_Turing.html) to prove that a language is Turing-complete:

1. Show there is some mapping from each possible Turing machine to a program in the language.
2. Show that there is a program in the language that emulates a Universal Turing Machine (think of it as a programmable Turing machine).
3. Show that the language is equivalent with (or a superset of) a language that is known to be Turing-complete.

Let's try the third way: Instead of proving that Push is Turing-complete, let's try to find a Turing-complete language and prove the language to be Push-complete.

Ideally, the language should either be very simple, or very similar to Push.

# Universal Register Machine

One of the simplest [Turing-complete](http://brainfuck.org/urmutm.txt) languages I've found is the Universal Register Machine (URM).

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

TODO: it's enough to emulate an URM with 5 registers.

# Psh Improvements

1. Add multiline support.
2. Add a way to leave comments.

# To Summarize

In fact, you could cut most of the features of Push and still have a Turing-complete language.
