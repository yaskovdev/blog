---
title: Check Your Inbox
show_date: false
comments: false
---

To complete your subscription, open the confirmation email from Buttondown<span id="subscription-recipient" hidden> sent to <strong id="subscription-email"></strong></span> and follow the link. You will receive updates only after confirming your email address.

If you cannot find the email, check your spam folder.

<script>
(() => {
    const email = new URLSearchParams(window.location.search).get('email_address')?.trim();
    if (email) {
        const address = document.getElementById('subscription-email');
        const at = email.lastIndexOf('@');
        if (at > 0) {
            address.append(email.slice(0, at), document.createElement('wbr'), email.slice(at));
        } else {
            address.textContent = email;
        }
        document.getElementById('subscription-recipient').hidden = false;
    }
})();
</script>
