const DEFAULT_PRIORITY = 10

hexo.extend.filter.register('post_permalink', data => {
    const slug = data.slug.replace(/^\d{4}-\d{2}-\d{2}-/, '');
    if (data.slug !== slug) {
        hexo.log.debug(`post_permalink is replacing slug "${data.slug}" with "${slug}"`)
        data.slug = slug
    }
    return data
}, DEFAULT_PRIORITY - 1)
