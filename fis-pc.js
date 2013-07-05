
var fis = module.exports = require('fis');

fis.cli.name = "fis-pc";

fis.config.merge({
    modules : {
        parser : {
            less : 'less',
            tmpl: 'bdtmpl'
        },
        preprocessor: {
            tpl: 'extlang'
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
                reg : /^\/test\/(.+)/i,
                release : '/test/${namespace}/$1'
            },
            {
                reg : /\.tmpl$/i,
                release : false
            },
            {
                reg : /^\/widget\/(.*\.tpl)$/i,
                isMod : true,
                url : '${namespace}/widget/$1',
                release : '/template/${namespace}/widget/$1'
            },
            {
                reg : /^\/widget\/(.*\.(js|css))$/i,
                isMod : true,
                release : '/static/${namespace}/widget/$1'
            },
            {
                reg : /^\/widget\/(.*)$/i,
                isMod : true,
                release : '/static/${namespace}/widget/$1'
            },
            {
                reg : /^\/plugin\//i
            },
            {
                reg : /^\/page\/(.+\.tpl)$/i,
                isMod: true,
                release : '/template/${namespace}/page/$1',
                extras: {
                    isPage: true
                }
            },
            {
                reg : /^\/page\/(.*)$/i,
                isMod: true,
                release : '/template/${namespace}/page/$1'
            },
            {
                reg : '${namespace}-map.json',
                release : '/config/${namespace}-map.json'
            },
            {
                reg: /^\/static\/(.*)/i,
                release: '/static/${namespace}/$1'
            },
            {
                reg: /\.(php)$/i
            },
            {
                reg: /^\/config\/(.*)/i,
                release: '/config/${namespace}/$1'
            },
            {
                reg: "server.conf",
                release: '/$&'
            },
			{
                reg: "domain.conf",
                release: '/config/$&'
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
        }
    }
});
