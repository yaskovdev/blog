---
layout: post
title: "Is It Possible to Write Complex Programs in Push?"
date: 2024-12-05 16:33:16
show_date: true
categories: [ push, psh, turing-completeness, universal-register-machine, urm ]
comments: true
excerpt: "At first, Push might seem like a toy language that can’t do much. But is that true? What makes a language capable of expressing any kind of software — from Minesweeper to a full-fledged operating system like macOS or Windows? Let’s find out."
---

At first, Push might seem like a toy language that can’t do much. But is that true? What makes a language capable of expressing any kind of software — from Minesweeper to a full-fledged operating system like macOS or Windows? Let’s find out.

If you’re wondering what Push is and what it was created for, you might have missed my previous article. You can catch up by reading {% post_link 2024-11-29-intro-to-genetic-programming-can-evolution-write-computer-programs '"Intro To Genetic Programming: Can Evolution Write Computer Programs?"' %}. Alternatively, you can quickly learn about Push [here](https://erp12.github.io/push-redux/pages/intro_to_push/).

{% asset_img turing-completeness.png Turing Completeness %}

# Turing Completeness

Think of your favourite piece of software. It could be a web browser, a text editor, or a game. What programming language is it written in? Chances are, it's a high-level language like C++, Java, or Python. But have you ever wondered if you can, at least in theory, rewrite the same software in SQL, HTML, or [Conway's Game of Life](https://youtu.be/Kk2MH9O4pXY)?

Turns out that there is a property of a programming language that, if present, allows you to use that language [to solve any problem that can be solved using a computer](https://www.lenovo.com/us/en/glossary/what-is-turing-completeness/). This property is called Turing-completeness. A language is Turing-complete if you can implement any computable function in that language.

A computable function is a function that you can express with a Turing machine. I.e., you can construct a Turing machine that for any input of the function will produce the same output as the function.

# Is Push Language Turing-Complete?

We have already discussed Push language in the previous article. It is a stack-based language that is [not intended for people to write computer programs in](https://youtu.be/ryW9w5cAwaI?t=26). Instead, it is used in genetic programming and allows genetic algorithms to do that job.

When I only started to learn about Push, I was curious whether it is powerful enough for any piece of software to be written in it. In other words, is Push Turing-complete?

If yes, then evolution could potentially write any software for us (just need to figure out where to take the computing power to speed up the process a little bit). If no, then we need to find another language for genetic programming.

# Universal Register Machine

1. Add multiline support.
2. Add a way to leave comments.

# To Summarize

In fact, you could cut most of the features of Push and still have a Turing-complete language.