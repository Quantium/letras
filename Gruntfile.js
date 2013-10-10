module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      files: ['Gruntfile.js', 'app.js', 'src/javascripts/**.js','routes/**.js'],
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
    clean: [
      'nobody',
      'noway'
    ],
    watch: {
      dev: {
        files: ['<%= jshint.files %>'],
        tasks: ['less:dev','jshint','uglify','htmlmin:dev']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['jshint', 'uglify', 'cssmin']);

  grunt.registerTask('publish', ['jshint','uglify','cssmin','clean']);

  grunt.event.on('watch', function(action, filepath, target) {
    grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
  });
};
