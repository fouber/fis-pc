
var fis = module.exports = require('fis');

fis.cli.name = "fis-pc";

fis.config.merge({
    modules : {
        parser : {
            less : 'less',
            tmpl: 'bdtmpl'
        },
        preprocessor: {
            tpl: 'extlang',
        },
        postprocessor: {
            tpl: 'require-async',
            js: 'jswrapper, require-async'
        },
        optimizer : {
            tpl : 'smarty-xss,html-compress'
        }
    },
    roadmap : {
        ext : {
            less : 'css'
        },
        path : [
            {
                reg : /^\/test\/page\/(.+)/i,
                release : '/test/page/${namespace}/$1'
            },
            {
                reg : /\.tmpl$/i,
                release : false
            },
            {
                reg : /^\/widget\/(.*\.tpl)$/i,
                isMod : true,
                url : 'widget/$1',
                release : '/template/widget/${namespace}/$1'
            },
            {
                reg : /^\/widget\/(.*\.(js|css))$/i,
                isMod : true,
                release : '/static/widget/${namespace}/$1'
            },
            {
                reg : /^\/plugin\//i
            },
            {
                reg : /^\/page\/(.+\.tpl)$/i,
                isMod: true,
                release : '/template/page/${namespace}/$1',
                extras: {
                    isPage: true
                }
            },
            {
                reg : '${namespace}-map.json',
                release : '/config/${namespace}-map.json'
            },
            {
                reg : /\/static\/(?:[^/])+\/(lib)\/(.*)/i,
                isMod: true,
                release: '/static/${namespace}/$1/$2'
            },
            {
                reg: /^\/static\/(.*)/i,
                release: '/static/${namespace}/$1'
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
                release: '/static/${namespace}$&'
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
