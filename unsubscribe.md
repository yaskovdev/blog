---
layout: page
title: Unsubscribe
permalink: /unsubscribe
---

<style type="text/css">
    input[type=email] {
        width: 100%;
        padding: 12px 20px;
        margin: 8px 0;
        display: inline-block;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
    }

    button {
        background-color: #4CAF50;
        color: white;
        padding: 14px 20px;
        margin: 8px 0;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }

    button:hover {
        background-color: #45a049;
    }
</style>

<form action="https://formsubmit.co/2fbaff1baa2edf1cab112c50135fdf9b" method="POST">
    <input type="hidden" name="_next" value="{{ site.url }}/unsubscribed"/>
    <input type="hidden" name="_subject" value="Unsubscribe Me"/>
    <label for="email">Your email</label>
    <input id="email" class="field field-text" name="email" size="25" maxlength="255" type="email"
        required="required"/>
    <button type="submit">Unsubscribe</button>
</form>
