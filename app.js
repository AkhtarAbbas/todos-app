const todos = []
const form = document.querySelector('form')
const ul = document.querySelector('.todo-list')
const toggleAll = document.querySelector('.toggle-all')
const todoCount = document.querySelector('.todo-count strong')
const filters = document.querySelector('.filters')

let i=1;
form.addEventListener('submit', (e)=>{
	e.preventDefault()
	let input = document.querySelector('form input')
	let value = input.value
	if (value) {
		todos.push({
			id: i++,
			tittle: value,
			completed: false
		})
	}
	input.value = ''
	printTodo()
	todoCount.innerHTML = todos.length
})


const printTodo = ()=>{
	ul.innerHTML = ''
	for (let todo of todos) {
		ul.innerHTML += `
			<li class="todo ${todo.completed ? 'completed' : ''}" id="${todo.id}">
				<div class="view">
					<input type="checkbox" class="toggle">
					<span class="tittle">${todo.tittle}</span>
					<span class="destroy"></span>
				</div>
			</li>`
	}
}


ul.addEventListener('click', (e)=>{
	let distClass = e.target.className
	let parent = e.target.parentNode.parentNode
	let id = parent.id
	for(todo in todos){
			if (todos[todo].id == id) {
				if (distClass == 'destroy') {
					todos.splice(todo,1)
					todoCount.innerHTML = todos.length
				}
				if (distClass == 'toggle') {
					if (todos[todo].completed == false) {
						todos[todo].completed = true
					} else{
						todos[todo].completed = false
					}
				}
			}
		}	
	printTodo()
})


// MARK ALL AS COMPLETED
toggleAll.addEventListener('click', (e)=>{
	for(todo in todos){
		if (todos[todo].completed == false) {
			todos[todo].completed = true
		} else {
			todos[todo].completed = false
		}
	}	
	printTodo()
})


// filters


filters.addEventListener('click', (e)=>{
	e.preventDefault()
	rClass(e)
	e.target.classList.add('selected')
	let filterClass = e.target.classList[0]
	if (filterClass == 'all') {
		printTodo()
	} else if (filterClass == 'active') {
		filterTodo(false)	
	} else if (filterClass == 'complete') {
		filterTodo(true)
	}
})

const filterTodo = (bol)=>{
	const result = todos.filter(todo => todo.completed == bol)
	ul.innerHTML = ''
	for (let todo of result) {
		ul.innerHTML += `
		<li class="todo ${todo.completed ? 'completed' : ''}" id="${todo.id}">
			<div class="view">
				<input type="checkbox" class="toggle">
				<span class="tittle">${todo.tittle}</span>
				<span class="destroy"></span>
			</div>
		</li>`
	}
}

// remove class form li
const rClass = ()=>{
	let li = document.querySelectorAll('.filters li')
	for(let m = 0; m <= li.length-1; m++){
		let el = li[m].childNodes[1]
		el.classList.remove('selected')
	}
}
