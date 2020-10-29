字幕滚动

## usage
`npm i roll_text`

```js
const Roll = require('roll_text')
// or
import Roll from 'roll_text';

const options = {
  container: '#box', // 必填，选择器
  content: "hello it's a demo", // 选填，文字内容，container为后备内容
 	width: 100, // 选填，容器宽度，默认100px
  speed: 1, // 选填，滚动速度 默认1 正常速度，2倍速、0.5倍速
}
const roller = new Roll(options)

roller.start() // 开始滚动
roller.stop() // 停止滚动
roller.reset() // 重置
```