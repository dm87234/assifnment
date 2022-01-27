// 嚴格模式
"use strict";

// 獲取元素
var task_name = document.querySelector('.task_name');
var task_add_block = document.querySelector('.task_add_block');
var task_add = document.querySelector('.task_add');
var task_list = document.querySelector('.task_list');
// var li = document.querySelector('li');
var para = document.querySelector('.para');

//封裝函數
function add() {
    if (task_name.value.trim() == '') {
        alert('您没有输入内容');
        return false;
    } else {

        // (1) 创建元素
        let list_html = `
	<div class="item_flex">
	  <div class="left_block">
		<div class="btn_flex">
		  <button type="button" class="btn_up">往上</button>
		  <button type="button" class="btn_down">往下</button>
		</div>
	  </div>
	  <div class="middle_block">
		<div class="star_block">
		  <span class="star" data-star="1"><i class="fas fa-star"></i></span>
		  <span class="star" data-star="2"><i class="fas fa-star"></i></span>
		  <span class="star" data-star="3"><i class="fas fa-star"></i></span>
		  <span class="star" data-star="4"><i class="fas fa-star"></i></span>
		  <span class="star" data-star="5"><i class="fas fa-star"></i></span>
		</div>
		<p class="para">這是任務這是任務這是任務這是任務這是任務這是任務這是任務這是任務這是任務這是任務這是任務這是任務</p>
	  </div>
	  <div class="right_block">
		<div class="btn_flex">
		  <button type="button" class="btn_update">更新</button>
		  <button type="button" class="btn_delete">移除</button>
		</div>
	  </div>
	</div>
  `
        let liNew = document.createElement('li');
        liNew.innerHTML = list_html;
        let para = liNew.querySelector('.para');
        para.innerHTML = task_name.value.trim();
        // (2) 添加元素

        task_list.insertBefore(liNew, task_list.children[0]);

        // (3)儲存到 localStorage
        let item_id = Date.now(); // timestamp 當做該項的 id
        let taskText = task_name.value;
        let task = {
            "item_id": item_id,
            "name": taskText, // 新增的待辦事項文字
            "star": 0 // 預設 0
        };
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.unshift(task);

        updateList(tasks);

        localStorage.setItem("tasks", JSON.stringify(tasks));

        task_name.value = '';
    }
}

function updateList(items) {
    let str = '';
    for (let i = 0; i < items.length; i++) {
        str += `
<li>		
	<div class="item_flex">
	  <div class="left_block">
		<div class="btn_flex">
		  <button type="button" class="btn_up">往上</button>
		  <button type="button" class="btn_down">往下</button>
		</div>
	  </div>
	  <div class="middle_block">
		<div class="star_block">
		  <span class="star" data-star="1"><i class="fas fa-star"></i></span>
		  <span class="star" data-star="2"><i class="fas fa-star"></i></span>
		  <span class="star" data-star="3"><i class="fas fa-star"></i></span>
		  <span class="star" data-star="4"><i class="fas fa-star"></i></span>
		  <span class="star" data-star="5"><i class="fas fa-star"></i></span>
		</div>
		<p class="para">${items[i].name}</p>
	  </div>
	  <div class="right_block">
		<div class="btn_flex">
		  <button type="button" class="btn_update">更新</button>
		  <button type="button" class="btn_delete">移除</button>
		</div>
	  </div>
	</div>
</li>	
  `

    }
    task_list.innerHTML = str;
}

// ---介面1---
task_name.addEventListener('focus', function() {
    task_add_block.className = 'task_add_block -on';
});

task_name.addEventListener('blur', function() {
    task_add_block.className = 'task_add_block';
});

// ---介面2---

task_add.addEventListener('click', function() {

    add();

});

task_name.addEventListener('keydown', function(e) {
    if (e.keyCode == 13) {
        add();

    }

});

document.addEventListener("DOMContentLoaded", function() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    updateList(tasks); // DOMContentLoaded 事件發生時，執行這裡的程式

});