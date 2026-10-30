# Developer Notes [![Availability At SixNines](http://www.sixnines.io/b/0e54)](http://www.sixnines.io/h/0e54)

## Generating Static Files

```shell
hexo generate
```

You can then run an HTTP server from that folder:

```shell
npm install http-server -g
cd public
http-server
```

## Build And Run Locally

```shell
hexo clean && hexo server --draft
```

The option `--draft` will render drafts, see [this section](https://hexo.io/docs/writing.html#Drafts) for more info.

If you want Disqus to work locally, you need to add the following to your `hosts` file (`/private/etc/hosts` in macOS):

```text
127.0.0.1 yaskovdev.com
```

Then you should run Hexo on the 80 port:

```shell
hexo server -p 80
```

## Deploy To GitHub Pages

It will deploy the local version of the site to GitHub Pages.

```shell
hexo clean && hexo deploy
```

See [this article](https://hexo.io/docs/one-command-deployment#Git) for more information.

## Email Subscriptions

Subscriptions are managed by [Buttondown](https://buttondown.com/yaskovdev).

The form in `source\subscribe\index.md` uses Buttondown's native HTML POST endpoint so Buttondown can handle CAPTCHA, validation errors, and email confirmation. It does not need an API key.

Configure the redirects in Buttondown under **Settings > Subscribing > Redirects**:

| Setting | Production URL |
| --- | --- |
| After subscribing | https://yaskovdev.com/check-email/ |
| After confirming | https://yaskovdev.com/subscribed/ |

Deploy these pages before using the production URLs. For local testing, replace `https://yaskovdev.com` with `http://127.0.0.1:4000`. These settings apply to the whole newsletter, so switch back to production URLs after testing and deployment.

The flow is `/subscribe/` -> Buttondown -> `/check-email/` -> the confirmation email's signed link -> Buttondown -> `/subscribed/`. The blog pages only display instructions or success messages; Buttondown performs the actual confirmation. Move the initial-submission redirect to `/check-email/` before making `/subscribed/` a success page.

Readers unsubscribe using links in Buttondown emails or the [subscriber portal](https://buttondown.com/portal). Unsubscribe actions and their completion screens stay in Buttondown. The `/unsubscribe/` page explains these options and asks readers on the old, manually managed list to request removal by replying to an earlier newsletter.

The legacy `/unsubscribed/` page remains available for old links and points to `/unsubscribe/`; opening it does not unsubscribe anyone.
