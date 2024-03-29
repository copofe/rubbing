# 图形属性

图形可配置属性分为基础属性和私有属性，私有属性详见各图形介绍。

## 图形基础属性

| Property | Description | Type                      | Required | Default  |
| -------- | ----------- | ------------------------- | -------- | -------- |
| type     | 类型        | [`ShapeType`](#shapetype) | true     | -        |
| left     | x 轴距离    | `number`                  | true     | 0        |
| top      | y 轴距离    | `number`                  | true     | 0        |
| zIndex   | 层叠顺序    | `number`                  | false    | 自身索引 |
| visible  | 是否可见    | `boolean`                 | false    | true     |

### ShapeType

- `circle` 圆
- `ellipse` 椭圆
- `image` 图像
- `line` 直线
- `polygon` 多边形
- `polyline` 折线
- `rect` 矩形
- `text` 文本
- `triangle` 三角形

### Gradient

> 渐变

| Property   | Description  | Type                                                                           | Required | Default |
| ---------- | ------------ | ------------------------------------------------------------------------------ | -------- | ------- |
| type       | 渐变类型     | `linear` &#124; `radial`                                                       | true     | -       |
| coords     | 渐变区域坐标 | `{ x1: number, y1: number, x2: number, y2: number, r1?: number, r2?: number }` | true     | -       |
| colorStops | 渐变断点     | `{color: string, offset: number, opacity?: number}[]`                          | true     | -       |

#### coords

- `linear` 线性渐变
  ```ts
  {
    type: 'linear',
    coords: {
      x1: number, // 起点 x 轴坐标
      y1: number, // 起点 y 轴坐标
      x2: number, // 终点 x 轴坐标
      y2: number, // 终点 y 轴坐标
    },
  }
  ```
- `radial` 径向渐变
  ```ts
  {
    type: 'radial',
    coords: {
      x1: number, // 内圆原点 x 轴坐标
      y1: number, // 内圆原点 y 轴坐标
      x2: number, // 外圆原点 x 轴坐标
      y2: number, // 外圆原点 y 轴坐标
      r1: number, // 内圆半径
      r2: number, // 外圆半径
    },
  }
  ```

:::tip
colorStops.offset 数值范围 0 ~ 1
:::

#### 示例：

```ts
{
  fill: {
    type: 'radial',
    coords: { x1: 50, y1: 50, x2: 50, y2: 50, r1: 0, r2: 50 },
    colorStops: [
      { offset: 0, color: '#000' },
      { offset: 1, color: '#fff' }
    ]
  },
}
```
