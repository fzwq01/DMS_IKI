module.exports = {
    lintOnSave: false,
    devServer: {
        proxy: {
            "/": {
                target: 'http://172.16.0.29:8090/',
            }
            // proxy:'http://172.16.0.58:8090'
        }
    },
    css: {
        loaderOptions: {
            sass: {
                prependData: `
                    @import "~@/style/mixin.scss";
                `,
            },
        },
    },
};


