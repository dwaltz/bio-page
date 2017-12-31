/*global module:false*/

module.exports = function(grunt) {
	'use strict';

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON( 'package.json' ),
		jshint: {
			options: {
				boss: true,
				browser: true,
				curly: false,
				eqeqeq: true,
				eqnull: true,
				globals: {
					$: true,
					jQuery: true,
					require: true
				},
				immed: true,
				latedef: true,
				newcap: true,
				noarg: true,
				sub: true,
				undef: true,
				unused: false,
				laxcomma: true
			},
			gruntfile: {
				src: 'Gruntfile.js'
			},
			files: [
				'./js/*.js'
			]
		},

		clean: {
			dist: ['dist']
		},

		connect: {
			server: {
				options: {
					hostname: '*',
					port: 8000
				}
			}
		},

		uglify: {
			options: {
				report: 'min'
			},
			package: {
				src: 'dist/js/bio.js',
				dest: 'dist/js/bio.min.js'
			}
		},

		copy: {
			js: {
				cwd: 'js/',
				dest: 'dist/js/',
				expand: true,
				filter: 'isFile',
				src: ['*']
			},
			ftp: {
				cwd: 'ftp/',
				dest: 'dist/ftp/',
				expand: true,
				filter: 'isFile',
				src: ['*']
			},
			img: {
				cwd: 'img/',
				dest: 'dist/img/',
				expand: true,
				filter: 'isFile',
				src: ['*']
			},
			fontsBootstrap: {
				cwd: './bower_components/bootstrap/fonts/',
				dest: 'dist/fonts',
				expand: true,
				filter: 'isFile',
				src: ['*']
			},
			fontsAwesome: {
				cwd: './bower_components/font-awesome/fonts/',
				dest: 'dist/fonts',
				expand: true,
				filter: 'isFile',
				src: ['*']
			}
		},

		imagemin: {
			compress: {
				options: {
					optimizationLevel: 3
				},
				files: [{
					expand: true,
					cwd: 'img',
					src: '{,*/}*.{png,jpg,jpeg}',
					dest: 'dist/img'
				}]
			}
		},

		less: {
			dist: {
				options: {
					strictMath: true,
					sourceMap: true,
					outputSourceFiles: true,
					sourceMapURL: '<%= pkg.name %>.css.map',
					sourceMapFilename: 'dist/css/<%= pkg.name %>.css.map'
				},
				files: {
					'dist/css/bio.css': 'less/bio.less'
				}
			},
			minify: {
				options: {
					cleancss: true,
					report: 'min'
				},
				files: {
					'dist/css/bio.min.css': 'dist/css/bio.css'
				}
			},
			minUnCss: {
				options: {
					cleancss: true,
					report: 'min'
				},
				files: {
					'dist/css/bio-compressed.min.css': 'dist/css/bio-compressed.css'
				}
			}
		},

		validation: {
			// if many errors are found, this may log to console while other tasks are running
			options: {
				reset: false,
				stoponerror: true,
				relaxerror: [	//ignores these errors
					'Bad value X-UA-Compatible for attribute http-equiv on element meta.',
					'Element head is missing a required instance of child element title.'
				],
				doctype: 'HTML5',
				reportpath: false
			},
			files: {
				src: ['index.html']
			}
		},

		watch: {
			full: {
				files: ['Gruntfile.js', 'fonts/**', 'js/**', 'less/**', 'lib/**', 'test/**', 'index.html', 'dev.html'],
				options: { livereload: true },
				tasks: ['dev-build']
			}
		},

		bump: {
			options: {
				files: [ 'package.json' ]
				, updateConfigs: [ 'pkg' ]
				, commit: true
				, commitMessage: 'Release %VERSION%'
				, commitFiles: [ 'package.json' ]
				, createTag: true
				, tagName: '%VERSION%'
				, tagMessage: '%VERSION%'
				, push: true
				, pushTo: 'origin'
				, gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d'
			}
		},

		uncss: {
			dist: {
				files: {
					'./dist/css/bio-compressed.css': ['./index.html']
				}
			}
		}
	});

	// These plugins provide necessary tasks.
	require('load-grunt-tasks')(grunt, {scope: 'devDependencies'});

	grunt.registerTask('default', ['jshint', 'dist']);

	grunt.registerTask('dist', ['clean:dist', 'less:dist', 'less:minify', 'copy:js', 'copy:ftp', 'copy:fontsBootstrap', 'copy:fontsAwesome', 'uncss:dist', 'less:minUnCss', 'imagemin:compress', 'uglify']);

	grunt.registerTask('dev-build', ['clean:dist', 'less', 'copy', 'uglify']);

	grunt.registerTask('serve', ['connect:server', 'watch:full']);
};
