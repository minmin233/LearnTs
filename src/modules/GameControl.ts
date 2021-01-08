import Snake from './Snake';
import Food from './Food';
import ScorePanel from './ScorePanel';

// 游戏控制器，控制其他所有类
class GameControl{
  snake:Snake;
  food:Food;
  scorePanel:ScorePanel;

  // 蛇的移动方向 也就是按键的方向
  direction:string = '';
  // 游戏是否结束
  isLive:boolean = true;

  constructor(){
    this.snake = new Snake();
    this.food = new Food();
    this.scorePanel = new ScorePanel();
    this.init();
  }

  // 游戏初始化
  init(){
    document.addEventListener('keydown',this.keydownHandler.bind(this));
    // 使蛇移动
    this.run(); 
  }
  // 键盘按下的响应函数
  keydownHandler(event:KeyboardEvent){
    // console.log(event.key); 
    this.direction = event.key;  
  }
  
  // 控制蛇移动
  run(){
    // 获取蛇现在的坐标
    let X = this.snake.X;
    let Y = this.snake.Y;
    // 根据方向 this.direction 修改XY值
    switch(this.direction){
      case "ArrowUp":
      case "Up":
        Y -= 10;
        break;
      case "ArrowDown":
      case "Down":
        Y += 10;
        break;
      case "ArrowLeft":
      case "Left":
        X -= 10;
        break;
      case "ArrowRight":
      case "Right":
        X += 10;
        break;
    }

    // 检查蛇是否吃到了食物
    this.checkEat(X,Y);

    try {
      // 修改蛇的位置
      this.snake.X = X;
      this.snake.Y = Y;
    } catch (e) {
      alert(e.message + ' game over!');
      this.isLive = false;
    }
    

    // 开启定时器
    this.isLive && setTimeout(this.run.bind(this),300-(this.scorePanel.level-1)*30);
  }

  // 检查蛇是否吃到食物
  checkEat(X:number,Y:number){
    if(X === this.food.X && Y == this.food.Y){
      this.food.changePosition();
      this.scorePanel.addScore();
      this.snake.addBody();
    }
  }
}

export default GameControl;