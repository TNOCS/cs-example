// builtin plugins
const {
    RawPlugin,
    FuseBox,
    HTMLPlugin,
    CSSPlugin,
    Sparky,
    EnvPlugin
} = require("fuse-box");

const BASE_PATH = '../';

/*
 * task bundling
 *
 */
let run = (production) => {
    // path
    let path = 'dist/client'; // todo own dev path, but need to figure out how to deal with index

    // env plugin vars
    let env = {
        FB_AU_LOG: production ? false : true,
        FB_AU_RELOAD: production ? false : true,
        devMode: production ? false : true
    }

    // typechecker (minor bug first time when caching vendor bundle, its on my todo list(vegar)... just need to talk to fusebox team..)
    const TypeCheckPlugin = require('fuse-box-typechecker').TypeCheckPlugin;
    const fuse = FuseBox.init({
        homeDir: BASE_PATH + 'src/client',
        output: BASE_PATH + path + '/$name.js',
        plugins: [
            TypeCheckPlugin({
                quit: production
            }),
            CSSPlugin(),
            EnvPlugin(env),
            HTMLPlugin(),
            RawPlugin(['.css', '.woff'])
        ]
    });


    // vendor bundle, all libs that really dont change
    fuse.bundle("vendor")
        .cache(true)
        .instructions(`
        + aurelia-bootstrapper
        + fuse-box-aurelia-loader
        + aurelia-framework
        + aurelia-pal
        + aurelia-metadata
        + aurelia-loader-default
        + aurelia-polyfills
        + aurelia-fetch-client
        + aurelia-pal-browser
        + aurelia-animator-css
        + aurelia-logging-console
        + aurelia-templating-binding
        + aurelia-templating-resources
        + aurelia-event-aggregator
        + aurelia-history-browser
        + aurelia-templating-router`)
        .alias({
            'jQuery': 'jquery'
        })
        .shim({
            jquery: {
                source: BASE_PATH + 'node_modules/jquery/dist/jquery.js',
                exports: '$'
            }
        });


    // app bundle
    if (!production) {

        // if not production we want the hmr and watch activated
        fuse.bundle('app')
            .watch().cache(false).hmr()
            .instructions(`
            > [main.ts]
            + [**/*.{ts,html,css}]
        `);

        // we also want http dev server
        fuse.dev({
            port: 3456,
            root: BASE_PATH
        });

    } else {

        // production run, no watch or dev server
        fuse.bundle('app')
            .instructions(`
            > [main.ts]
            + [**/*.{ts,html,css}]
        `);

    }
    fuse.run();

};


Sparky.task("dev", [], () => {
    run(false)
});

Sparky.task("prod", ["copy-fonts", "copy-css"], () => {
    run(true)
});