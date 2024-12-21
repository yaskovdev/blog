---
title: Sorry to See You Go
show_date: false
comments: false
---

Enter your email to unsubscribe and stop receiving updates.

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
        background-color: var(--link-color);
        color: var(--text-color);
        padding: 14px 20px;
        margin: 8px 0;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 0.8em;
        font-family: var(--body-stack);
    }

    button:hover {
        background-color: var(--link-hover-color);
    }
</style>

<form method="POST" action="https://submit-form.com/lVazsESIY" data-botpoison-public-key="pk_bcda581e-0b42-49ea-af0e-8d66292d774f">
    <input type="hidden" name="_redirect" value="{% fixed_full_url_for /unsubscribed %}"/>
    <input type="hidden" name="_email.subject" value="Unsubscribe Me"/>
    <label for="email">Your email</label>
    <input id="email" class="field field-text" name="email" size="25" maxlength="255" type="email" required="required"/>
    <button type="submit">Unsubscribe</button>
</form>