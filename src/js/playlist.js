(function($, root){
    var $scope = $(document.body);
    var controlManager;
    var $playList = $('<div class="play-list">' +
                        '<div class="line-head">播放列表</div>' + 
                        '<ul class="play-list-wrapper"></ul>'+
                        '<div class="close-btn">关闭</div>' +
                        '</div>');
    function render (data) {
        var html = '';
        for(var i = 0; i < data.length; i++){
            html += '<li><h3>' + data[i].song + '<span> - ' + data[i].singer +'</span></h3></li>'
        }
        $playList.find('ul').html(html);
        $scope.append($playList);
        bindEvent();
    }
    
    //绑定事件
    function bindEvent () {
        $scope.on('click','.close-btn', function () {
            $scope.find('.play-list').removeClass('show');
        });
        $scope.on('click', 'li', function () {
             var index = $(this).index();
             controlManager.index = index;
             singSong(index);
             $scope.trigger('player:change', [index, true]); //第二个参数为数组
             $scope.find('.play-btn').addClass('playing');
             setTimeout(function () {
                 $scope.find('.play-list').removeClass('show');
             },500)
        })
    }
    //标记当前正在播放歌曲
    function singSong(index) {
        $playList.find('.playing').removeClass('playing');
        $playList.find('li').eq(index).addClass('playing');
    }
    //显示播放列表
    function show(index, control) {
        controlManager  = control;
        singSong(index);
        $playList.addClass('show');
    }
    root.playList = {
        render: render,
        show: show
    }

}(window.Zepto, window.player || (window.player = {})))