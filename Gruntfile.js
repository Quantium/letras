module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      files: ['Gruntfile.js', 'app.js', 'src/javascripts/**.js','routes/**.js','tests/**.js','tests/**/**.js'],
      options: {
          node: true,
          laxcomma: true
      }
    },
    uglify: {
      options: {
        banner: '/*! LETRAS by @Quantium <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'public/javascripts/index.js': ['src/javascripts/**.js']
        }
      }
    },
    cssmin: {
      options: {
        banner: '/*! LETRAS by @Quantium <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'public/stylesheets/style.css': ['src/stylesheets/**.css']
        }
      }
    },

    nodemon: {
      dev: {
        options: {
          file: 'app.js',
          args: ['development'],
          nodeArgs: ['--debug'],
          ignoredFiles: ['README.md', 'node_modules/**', 'public/**', 'tests/**','Gruntfile.js'],
          watchedExtensions: ['js','ejs'],
          watchedFolders: ['test', 'tasks'],
          delayTime: 1,
          legacyWatch: true,
          env: {
            PORT: '8181'
          },
          cwd: __dirname
        }
      }
    },
    simplemocha: {
      all: {
        src: ['tests/**.js','tests/**/**.js'],
        options: {
          timeout: 3000,
          ignoreLeaks: false,
          reporter: 'nyan'
          //reporter: 'spec'
        }
      }
    },
    copy: {
      main: {
        files: [
            {expand: true, cwd: 'src/', src: ['assets/**','assets/**/**.**'], dest: 'public/'}
        ],
      },
    },
    watch: {
      dev: {
        files: ['<%= jshint.files %>','src/stylesheets/**.css'],
        tasks: ['jshint', 'uglify', 'cssmin', 'simplemocha']
      }
    },
    concurrent: {
      target: {
        tasks: ['nodemon', 'watch'],
        options: {
          logConcurrentOutput: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-contrib-copy');


  grunt.registerTask('default', 'Grunt commands for this project', function(){
    grunt.log.subhead('Instructions');
    grunt.log.writeln('Call dev for regular time-to-time compilation');
    grunt.log.writeln('Call publish to deployt in a production enviroment, this command changes the version');
    grunt.log.writeln('Call test to run the mocha tests');
    grunt.log.ok('End of instructions');
  });
  grunt.registerTask('dev', ['jshint', 'uglify', 'cssmin','copy']);
  grunt.registerTask('test', ['simplemocha']);

  grunt.registerTask('publish', ['jshint','uglify','cssmin','simplemocha','copy']);

  grunt.event.on('watch', function(action, filepath, target) {
    grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
  });
};
