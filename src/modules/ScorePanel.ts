class ScorePanel{
  score:number=0;
  level:number=1;
  maxLevel:number; // 最大级数
  upScore:number; // 每多少分升一级
  scoreEle:HTMLElement;
  levelEle:HTMLElement;
  

  constructor(maxLevel:number = 10,upScore:number=2){
    this.scoreEle=document.getElementById('score')!;
    this.levelEle=document.getElementById('level')!;
    this.maxLevel=maxLevel;
    this.upScore=upScore;
  }

  addScore(){
    this.scoreEle.innerHTML = ++this.score + '';
    // 判断分数是多少 需要不需要升级
    if(this.score % this.upScore === 0){
      this.addLevel();
    }
  }
  addLevel(){
    if(this.level < this.maxLevel){
      this.levelEle.innerHTML = ++this.level + '';
    }
  }
}


export default ScorePanel;