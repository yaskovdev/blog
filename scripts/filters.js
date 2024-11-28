hexo.extend.filter.register('post_permalink', src => {
    const dst = src.replace(/\d{4}-\d{2}-\d{2}-/, '');
    hexo.log.info('post_permalink is replacing ' + src + ' with ' + dst)
    return dst
})
