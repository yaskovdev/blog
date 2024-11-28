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
hexo server
```

If you want Disqus to work locally, you need to add the following to your `hosts` file (`/private/etc/hosts` in macOS):

```text
127.0.0.1 yaskovdev.com
```

Then you should run Hexo on the 80 port:

```text
hexo server -p 80
```
