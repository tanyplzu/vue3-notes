# scss

> 小知识：
> sass 和 scss 其实就是同一种东西，我们平时都称之为 sass ，它们俩的主要区别在于语法上，sass 是缩进语法为主，完全省略花括号；scss 是一种 CSS-like 语法，就比较接近 CSS ，更加友好和可读。

## 变量

```css
$font-stack:    Helvetica, sans-serif;
$primary-color: #333;

body {
  font: 100% $font-stack;
  color: $primary-color;
}
```

可以在变量的结尾添加 `!default`， 给一个未通过 `!default` 声明赋值的变量赋值，此时，如果变量已经被赋值，不会再被重新赋值，但是如果变量还没有被赋值，则会被赋予新的值。

```css
$namespace: 'el' !default;
$common-separator: '-' !default;
$element-separator: '__' !default;
$modifier-separator: '--' !default;
$state-prefix: 'is-' !default;
```

## 注释

SASS共有两种注释风格。

标准的CSS注释 `/* comment */` ，会保留到编译后的文件。

单行注释 `// comment`，只保留在SASS源文件中，编译后被省略。

在`/*`后面加一个感叹号，表示这是"重要注释"。即使是压缩模式编译，也会保留这行注释，通常可以用于声明版权信息。

## At-rules

- @use processes the mixins, functions, and variables from different Sass stylesheets together. It also combines CSS from various different stylesheets into one.
- @forward processes a Sass stylesheet and makes its mixins, functions, and variables available for use with the @use rule.
- @import expands the CSS at-rule to process styles, mixins, functions, and variables from other stylesheets.
- @mixin and @include makes it easy to use the sections of styles again.
- @function defines the custom functions to be used in Sass expressions.
- @extend allows selectors to receive styles from one another.
- @at-root puts styles in it to the root of the CSS document.
- @error causes compilation to fail with a given error message, as used in the above example.
- @warn prints the warning without completely stopping the compilation.
- @debug prints the command for debugging purposes.
- Flow control rules like @if, @each, @for, and @while control the number of emissions of styles.

## @extend

```css
.class1 {
  border: 1px solid #ddd;
}

.class2 {
  @extend .class1;
  font-size:120%;
}
```

## @mixin

Mixin有点像C语言的宏（macro），是可以重用的代码块。

使用`@mixin`命令，定义一个代码块。

```css
@mixin link-colors($normal, $hover) {
    color: $normal;
    &:hover { color: $hover; }
}
```

## @use

由 @use 加载的样式表被称为模块（modules）。

通过 @use 加载的模块不管被引用了多少次，都只会在编译后输出一次到 css 中。但是使用 @import 多次引入同一模块，会反复输出到 css 中。

// module.scss

```css
.module {
  color: #f00;
}
```

// a.scss

```css
@use './module.scss'
```

// b.scss

```css
@use './module.scss'
```

// index.scss

```css
@use './a.scss';
@use './b.scss';
```

最后编译

```css
.module {
  color: #f00;
}
```

## @forward

@forward 语句可以引入另一个模块的所有变量、mixins和函数，将它们直接作为当前模块的 API 暴露出去，而不会真的在当前模块增加代码。这样，库作者可以更好地在不同源文件之间拆分代码。不同于 @use， @forward不会给变量添加命名空间。

// base.scss

```css
$padding:22px;
$margin:22px;
```

forward 中间转发文件

```css
@forward "base.scss";
```

main.scss

```css
@use "forward";
p {
  padding: forward.$padding;
}
```

### @forward 添加前缀

```css
@forward "base.scss" as base-*;
```

```css
@use "forward";
p { padding: forward.$base-padding; }
```

## @content

```css
@mixin example {
 @content;
}
body{
 @include example{ color : white }
}
```

Output :

```css
body {
    color: white;
}
```

```css
@mixin sm($val) {
 @media screen and (min-width: $val) {
  @content;
 }
}

@include sm(600px) {
 body {
  color: white;
 }
}
```

Output :

```css
@media screen and (min-width: 600px) {
    body {
        color: white;
    }
}
```

## @at-root

我们CSS中有一种命名方式是BEM,如：

```css
.block {}
.block__element{}
.block--modifier{}
```

写成嵌套

```css
.block {
    color: red;

    #{&}__element {
        color:blue;
    }

    #{&}--modifier {
        color: orange;
    }
}
```

编译完后是：

```css
.block {
  color: red; 
}
.block .block__element {
  color: blue; 
}
.block .block--modifier {
  color: orange; 
}
```

这不是我们想要的代码。但在LESS和Stylus中，能很好的实现BEM类名的形式。此时在想，在Sass中有没有这样的功能呢？值得幸运的是，在Sass3.3中新增加了@at-root特性,能实现上面BEM的特性：

```css
.block {
    color: red;

    @at-root #{&}__element {
        color: blue;
    }

    @at-root #{&}--modifier {
        color:orange;
    }
}
```

### @at-root和&的结合

```css
.foo {
    @at-root .bar & {
        color:gray;
    }
}
```

```css
.bar .foo {
  color: gray; 
}
```

### `@at-root`和`#{&}`结合

Sass有脚本模式 `#{}`，他和`&`不同之处是，`&`只用作选择器



## 资料

- [Sass中文网](https://www.sass.hk/docs/)
- [Sass＠at-root](https://www.sass.hk/skill/sass40.html)
- [SASS用法指南](https://www.ruanyifeng.com/blog/2012/06/sass.html)
- [SCSS · SASS 教程](https://www.lesscode.work/sections/621c2d75d20c1.html) 比较好
