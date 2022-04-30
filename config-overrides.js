module.exports = function override(config, env) {
    if (env === "production") {
        config.output.publicPath = "/pdf-viewer/build/";
    }
    return config;
};
