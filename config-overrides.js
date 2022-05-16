module.exports = function override(config, env) {
    if (env === "production") {
        config.output.publicPath = "/pdf-viewer/build/";
    }
    // console.log(config.module.rules[1].oneOf[7]);
    return config;
};
