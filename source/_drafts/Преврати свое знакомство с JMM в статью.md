Java Memory Model

https://docs.oracle.com/javase/specs/, 17.4

https://chatgpt.com/share/6760c540-5b90-8011-8e1d-07f1e6de71a7

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

Probably related: https://stackoverflow.com/questions/32492621/happens-before-and-program-order-in-java-memory-model