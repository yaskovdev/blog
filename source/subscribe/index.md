---
title: Stay Updated
show_date: false
comments: false
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

Subscribe with your email to receive notifications whenever a new article is published. You’ll receive a confirmation email once your subscription is processed.

<form method="POST" action="https://submit-form.com/lVazsESIY" data-botpoison-public-key="pk_bcda581e-0b42-49ea-af0e-8d66292d774f">
    <input type="hidden" name="_redirect" value="{% fixed_full_url_for /subscribed %}"/>
    <input type="hidden" name="_email.subject" value="Subscribe Me"/>
    <label for="email">Your email</label>
    <input id="email" class="field field-text" name="email" size="25" maxlength="255" type="email" required="required"/>
    <button type="submit">Subscribe</button>
</form>
