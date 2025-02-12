const path = require('path');

const rootPath = path.resolve(path.join(__dirname));
const zddiRoot = path.resolve(path.join(rootPath, 'assets', 'javascripts'));

const isProd = process.env.NODE_ENV === 'production';

export default {
    compact: false,
    parserOpts: {
        strictMode: false,
    },
    plugins: [
        [
            'module-resolver',
            {
                root: [
                    rootPath,
                    path.join(rootPath, '/assets/javascripts'),
                ],
                alias: {
                    i18n: path.join(zddiRoot, 'i18n', 'i18n-data'),
                    // module file
                    address: path.join(zddiRoot, 'zddi/address'),
                    cloud: path.join(zddiRoot, 'zddi/cloud'),
                    am: path.join(zddiRoot, 'zddi/am'),
                    dns: path.join(zddiRoot, 'zddi/dns'),
                    secure: path.join(zddiRoot, 'zddi/secure'),
                    system: path.join(zddiRoot, 'zddi/system'),
                    // common file
                    common: path.join(zddiRoot, 'zddi/common'),
                    plugins: path.join(zddiRoot, 'zddi/common/plugins'),
                    eve: path.join(zddiRoot, 'zddi/common/plugins/eve-raphael'),
                    raphael: path.join(zddiRoot, 'zddi/common/plugins/raphael/raphael.amd'),
                    models: path.join(zddiRoot, 'zddi/common/models'),
                    views: path.join(zddiRoot, 'zddi/common/views'),
                    utils: path.join(zddiRoot, 'zddi/common/utils'),
                    cell: path.join(zddiRoot, 'zddi/common/components/table/index'),
                    // third-package
                    audios: path.join(rootPath, '/assets/audios'),
                },
            },
        ],
        'lodash',
        '@babel/plugin-proposal-partial-application',
        '@babel/plugin-transform-proto-to-assign',
        ['@babel/plugin-proposal-decorators', { legacy: true }],
        ['@babel/plugin-proposal-class-properties', { loose: true }],
        [
            '@babel/plugin-transform-classes',
            {
                loose: true,
            },
        ],
        [
            '@babel/plugin-transform-modules-commonjs',
            {
                loose: true,
                strictMode: false,
            },
        ],
        '@babel/plugin-transform-react-constant-elements',
        '@babel/plugin-transform-react-inline-elements',
        '@babel/plugin-transform-react-display-name',
        'transform-react-remove-prop-types',
        'transform-react-pure-class-to-function',
        '@babel/plugin-syntax-import-meta',
        '@babel/plugin-proposal-json-strings',
        '@babel/plugin-proposal-function-sent',
        '@babel/plugin-proposal-export-namespace-from',
        '@babel/plugin-proposal-throw-expressions',
        '@babel/plugin-proposal-export-default-from',
        [
            '@babel/plugin-proposal-pipeline-operator',
            {
                proposal: 'minimal',
            },
        ],
        '@babel/plugin-proposal-do-expressions',
        '@babel/plugin-proposal-function-bind',
        [
            '@babel/plugin-proposal-private-methods',
            {
                loose: true,
            },
        ],
        isProd ? null : 'react-refresh/babel',
    ].filter((it) => !!it),
    presets: [
        [
            '@babel/preset-env',
            {
                loose: true,
                useBuiltIns: 'entry',
                corejs: { version: 3, proposals: true },
            },
        ],
        '@babel/preset-react',
    ],
};
