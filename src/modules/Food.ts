class Food{
  // 定义一个属性表示食物所对应的元素
  element:HTMLElement;
  constructor(){
    this.element = document.getElementById('food')!;
  }

  // 获取食物x轴坐标
  get X(){
    return this.element.offsetLeft;
  }
  // 获取食物y轴坐标
  get Y(){
    return this.element.offsetTop;
  }
  // 修改食物的位置
  changePosition(){
    // 生成随机位置
    // 食物的位置最小是0 最大是290
    // 移动一次是10 
    // Math.round(Math.random()*290) 包括0和290
    let top = Math.round(Math.random()*29) * 10;
    let left = Math.round(Math.random()*29) * 10;

    this.element.style.left=left + 'px';
    this.element.style.top=top + 'px';
  }

}

export default Food;