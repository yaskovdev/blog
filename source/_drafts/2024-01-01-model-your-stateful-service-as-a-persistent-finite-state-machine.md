---
layout: post
title: "Model Your Stateful Service As A Persistent Finite State Machine"
date: 2024-01-01 00:00:00
show_date: true
categories: [ ]
comments: true
excerpt: "Model your stateful service as a persistent finite state machine."
---

One (though [not the only](https://github.com/NitorCreations/nflow)) way to think of nFlow is a persistent finite state machine.

What problems does nFlow (or other implementations of the persistent FSM) solve?

1. Handling retries from upstream services (should be idempotent).
2. Restoring the state of my system after a failure (an exception, a restart or a crash). By the way, another way is a persistent event log. It has its own trade-offs (TODO: what trade-offs?)
3. TODO: check the work item you created earlier.

The repository with the demo: https://github.com/yaskovdev/distributed-transaction-sandbox.
