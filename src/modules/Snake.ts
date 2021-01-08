import { EvalSourceMapDevToolPlugin } from "webpack";

class Snake{
  //蛇的容器
  element:HTMLElement;
  // 蛇头
  head:HTMLElement;
  // 蛇的身体(包括蛇头)
  bodies:HTMLCollection;

  constructor(){
    this.element = document.getElementById('snake')!;
    this.head = document.querySelector('#snake > div') as HTMLElement;
    this.bodies = this.element.getElementsByTagName('div')!;
  }

  // 获取蛇的坐标(其实就是蛇头的坐标)
  get X(){
    return this.head.offsetLeft;
  }
  get Y(){
    return this.head.offsetTop;
  }
  // 设置蛇的坐标
  set X(value:number){
    // 如果新值和旧值一样，则直接返回不修改
    if(this.X === value){
      return;
    }
    // 撞墙判断
    if(value < 0 || value > 290){
      throw Error('蛇撞墙咯~');
    }
    // 蛇不能掉头 向左移动的时候不能向右掉头
    // 判断蛇头的坐标是否和第二个身体的坐标一样 但是要检查有没有第二个身体
    if(this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === value){
      // 如果发生了掉头，则让蛇向反方向继续移动
      if(value > this.X) { // 按了向右走，应该让蛇继续向左走
        value = this.X - 10;
      } else{
        value = this.X + 10;
      }
    }

    // 移动身体
    this.moveBody();
    // 移动蛇头
    this.head.style.left = value + 'px';
    // 检查和自己是否相撞
    this.checkHeadBody();
  }
  set Y(value:number){
    if(this.Y === value){
      return;
    }
    // 撞墙判断
    if(value < 0 || value > 290){
      throw new Error('蛇撞墙咯~');
    }
    if(this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value){
      // 如果发生了掉头，则让蛇向反方向继续移动
      if(value > this.Y) { // 按了向右走，应该让蛇继续向左走
        value = this.Y - 10;
      } else{
        value = this.Y + 10;
      }
    }

    this.moveBody();
    this.head.style.top = value + 'px';
    this.checkHeadBody();
  }
  // 蛇增加身体
  addBody(){
    // 向element中添加div
    this.element.insertAdjacentHTML("beforeend","<div></div>");
  }
  // 蛇身体移动
  // 将后边的身体设置为前边身体的位置
  moveBody(){
    for(let i=this.bodies.length-1;i>0;i--){
      // 获取前边身体的位置
      let X = (this.bodies[i-1] as HTMLElement).offsetLeft;
      let Y = (this.bodies[i-1] as HTMLElement).offsetTop;
      // 将值设置到当前身体上
      (this.bodies[i] as HTMLElement).style.left = X + 'px';
      (this.bodies[i] as HTMLElement).style.top = Y + 'px';
    }
  }
  // 检查蛇头是否撞到身体
  checkHeadBody(){
    // 获取所有的身体，是否和蛇头的坐标发生重叠
    for(let i=1;i<this.bodies.length;i++){
      let bd = this.bodies[i] as HTMLElement;
      if(this.X === bd.offsetLeft && this.Y === bd.offsetTop){
        throw new Error("撞到自己咯~");
      }
    }
  }
}

export default Snake;