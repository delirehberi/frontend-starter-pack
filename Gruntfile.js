/*global module:false*/

module.exports = function (grunt) {
    'use strict';
    // Project configuration.
    grunt.initConfig({
        // Metadata.
        meta: {
            version: '0.0.1'
        },
        banner: '/*! HEDEF.IM - v<%= meta.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '* http://hedef.im/\n' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %> ' +
            'Aybars Cengaver; Licensed MIT */\n',
          // Task configuration.
        jsConcat: {

        },
        react: {
            files: {
                expand: true,
                cwd: 'src/javascript/',
                src: ['**/*.jsx'],
                dest: 'src/javascript/jsxtojs/',
                ext: '.js'
            }
        },
        concat: {
            options: {
                banner: '<%= banner %>',
                stripBanners: true
            },
            dist: {
                src: [
                    'packages/sizzle/dist/sizzle.min.js',
                    'packages/react/react.min.js',
                    'src/javascript/jsxtojs/**/*.js'
                ],
                dest: 'build/ready.js'
            }
        },
        less: {
            development: {
                options: {
                    paths: ["src/stylesheet"]
                },
                files: {
                    "build/main.css": "src/stylesheet/source.less"
                }
            },
            production: {
                options: {
                    paths: ["src/stylesheets"]
                },
                files: {
                    "build/main.css": "src/stylesheet/source.less"
                }
            }
        },
        uglify: {
            options: {
                banner: '<%= banner %>'
            },
            dist: {
                src: '<%= concat.dist.dest %>',
                dest: 'build/ready.min.js'
            }
        },
        cssmin: {
            options: {

            },
            target: {
                files: {
                    "build/main.min.css": ["build/main.css"]
                }
            }
        },
        watch: {
            scripts: {
                files: ['src/**'],
                tasks: ['less', 'cssmin', 'react', 'concat', 'uglify']
            },
            options: {
                spawn: false,
                interrupt: true,
                dateFormat: function (time) {
                    grunt.log.writeln('The watch finished in ' + time + 'ms at' + (new Date()).toString());
                    grunt.log.writeln('Waiting for more changes...');
                }
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-react');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task.
    grunt.registerTask('default', ['less', 'cssmin', 'react', 'concat', 'uglify']);

};
