var gulp = require('gulp');
//启动服务器插件
var connect = require('gulp-connect');
//引入less插件
var less = require('gulp-less');

//转移html文件
gulp.task('html', function () {
    gulp.src('./src/index.html') //变成文件流
        .pipe(connect.reload())  //服务器对文件流进行监听
        .pipe(gulp.dest('./dist')); //转移到dest文件下
});
//转移css文件并预编译less
gulp.task('css', function () {
    gulp.src('./src/css/*.less') //变成文件流
        .pipe(less()) //变成css形式
        .pipe(connect.reload()) //服务器监听
        .pipe(gulp.dest('./dist/css'));
});
//监听文件变化
gulp.task('watch', function () {
    gulp.watch('./src/index.html', ['html']);
    gulp.watch('./src/css/*.less', ['css']);
    gulp.watch('./src/js/*.js', ['js']);
});
//启动服务器
gulp.task('server', function () {
    connect.server({
        port: 8000,//端口号
        livereload: true //自动刷新网页
    });
});
//转移js
gulp.task('js', function() {
    gulp.src('./src/js/*.js')
        .pipe(connect.reload())
        .pipe(gulp.dest('./dist/js'));
});
gulp.task('default', ['html', 'watch', 'server', 'css', 'js']);