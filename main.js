/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-9-2
 * Time: 上午11:01
 * To change this template use File | Settings | File Templates.
 */

var tankMap = document.getElementById('tankMap');
var cxt = tankMap.getContext('2d');
var walls = [];
var enemys = [];
var bullets = [];
var hero = new Hero(230,250,'up',['#0171b8','#0ea1ff']);
//初始化战场
startMap();

//接收输入命令
function getCommend(e){
    e = event || window.event;
    if(e.keyCode==87){
        hero.moveUp();
    }else if(e.keyCode==68){
        hero.moveRight();
    }else if(e.keyCode==83){
        hero.moveDown();
    }else if(e.keyCode==65){
        hero.moveLeft();
    }else if(e.keyCode==74){
        hero.fire();
    }
}