# Vue props

---

```vue
<template>
	<div class="container"></div>
</template>

<script>
	export default {
		name: 'MyComponents',
		inheritAttrs: false, // 取消默认挂载属性，title,class,style
		props: {
			name: String,
			type: {
				validator: function(value) {
					return ['success', 'warning', 'danger'].includes(value)
				}
			},
			list: {
				type: Array,
				default: () => []
			},
			isVisible: {
				type: Boolean,
				default: false
			}
		}
	}
</script>
```

```vue
<template>
	<div>
		<PersonalInfo
			v-model="phoneInfo"
			:zip-code.sync="zipCode"
		/>
		
		<PersonalInfo 
			:phone-info="phoneInfo"
			@change="val => (phoneInfo = val)"
			:zip-code="zipCode"
			@update:zipCode="val => (zipCode = val)"
		/>
	</div>
</template>

```

### Vue 指令

+ v-text
+ v-htim
+ v-show
+ v-if
+ v-else
+ v-else-if
+ v-for
+ v-on
+ v-bind
+ v-model
+ v-slot
+ v-pre // {{}} 绕过编译，直接输出
+ v-cloak
+ v-once // 解析变量只会执行一次

### 自定义指令

生命周期钩子 

+ bind
+ inserted
+ update
+ componentUpated
+ unbind

### 常用高级特性provied/inject


### template

+ 模板语法（HTML的扩展）
+ 


### JSX

+ 数据绑定使用单括号
+ JavaScript的语法扩展
