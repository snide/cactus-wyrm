module.exports = function(grunt) {

  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    open : {
      dev: {
        path: 'http://localhost:1919'
      }
    },

    connect: {
      server: {
        options: {
          port: 1919,
          livereload: true
        }
      }
    },
    copy: {
      fonts: {
        files: [
          // includes files within path
          {expand: true, flatten: true, src: ['bower_components/font-awesome/fonts/*'], dest: 'static/fonts/', filter: 'isFile'}
        ]
      }
    },

    compass: {
      build: {
        options: {
          config: 'compass.rb',
          environment: 'production',
          force: true
        }
      },
      dev: {
        options: {
          config: 'compass.rb',
          force: true
        }
      }
    },

    exec: {
      bower_update: {
        cmd: 'bower update'
      },
      serve: {
        cmd: 'cactus serve'
      },
      deploy: {
        cmd: 'cactus deploy'
      }
    },
    clean: {
      fonts: ["static/fonts"]
    },

    watch: {
      /* Compile sass changes into theme directory */
      sass: {
        files: ['sass/*.sass', 'bower_components/**/*.sass'],
        tasks: ['compass:dev']
      },
      /* live-reload the demo_docs if sphinx re-builds */
      livereload: {
        files: ['templates/**/*','pages/**/*'],
        options: { livereload: true }
      }
    }

  });

  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-open');

  grunt.registerTask('fonts', ['clean:fonts','copy:fonts']);
  grunt.registerTask('default', ['exec:bower_update','compass:dev','exec:serve','connect','open','watch']);
  grunt.registerTask('build', ['exec:bower_update','compass:build','exec:deploy']);
}
