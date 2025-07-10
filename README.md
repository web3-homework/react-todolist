任务目标
创建一个简单的 React TodoList 应用，让用户能够添加、删除待办事项，以此来熟悉 React 的基础概念，如组件、状态管理、事件处理等。
参考页面： http://todo.mewkes.cn/index.html
详细任务步骤
项目初始化
运用 create-react-app 命令创建一个新的 React 项目。
npx create-react-app react-todolist
cd react-todolist


构建 TodoList 组件
在 src 目录下创建一个名为 TodoList.jsx 的文件。
在 TodoList.jsx 里定义一个函数式组件，名字叫 TodoList。
利用 useState Hook 对两个状态进行管理：
todos：用于存储待办事项的数组。
inputValue：用于存储输入框中的内容。

编写输入框和添加按钮功能
在 TodoList 组件的返回值里添加一个输入框和一个添加按钮。
为输入框绑定 onChange 事件，当输入框内容改变时，更新 inputValue 状态。
为添加按钮绑定 onClick 事件，点击按钮时，若输入框内容不为空，就把内容添加到 todos 数组中，同时清空输入框。

实现待办事项列表的渲染
遍历 todos 数组，把每个待办事项渲染成列表项。
为每个列表项添加一个删除按钮，点击删除按钮时，从 todos 数组中移除对应的待办事项。

把 TodoList 组件集成到应用中
打开 src/App.js 文件，引入 TodoList 组件。
在 App 组件的返回值里使用 TodoList 组件。

样式优化
运用 CSS 或者 CSS-in-JS 方案（如 styled-components）为应用添加基本样式，提升用户体验。

任务要求
代码需符合 React 的规范和最佳实践。
运用 useState Hook 进行状态管理。
为每个功能添加合适的事件处理函数。
确保输入框和按钮功能正常，能够正确添加和删除待办事项。

拓展任务（可选）
增添标记待办事项为已完成的功能。
实现待办事项的编辑功能。
对应用进行持久化存储，例如使用 localStorage 保存待办事项。