字幕滚动

## 用法 usage
`npm i roll_text`

```
const Roll = require('roll_text')

const roller = new Roll({
 container: '#box', // 选择器
 width: 100, // 元素宽度
 content: 'hello it's a demo', // 文字内容 不填则显示container内容
 speed: 1, // 滚动速度 默认1 正常速度，2倍速、0.5倍速
})
roller.start() // 开始滚动
roller.stop() // 停止滚动
roller.reset() // 重置
```