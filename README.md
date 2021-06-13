# sws-ripple-box

A web Components to add ripple animation to some element.


## Demo

[Demo](http://sandbox.serendip.ws/sws-ripple-box.html)


## Usage

Place `sws-ripple-box` custom element.

```html
<sws-ripple-box>
  <div>
    Hello World
  </div>
</sws-ripple-box>
<script type="module" src="sws-ripple-box.min.js"></script>
```

Set element's style etc... by css custom properties.

```css
sws-ripple-box {
  --sws-ripple-box-color: rgba(255, 255, 255, 0.5);
  --sws-ripple-box-border-radius: 100%;
  --sws-ripple-box-scale-up-size: 1.2;
  --sws-ripple-box-shadow-blur-radius: 10px;
  --sws-ripple-box-shadow-spread-radius: 2.5px;
  --sws-ripple-box-animation-duration: 2000ms;
  --sws-ripple-box-animation-delay: 1000ms;
  --sws-ripple-box-animation-count: infinite;
  --sws-ripple-box-animation-timing-function: ease-out;
  --sws-ripple-box-clip-path: none;
}
```


## CSS custom properties

| css custom property name                     | content                         |  defaults                  |
|:---------------------------------------------|:--------------------------------|:---------------------------|
| `--sws-ripple-box-color`                     | Ripple box-shadow color         | `rgba(255, 255, 255, 0.5)` |
| `--sws-ripple-box-border-radius`             | Box border-radius               | `100%`                     |
| `--sws-ripple-box-scale-up-size`             | Ripple transform scale up size  | `1.2`                      |
| `--sws-ripple-box-shadow-blur-radius`        | Ripple box-shadow blur radius   | `10px`                     |
| `--sws-ripple-box-shadow-spread-radius`      | Ripple box-shadow sperad radius | `2.5px`                    |
| `--sws-ripple-box-animation-duration`        | Animation duration              | `2000ms`                   |
| `--sws-ripple-box-animation-delay`           | Animation delay                 | `1000ms`                   |
| `--sws-ripple-box-animation-count`           | Animation count                 | `infinite`                 |
| `--sws-ripple-box-animation-timing-function` | Animation timing function       | `ease-out`                 |
| `--sws-ripple-box-clip-path`                 | Limit the range of mouse events | `none`                     |


## License

MIT


## Author

inotom
