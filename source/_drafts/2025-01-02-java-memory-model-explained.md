---
layout: post
title: "Java Memory Model Explained"
date: 2025-01-01 00:54:16
show_date: true
categories: [ java, java-language-specification, java-memory-model, concurrency ]
comments: true
excerpt: "Java Memory Model Explained"
---

Java Memory Model

{% asset_img java-memory-model.png Java Memory Model %}

https://docs.oracle.com/javase/specs/, 17.4

https://chatgpt.com/share/6760c540-5b90-8011-8e1d-07f1e6de71a7

https://stackoverflow.com/questions/54081251/happens-before-and-reordering-of-volatile

https://stackoverflow.com/a/2441402/8217032

Check also: https://shipilev.net/blog/2016/close-encounters-of-jmm-kind/

Probably related: https://stackoverflow.com/questions/32492621/happens-before-and-program-order-in-java-memory-model
It also has a link to this great article: https://preshing.com/20130702/the-happens-before-relation/.
It also introduces po, similarly to hb. You can write po(x, y) looking at the program code in the same way as you write hb(x, y) looking at the code and the execution.

----

For each program, there are many possible executions.

----

"A memory model describes, given a program and an execution trace of that program, whether the execution trace is a legal execution of the program. The Java programming language memory model works by examining each read in an execution trace and checking that the write observed by that read is valid according to certain rules."
The "certain rules" are specified much later: "In a happens-before consistent set of actions, each read sees a write that it is allowed to see by the happens-before ordering."

Two reads of or writes to the same variable are said to be conflicting if at least one of the accesses is a write.
When a program contains two conflicting accesses that are not ordered by a happens-before relationship, it is said to contain _a data race_.

Shared memory is the same as the heap memory. It contains instance fields, static fields, and array elements. They are called "variables."
Local variables (including formal method parameters and exception handler parameters) are not shared between threads.
Inter-thread actions are called simply "actions."

Common optimizations:
1. Reordering
2. Reusing values read from the shared memory (caching).

"Each time the evaluation of thread t generates an inter-thread action, it must match the inter-thread action a of t that comes next in program order."
Okay, I'm on the line 10. I'm going to generate the next action. What action should I generate? Ah, okay, I should look at the _next_ line (that will be the action `a` that comes next in the program order).

"For each thread t, the synchronization order of the synchronization actions (§17.4.2) in t is consistent with the program order (§17.4.3) of t."
This means that in each execution the synchronization actions of a thread are ordered according to the program order of that thread (i.e, determined by how you wrote the code that the thread runs). You can also say that the thread's own execution remains deterministic with respect to synchronization actions (see the link to ChatGPT).

"Synchronization actions induce the synchronized-with relation on actions, defined as follows"
Look at the execution. Look at the synchronization actions. They are ordered according to the so called "synchronization order", where actions of the same thread are ordered according to the program order of that thread (see the paragraph above). You can find which paris of actions are "synchronized-with" each other by looking at the "defined as follows" list.

a synchronizes-with b in Russian: "a синхронизируется с b."

x synchronizes-with y => hb(x, y)

"For example, the write of a default value to every field of an object constructed by a thread need not happen before the beginning of that thread, as long as no read ever observes that fact."
There should be the happens-before relationship between the write of a default value to every field of an object constructed by a thread and the beginning of that thread. However, the _actual_ moment in time when the default value is written may be after the beginning of the thread, as long as no read ever observes that fact.

"In a happens-before consistent set of actions, each read sees a write that it is allowed to see by the happens-before ordering." explains the immediate previous paragraph. Example 17.4.5-1. further explains.

----

Look at an execution of a program. Is this a legal execution? Feel free to reorder the actions of one thread as long as the reordering "does not affect the execution of that thread in isolation." I.e., reorder if the reordering does not break your program.

----
The definition of what programs are called "correctly synchronized":

"A program is correctly synchronized <=> all sequentially consistent executions are free of data races."
NOTE: it's good that we only need to check data races in "sequentially consistent" executions only, because it's easier to reason about them, and they are a very small part of all the executions (with all the reordering and other magic that the compiler, the CPU, the OS and other parts of the computer can do).
There is a clarification of this definition in the JLS, see "a program is correctly synchronized if, when it is executed in a sequentially consistent manner, there are no data races." Also check the ChatGPT link and search by the quote, it has additional explanation that seems plausible.

An important property of correctly synchronized programs:

"A program is correctly synchronized => all executions of the program will appear to be sequentially consistent." Note: the comment right after this statement in the JLS further clarifies this and the above point.

"sequentially consistent" very informally means that the program behaves in the most intuitive and predictable way possible. See the JMM for the formal definition.

Could I, as a application (not JVM) developer, summarize the JMM like this:

You have to write programs that are correctly synchronized (TODO: why?). By definition of "correctly synchronized", this means that you have to write programs all sequentially consistent executions of which are free of data races.

By definition of a data race, this is the same as saying that you have to write programs all conflicting accesses of all sequentially consistent executions of which are ordered by a happens-before relationship.

----

https://shipilev.net/blog/2016/close-encounters-of-jmm-kind/#wishful-all-my-hb
Statements cannot hb, only actions can hb. To turn statements into actions we need an actual execution. Therefore, to analyze the hb relationships to understand if we have data races, we need to look at the actual execution.
The difference between a program and its executions is very important to talk about at the brownbag.
```
program = statement+
execution = action+
1 program has * (many) executions
```

----

https://shipilev.net/blog/2016/close-encounters-of-jmm-kind/#wishful-hb-actual
"Marking field a with volatile modifier precludes the 1, 0 outcome, because then the synchronization order consistency rule will take power over both reads." probably references to the next guarantee from the JMM: "For each thread t, the synchronization order of the synchronization actions (§17.4.2) in t is consistent with the program order (§17.4.3) of t."
The same guarantee, by the way, explains the result you see in your 2nd comment to https://stackoverflow.com/a/79289382/1862286.
By the way, it does not mean that _other threads_ will see the synchronization actions in the same order as the program order of the thread that generated them. It only means that the thread itself will see them in the order they're written in the program code. This "does not mean" explains this result https://github.com/openjdk/jcstress/blob/4434266ec6c3bb5f98567d9d069cef39f7b1609c/jcstress-samples/src/main/java/org/openjdk/jcstress/samples/jmm/advanced/AdvancedJMM_01_SynchronizedBarriers.java. See also https://shipilev.net/blog/2016/close-encounters-of-jmm-kind/#wishful-so-is-actual.

----

In brownbag mention https://shipilev.net/blog/2014/safe-public-construction. A good example of why `final` (or `readonly` in C#) is important. "It may save days of debugging time for you", see https://shipilev.net/blog/2016/close-encounters-of-jmm-kind/#wishful-tso-is-fine.

The goal of the brownbag: to build a mental model.

Imagine you wrote a program. What you do next? You pass it to an executor (usually compiler + CPU) that runs it. Every time you run your program, you produce a so-called execution of the program. If you run it multiple times, you may (and in practice almost always will) produce multiple different executions.

But what is an execution, exactly? In our model it's a sequence of reads from and writes to memory. E.g., read() -> 1 (read that returned 1) or write(2) (an attempt to write 2). TODO: why does it matter what writes our execution contains? Don't only reads matter?

Misconceptions:
1. I only need to cover writes with the lock, if I read the variable, the lock is not needed

----

"Thread interleaving is not deterministic (https://youtu.be/WTVooKLLVT8?t=293)."

"The performance boost is orders of magnitudes. So it's absolutely necessary (https://youtu.be/WTVooKLLVT8?t=843)."

----

See "зачем нужен этот весь матан, который начинается с пункта 17.4.6" from the chat with Arthur for a way to look at the 17.4.6-17.4.9 sections.

See also Table 17.4.5-A and Table 17.4.8-A.

----

It's better to write the executions in the Example 17.4.5-1 like this (see the https://shipilev.net/blog/2016/close-encounters-of-jmm-kind/ article for the notation):

```
write(B, 1)
write(A, 2)
read(A):0
read(B):0
```

```
read(A):2
read(B):1
write(B, 1)
write(A, 2)
```

----

One _possible_ way to explain what this means (see https://stackoverflow.com/questions/79301954/why-does-the-java-memory-model-allow-reads-to-observe-future-writes) is that we want all the traces in the §17.4.5 to be legal (because although weird, their results may be explained via a sequentially consistent executions). At the same time, we want the trace in §17.4.8 to be illegal (it is not only weird, but also illegal, because the result it leaves us with cannot be explained via a sequentially consistent execution).

----

Good paper: http://www-sop.inria.fr/everest/personnel/Gustavo.Petri/publis/jmm-vamp07.pdf

```
r2 := y; // assume that in Thread 2 the read of 42 from y could happen
x := r2; // it justifies the write of 42 to x in Thread 2
r1 := x; // we conclude that the read of x in Thread 1 could see a value of 42
y := r1; // it justifies the write of 42 to x in Thread 1
```

"The main idea to prevent the behaviours depicted in Figure 1 is to disallow circular justification of actions. The committing procedure guarantees this by disallowing reads not already committed to see writes that do not happen before them. Moreover, for a read `r` to be able to see a write `w` that is not `hb` related to it, `w` must be committed before `r`, thus, it must be able to happen regardless of whether `r` sees it."

See Java Language Specification (23), page 776:
Construct the C0, C1, ..., Cn = A sets and for each Ci provide a well-formed execution Ei so that every action in Ci must be one of the actions in Ei. And also 2 and 3.

E — justified execution (the execution being justified).
Ei — justifying execution.

"A simple way to achieve this would be to require that all reads see only writes that happen before them", but that would forbid data races, which is not what we want. Therefore, we require "all __uncommitted__ reads to see writes that happen before them."

"it is impossible to find a justifying execution", i.e., that intermediate execution Ei.

Very abstractly, we require that each execution E should be constructed step by step.

----