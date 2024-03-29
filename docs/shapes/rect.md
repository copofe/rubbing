# 矩形

| Property         | Description              | Type                                    | Required | Default |
| ---------------- | ------------------------ | --------------------------------------- | -------- | ------- |
| width            | 宽度                     | `number`                                | true     | 0       |
| height           | 高度                     | `number`                                | true     | 0       |
| rx               | Horizontal border radius | `number`                                | false    | 0       |
| ry               | Vertical border radius   | `number`                                | false    | 0       |
| radii            | border radius            | `number` &#124; `number[]`              | false    | 0       |
| fill             | 填充颜色                 | `string` &#124; [`Gradient`](#gradient) | false    | -       |
| stroke           | 描边颜色                 | `string`                                | false    | -       |
| strokeWidth      | 描边宽度                 | `number`                                | false    | 1       |
| strokeDashArray  | 描边点划线               | `number[]`                              | false    | -       |
| strokeDashOffset | 描边点划线偏移           | `number`                                | false    | 0       |
| strokeLineCap    | 开放自路径两端的形状     | `CanvasLineCap`                         | false    | -       |
| strokeLineJoin   | 转角处形状               | `CanvasLineJoin`                        | false    | -       |
| strokeMiterLimit | 转角最大距离             | `number`                                | false    | 4       |

# 示例

<ClientOnly>
  <canvas id="canvas"></canvas>
</ClientOnly>

<script>
if (!import.meta.env.SSR) {
  import('https://unpkg.com/rubbing@latest/dist/index.mjs').then(async ({ Rubbing }) => {
    const rubbing = new Rubbing({
      selector: '#canvas',
      background: '#fff',
      width: 300,
      height: 300,
    })
    await rubbing.init()
    rubbing.loadFrom({
      objects: [
        {
          type: 'rect',
          fill: '#7c3aed',
          left: 100,
          top: 0,
          width: 200,
          height: 200,
        },
      ],
    })
  })
}
</script>

::: details Source Code

```js
const rubbing = new Rubbing({
  selector: '#canvas',
  background: '#fff',
  width: 300,
  height: 300,
})
await rubbing.init()
rubbing.loadFrom({
  objects: [
    {
      type: 'rect',
      fill: '#7c3aed',
      left: 100,
      top: 0,
      width: 200,
      height: 200,
    },
  ],
})
```

:::
