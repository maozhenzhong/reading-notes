# Vue开发命名规范

## `views`命名

****

`views`文件夹下面是由以页面为单位的vue文件或者模版文件夹组成的，在`src`目录下，与`components`、`assets`同级。

### `views`下的文件夹命名

1. `views`下面的文件夹代表着模块的名字
2. 由名词组成(car、order、cart)
3. 单词只能有一个(good:car、order、cart)(bad: carInfo、carpage)
4. 尽量是名词(good: car)(bad: greet good)
5. 以小写开头(good: car)(bad: Car)

### `views` 下的`vue`文件命名

1. `views`下面的`vue`文件代表着页面的名字
2. 放在模块文件夹之下
3. 只有一个文件的情况下不会出现文件夹，而是直接放在`views`目录下面，如`SignIn` `Home`
4. 尽量是名词
5. 大写开头，开头的单词就是所属模块名字(CarDetail、CarEdit、CarList)
6. 名字至少两个单词是(good:CarDetails)(bad: Car)
7. 常用结尾单词有(Detail、Edit、List、Info、Report)
8. 以Item结尾的代表着组件(CarListItem、CarInfoItem)

## vue方法命名vue 方法命名

****

### vue方法命名

01. components
02. props
03. data
04. created
05. mounted
06. activited
07. update
08. beforeRouteUpdate
09. methods
10. filter
11. computed
12. watch

---

```vue
<template lang="html">
	<div class="container"></div>
</template>

<script>
export default {
	name: '',
	mixins: [], // 使用组件 mixins 共享通用功能
	components: {}, // 使用其它组件
	extends: {}, // 组成新的组件
	props: {
		bar: {}, // 按字母顺序
		foo: {}
	},
	data() {
		return {
		
		}
	},
	created() {
	
	},
	mounted() {
	
	},
	computed: {},
	watch: {},
	methods: {},
	beforeCreate() {},
	mounted() {}
}
</script>

<style scoped>

</style>
```

### method 自定义方法命名

1. 动宾短语（good：jumpPage、openCarInfoDialog）（bad：go、nextPage、show、open、login）

2. ajax 方法以 fetch、post 开头，以 data 结尾（good：fetchListData、postFormData）（bad：takeData、confirmData、getList、postForm）

3. 事件方法以 on 开头（onTypeChange、onUsernameInput）

4. init、refresh 单词除外

5. 尽量使用常用单词开头（set、get、open、close、jump）

6. 驼峰命名（good: getListData）（bad: get_list_data、getlistData）

### data props 方法注意点

1. 使用 data 里的变量时请先在 data 里面初始化

2. props 指定类型，也就是 type

3. props 改变父组件数据 基础类型用 $emit ，复杂类型直接改

4. ajax 请求数据用上 isLoading、isError 变量

5. 不命名多余数据，现在是详情页、你的数据是 ajax 请求的，那就直接声明一个对象叫 d，而不是每个字段都声明

6. 表单数据请包裹一层 form

### 生命周期方法注意点
1. 不在 mounted、created 之类的方法写逻辑，取 ajax 数据，

2. 在 created 里面监听 Bus 事件