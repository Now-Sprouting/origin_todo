// 页面加载函数
$(function() {
    $(".enter").on("focus", function() {
        $(this).prop("placeholder", "")
    })
    $(".enter").on("blur", function() {
        $(this).prop("placeholder", "君子博学而日参省乎己  则知明而行无过矣")
    })
    load();
    $(".enter").on("keydown", function(e) {
        var evt = e || event;
        if (evt.keyCode === 13) {
            if ($(this).val().trim() === "") {
                alert("不能无所事事哦");
            } else {
                // 1.按下回车键,把完整数据 储存到本地储存里面
                // 储存的格式是: var toDoSomething = [{title: "xxx",done: falss}]
                // 先读取本地数据
                var local = getDate();
                // 把local数组的数据进行更新(把输入的追加给local)
                local.push({ title: $(this).val(), done: false });
                // 把最新的local保存给本地存储
                saveDate(local);
                // 2.把本地存储的数据渲染到页面当中          
                load();
                $(this).val("");
            }
        }
    });
    $("button").on("click", function() {
        if ($(".enter").val() === "") {
            alert("不能无所事事哦");
        } else {
            var local = getDate();
            // 把local数组的数据进行更新(把输入的追加给local)
            local.push({ title: $(".enter").val(), done: false });
            // 把最新的local保存给本地存储
            saveDate(local);
            // 2.把本地存储的数据渲染到页面当中          
            load();
            $(".enter").val("");
        }
    });
    // 3.点击a触发的删除操作
    $("ol,ul").on("click", "a", function() {
        // 先获取本地数据
        var data = getDate();
        // 修改数据
        var index = $(this).attr("id"); /* id是渲染函数时添加的自定义属性 */
        data.splice(index, 1);
        // 保存本地存储
        saveDate(data);
        // 重新渲染函数
        load();

    });
    // 4.点击checkbox触发的事件
    $("ol,ul").on("click", "#checkbox", function() {
        // 获取本地数据
        var data = getDate();
        // 修改本地数据的done值
        var index = $(this).siblings("a").attr("id");
        data[index].done = $(this).prop("checked");
        // 保存到本地存储
        saveDate(data);
        // 重新渲染函数(在这里渲染的函数和之前不同就要有判断条件了)
        load();

    });
    // 5.双击p标签更改内容
    $("ol").on("click", "p", function() {
        // 取出本地存储数据
        var data = getDate();
        // 把原来p标签内容获取到添加给input
        var index = $(this).siblings("a").attr("id");
        // 添加input
        $(this).html("<input type='text' id ='ledit' value = " + data[index].title + ">");
        $(this).children("#ledit").select();
        // 当按下回车键或者失去焦点时把input内容赋值给title
        $(this).children("#ledit").on("keydown", function(e) {
            if (e.keyCode === 13) {
                if ($(this).val().trim() === '') {
                    alert("不能无所事事")
                    load();
                } else {
                    data[index].title = $(this).val();
                    // 保存本地存储
                    saveDate(data);
                    // 加载渲染页面函数
                    load();
                }
            }
        });
        $(this).children("#ledit").on("blur", function(e) {
            data[index].title = $(this).val();
            saveDate(data);
            load();
        });
    });
    $("ul").on("click", "p", function() {
        // 取出本地存储数据
        var data = getDate();
        // 把原来p标签内容获取到添加给input
        var index = $(this).siblings("a").attr("id");
        // 添加input
        $(this).html("<input type='text' id ='redit' value = " + data[index].title + ">");
        $(this).children("#redit").select();
        // 当按下回车键或者失去焦点时把input内容赋值给title
        $(this).children("#redit").on("keydown", function(e) {
            if (e.keyCode === 13) {
                data[index].title = $(this).val();
                // 保存本地存储
                saveDate(data);
                // 加载渲染页面函数
                load();
            }
        });
        $(this).children("#redit").on("blur", function(e) {
            data[index].title = $(this).val();
            saveDate(data);
            load();
        });
    });
    // 读取本地数据函数
    function getDate() {
        var data = localStorage.getItem("toDoSomething");
        if (data !== null) {
            // 本地存储的是字符串格式,我们需要对象格式
            return JSON.parse(data);
        } else {
            return [];
        }
    };
    // 保存本地存储
    function saveDate(data) {
        /* 把数组对象形式的数据转换成字符串形式 */
        localStorage.setItem("toDoSomething", JSON.stringify(data))
    };
    // 渲染页面函数
    function load() {
        var data = getDate();
        //遍历这个数组,把数组里面的内容追加到新创建的小li中
        // 渲染之前,先清空ol中的所有内容,防止出现重复内容
        $("ol,ul").empty();
        var todoCount = 0;
        var doneCount = 0;
        $.each(data, function(index, element) {
            /*  $("ol").prepend("<li><input type='checkbox' name='' id=''> <p>" + element.title + "</p> <a href='' id = " + index + "></a></li>"); */
            if (data[index].done) {
                $("ul").prepend("<li><input type='checkbox' name='' id='checkbox' checked> <p>" + element.title + "</p> <a href='javascript:;' id = " + index + "><span>   </span></a></li>");
                doneCount++;
            } else {
                $("ol").prepend("<li><input type='checkbox' name='' id='checkbox'> <p>" + element.title + "</p> <a href='javascript:;' id = " + index + "><span>   </span></a></li>");
                todoCount++;
            }
        });
        $("#todocount").text(todoCount);
        $("#donecount").text(doneCount);

    }


})