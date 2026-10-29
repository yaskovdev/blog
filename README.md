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

Readers unsubscribe using links in Buttondown emails or the [subscriber portal](https://buttondown.com/portal). The `/unsubscribe/` page links to these options.

The `/subscribed/` and `/unsubscribed/` pages remain available for old links; they do not confirm a subscription or unsubscribe anyone.
