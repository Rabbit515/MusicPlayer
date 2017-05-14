//封装进度条
(function($, root){
    var $scope = $(document.body);
    var startTime;
    var curDuration;
    var frameId;
    var lastPercentage = 0;
    //处理时间函数
    function formatTime (duration) {
        duration = Math.round(duration);
        var minute = Math.floor(duration/60);
        var second = duration - minute*60;
        if(minute < 10){
            minute = '0' + minute;
        } 
        if(second < 10){
            second = '0' + second;
        }
        return minute + ':' + second;
    };
    //渲染歌曲总时间
    function render(duration) {
        curDuration = duration;
        lastPercentage = 0;
        updata(0);
        var allTime = formatTime(duration);
        $scope.find('.all-time').text(allTime);
    };
    //渲染当前时间
    function updata(percentage) {
        var curTime = percentage * curDuration;
        curTime = formatTime(curTime);
        $scope.find('.cur-time').text(curTime);
        setProcessor(percentage);
    }; 
    //渲染当前时间和进度条 
    function start(percent) {
        lastPercentage = percent !== undefined ? percent : lastPercentage;
        cancelAnimationFrame(frameId);
        startTime = new Date().getTime();
        function frame() {
            var curTime = new Date().getTime();
            var percentage = lastPercentage + (curTime - startTime)/(curDuration * 1000);  //getTime获取的是毫秒
            if(percentage < 1){
                updata(percentage);
                frameId = requestAnimationFrame(frame);
            }else{
                cancelAnimationFrame(frameId);
            }
        }
        frame();
    };
    //进度条变化
    function setProcessor(percentage){
        var percent = (percentage - 1)*100 + '%';
        $scope.find('.pro-top').css({
            transform:'translateX(' + percent + ')'
        })
    };
    //停止进度条
    function stop() {
        var time = new Date().getTime();
        lastPercentage = lastPercentage + (time - startTime) / (curDuration * 1000);
        // console.log(lastPercentage);
        cancelAnimationFrame(frameId);
    };
    root.processor = {
        render: render,
        start: start,
        stop: stop,
        updata: updata
    }
}(window.Zepto, window.player || (window.player={})));