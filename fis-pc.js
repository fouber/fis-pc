
var fis = module.exports = require('fis');

fis.cli.name = "fis-pc";

fis.config.merge({
    modules : {
        parser : {
            less : 'less',
            tmpl: 'bdtmpl'
        },
        preprocessor: {
            tpl: 'extlang, require-async',
            js: 'require-async'
        },
        optimizer : {
            tpl : 'smarty-xss'
        }
    },
    roadmap : {
        ext : {
            less : 'css'
        },
        path : [
            {
                reg : /^\/test\//i
            },
            {
                reg : /\.tmpl$/i,
                release : false
            },
            {
                reg : /^\/widget\/(.*\.tpl)$/i,
                isMod : true,
                url : 'widget/$1',
                release : '/template/widget/$1'
            },
            {
                reg : /^\/widget\/(.*\.(js|css))$/i,
                isMod : true,
                release : '/static/widget/$1'
            },
            {
                reg : /^\/plugin\//i
            },
            {
                reg : /^\/page\/.+\.tpl$/i,
                isMod: true,
                release : '/template$&',
                extras: {
                    isPage: true
                }
            },
            {
                reg : /^\/.+\.tpl$/i,
                isMod: true,
                release : '/template$&'
            },
            {
                reg : '${namespace}-map.json',
                release : '/config/${namespace}-map.json'
            },
            {
                reg : /\/static\/(?:[^/])+\/(ui|lib)\/(.*)/i,
                isMod: true,
                release: '/static/${namespace}/$1/$2'
            },
            {
                reg: /^\/static\/(.*)/i,
                release: '/static/$1'
            },
            {
                reg: /^\/config\/.*/i,
                release: '$&'
            },
            {
                reg: "server.conf",
                release: '/$&'
            },
            {
                reg: /\/.+/i,
                release: '/static$&'
            }
        ]
    },
    settings : {
        parser : {
            bdtmpl : {
                LEFT_DELIMITER : '<#',
                RIGHT_DELIMITER : '#>'
            }
        },
        postprocessor : {
            jswrapper: {
                type: 'amd'
            }
        },
        optimizer : {
            'smarty-xss' : {
                'escapeMap' : {
                    'js' : 'f_escape_js',
                    'html' : 'f_escape_xml',
                    'data' : 'f_escape_data',
                    'path' : 'f_escape_path',
                    'event' : 'f_escape_event',
                    'no_escape' : 'escape:none'
                },
                'leftDelimiter' : '{%',
                'rightDelimiter' : '%}'
            }
        }
    }
});
