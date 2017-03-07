var todoapp = window.angular.module("todoapp", [])
var key = "todoLists"

//把nodelist数组转换成储存进localStorage的字符串
function listToStr(list){
    var strList = []
    for(item in list){
        strList.push("{\"text\": \""+list[item].text + "\", \"done\": \""+list[item].done +"\"}")
    }
    return (strList.join("&&&"))
}

todoapp.controller('todolistcontroller', ['$scope', function($scope){
    $scope.text = '';
    var todoLists = localStorage.getItem(key)
    if(!todoLists){
        $scope.todolist = []
    }
    else {
        var list = todoLists.split('&&&')
        $scope.todolist = []
        for(item in list){
            aaa = list[item]
            var jsonItem = JSON.parse(list[item])
            // console.log(list[item])
            $scope.todolist.push({
                text: jsonItem.text,
                done: jsonItem.done
            })
        }
    }

    $scope.add = function(){
        var text = $scope.text.trim();
        if(text){
            $scope.todolist.push({
                text: text,
                done: false
            });
            $scope.text = '';
            localStorage.setItem(key,listToStr($scope.todolist))
        }
    }
    $scope.delete = function(todo){
        var index = $scope.todolist.indexOf(todo);
        $scope.todolist.splice(index, 1);
        localStorage.setItem(key,listToStr($scope.todolist))
    }
    $scope.doneCount = function(){
        var temp = $scope.todolist.filter(function(item){
            return (item.done == true)
        });
        return temp.length
    }
    //当任务完成时也要更新localStorage
    $scope.update = function(item){
        localStorage.setItem(key,listToStr($scope.todolist))
    }
}]);