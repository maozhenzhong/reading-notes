# CSS Specificity:Things You Should Know

---

> 选择器的不同权重通常是你所期望的效果，没有通过CSS规则在元素上生效的主要原因。所以权重决定了你的CSS规则怎样被浏览器解析直到生效。

#### 选择器层级

> 每个选择器都具有特定的层次结构。有四种不同的类别刻意定义给定选择器的权重级别：


1. 內联样式：文档中存在的样式 `权重值1000`
2. ID(ID选择器)`权重值为0100`
3. 类(class)、属性(attributes、[attribute="name"])、和伪类(:hover, :focus, :active)`权重值为0010`
4. 元素和伪元素(::before、::after)`权重值为0001`
5. 通配符(*)`权重值为0000`
6. `!impontant`权重为infinity
