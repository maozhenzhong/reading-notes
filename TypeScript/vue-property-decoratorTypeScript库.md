# vue-property-decorator TypeScript库
---

[GitHub: vue-property-decorator](https://github.com/kaorun343/vue-property-decorator)

## 1、安装 `npm install --save vue-property-decorator`

* @Component(from vue-class-component)
* @Prop
* @Model
* @Watch
* @Emit
* @Inject
* @Provide
* Mixins(the helper function named mixins defined at vue-class-component)

### 2、@Component

js写法

```JavaScript
import { componentA, componentB } from '@/component'

export default {
	components: {
		compnentA,
		componentB
	},
	directives: {
		focus: {
			// 指令的定义
			inserted: function(el) {
				el.focus()
			}
		}	
	}
}
```

ts写法

```TypeScript
import {Component, Vue} from 'vue-property-decorator'
import {componentA, componentB} from '@/components'

@Component({
	components: {
		componentA,
		componentB
	},
	directives: {
		focus: {
			// 指令的定义
			inserted: function(el) {
				el.focus()
			}
		}
	}
})
export default class MyComponent extends Vue{
	...
}
```

### @Prop 父子组件之间值的传递

js写法

```JavaScript
export default{
	props: {
		propA: String,
		PropB: [String, Number]
		propC: {
			type: Array,
			default: () => {
				return ['a', 'b']
			},
			required: true,
			validator: (value) => {
				return ['a', 1].indexOf(value) !== 1
			}
		}
	}
}
```

ts 写法

```TypeScript
import { Component, Vue, Prop } from vue-property-decorator

@Component
export default class YourComponent extends Vue {
	@Prop(String)
	PropA: string
	
	@Prop([String, Number])
	PropB: string|number
	
	@PropC({
		type: String, // type: [String, Number]
		default: 'default value', // 一般为String或Number
		// 如果是对象或数组的话。默认值从一个工厂函数返回
		// default() => {
		// 		return ['a', 1]
		// }
		required: true,
		validator: (value) => {
			return [
				'InProcess',
				'Settled'
			].indexOf(value) !== -1
		}
	})
	propC: String
}
```

### @Model（组件之间，checkbox）

父组件中使用v-model=“checked”子组件

js写法

```JavaScript
export default {
	model: {
		prop: 'checked',
		event: 'change'
	},
	props: {
		checked: {
			type: Boolean
		}
	},
	methods: {
		change(e) {
			this.$emit('change', e.target.checked)
		}
	}
}
```

ts写法

```TypeScript
import {Vue,Component,Model,Emit} from 'vue-property-decorator'

@Component
export default class YourComponet extends Vue{
	@Model('change', {
		type: Boolean
	})
	checked!:boolean
	
	@Emit('change')
	change(e:MouseEvent){}
}
```

### 5、@Watch 

js写法

```JavaScript
export default {
	watch: {
		'person': {
			handler: 'onPersonChanged',
			immediate: true,
			deep: true
		}
	},
	methods: {
		onPersonChanged(val, oldVal) {
		
		}
	}
}
```

ts写法

```TypeScript
import {Vue, Component, Watch} from 'vue-property-decorator'

@Component
export default class YourComponent extends Vue{
	@Watch('person', {immediate: true, deep: true})
	onPerosnChanged(val: Person, oldVal: Person) {}
}
```

### 6、@Emit

> 由@Emit $emit定义的函数发出它们的返回值，后跟它们的原始参数。如果返回值是promise，则在发出之前将其解析。
> 


> 如果事件的名称未通过事件参数提供，则使用函数名称。在这种情况下，camelCase名称将转换为kebab-case
> 


js写法

```JavaScript
export default {
	data() {
		return {
			count: 0
		}
	},
	methods: {
		addToCount(n) {
			this.count += n
			this.$emit('add-to-count', n)
		},
		resetCount() {
			this.count = 0
			this.$emit('reset')
		},
		returnValue() {
			this.$emit('return-value', 10)
		},
		promise() {
			const promise = new Promise(resolve => {
				setTimeout(() => {
					resolve(20)
				}, 0)
			})
			
			promise.then(value => {
				this.$emit('promise', value)
			})
		}
	}
}
```

ts写法

```TypeScript
important {Vue, Component,Emit} from 'vue-property-decorator'

@Component
export default class YourCompnent extends Vue{
	count = 0
	
	@Emit()
	addToCount(n: number) {
		this.count += n
	}
	
	@Emit('reset)
	resetCount() {
		this.count = 0
	}
	
	@Emit()
	returnValue() {
		return 10
	}
	
	@Emit()
	promise() {
		return new Promise(resolve => {
			setTimeout(() => {
				resolve(20)
			}, 0)
		})
	}
}
```


### 7、@Provide 提供/@Inject注入

> 注：父组件不便于向子组件传递数据，就把数据通过Provide传递下去，然后子组件通过Inject来获取


js写法

```JavaScript
const symbol = Symbol('baz')

export const MyComponent = Vue.extend({
	inject: {
		foo: 'foo',
		bar: 'bar',
		'optional': {from: 'optional', default: 'default'},
		[symbol]: symbol
	},
	data() {
		return {
			foo: 'foo',
			baz: 'bar
		}
	},
	provide() {
		return {
			foo: this.foo,
			bar: this.baz
		}
	}
})
```

ts写法

```TypeScript
import {Vue,Component,Inject,Provide} from 'vue-property-decorator'

const symbol = Symbol('baz')

@Component
export default class MyComponent extends Vue{
	@Inject()
	foo!: string
	
	@Inject('bar')
	bar!: string
	
	@Inject({
		from: 'optional',
		default: 'default'
	})
	optional!: string
	
	@Inject(symbol)
	baz!: string
	
	@Provide()
	foo = 'foo'
	
	@Provide('bar')
	baz = 'bar' 
}
```