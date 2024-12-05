---
layout: post
title: "Is Push Language Turing-Complete?"
date: 2024-12-05 16:33:16
show_date: true
categories: [ push, psh, turing-completeness, universal-register-machine, urm ]
comments: true
excerpt: "Think of your favourite piece of software. It could be a web browser, a text editor, or a game. What programming language is it written in? Chances are, it's a high-level language like C++, Java, or Python. But could you rewrite the same software in a language like the assembly, or SQL, or HTML, or Factorio?"
---

# Turing Completeness

Think of your favourite piece of software. It could be a web browser, a text editor, or a game. What programming language is it written in? Chances are, it's a high-level language like C++, Java, or Python. But could you rewrite the same software in a language like the assembly, or SQL, or HTML, or [Factorio](https://youtu.be/0bAuP0gO5pc)?

Turns out that there is a property of programming languages that, if present, allows you to write any program in that language. This property is called Turing-completeness. A language is Turing-complete if it can simulate a Universal Turing Machine (UTM). A UTM is a theoretical machine that can simulate any algorithm, given enough time and memory.

TODO: move the picture to the correct folder
{% asset_img turing-completeness.png Turing Completeness %}

# Is Push Language Turing-Complete?

We have already discussed Push language in the previous article. It is a stack-based language that is [not intended for people to write computer programs in](https://youtu.be/ryW9w5cAwaI?t=26). Instead, it is used in genetic programming and allows genetic algorithms to do that job.

When I only started to learn about Push, I was curious whether it is powerful enough for any piece of software to be written in it. In other words, is Push Turing-complete?

If yes, then evolution could potentially write any software for us (just need to figure out where to take the computing power to speed up the process a little bit). If no, then we need to find another language for genetic programming.