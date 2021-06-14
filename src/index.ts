/** @prettier */

import { LitElement, html, customElement, property, css } from 'lit-element';

@customElement('sws-ripple-box')
class SwsRippleBox extends LitElement {
  static styles = css`
    :host {
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

    @keyframes sws-ripple {
      0% {
        opacity: 0;
        transform: scale(1);
      }
      30% {
        opacity: 1;
      }
      70% {
        opacity: 1;
        transform: scale(var(--sws-ripple-box-scale-up-size));
      }
      100% {
        opacity: 0;
        transform: scale(var(--sws-ripple-box-scale-up-size));
      }
    }

    .ripple-box {
      position: relative;
      border-radius: var(--sws-ripple-box-border-radius);
    }

    .ripple-box__main {
      position: relative;
      clip-path: var(--sws-ripple-box-clip-path);
    }

    .ripple-box__ripple--1,
    .ripple-box__ripple--2 {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      border-radius: var(--sws-ripple-box-border-radius);
      pointer-events: none;
    }

    .ripple-box[is-active] .ripple-box__ripple--1,
    .ripple-box[is-active] .ripple-box__ripple--2 {
      opacity: 0;
      animation-name: sws-ripple;
      animation-duration: var(--sws-ripple-box-animation-duration);
      animation-iteration-count: var(--sws-ripple-box-animation-count);
      animation-timing-function: var(--sws-ripple-box-animation-timing-function);
      animation-fill-mode: backwards;
      box-shadow: 0 0 var(--sws-ripple-box-shadow-blur-radius)
        var(--sws-ripple-box-shadow-spread-radius) var(--sws-ripple-box-color) inset;
      will-change: opacity, transform;
    }

    .ripple-box[is-active] .ripple-box__ripple--2 {
      animation-delay: var(--sws-ripple-box-animation-delay);
    }
  `;

  MODE_STATIC = 'static';

  @property({ type: String })
  mode = '';

  private isTouching = false;

  private elRippleBox: HTMLDivElement | null | undefined;

  private elRipple2: HTMLDivElement | null | undefined;

  private animationCountProp: String | null | undefined;

  constructor() {
    super();
    this.elRippleBox = null;
    this.elRipple2 = null;
  }

  render() {
    return html`
      <div class="ripple-box">
        <div class="ripple-box__ripple--1" aria-hidden="true"></div>
        <div class="ripple-box__ripple--2" aria-hidden="true"></div>
        <div
          class="ripple-box__main"
          @mouseover="${this._onMouseOver}"
          @mouseout="${this._onMouseOut}"
          @touchstart="${this._onTouchStart}"
        >
          <slot />
        </div>
      </div>
    `;
  }

  firstUpdated() {
    this.elRippleBox = this.shadowRoot?.querySelector<HTMLDivElement>('.ripple-box');
    this.elRipple2 = this.elRippleBox?.querySelector<HTMLDivElement>('.ripple-box__ripple--2');
    this.animationCountProp = getComputedStyle(this.elRippleBox).getPropertyValue(
      '--sws-ripple-box-animation-count'
    );

    if (this.mode === this.MODE_STATIC) {
      this.elRippleBox?.setAttribute('is-active', '');
      this.style.setProperty('--sws-ripple-box-animation-count', 'infinite');
    }

    this.elRipple2?.addEventListener('animationend', () => {
      this._stopAnimation();
    });
  }

  private _stopAnimation(): void {
    this.elRippleBox?.removeAttribute('is-active');
    this.style.removeProperty('--sws-ripple-box-animation-count');
  }

  private _onMouseOver(e: MouseEvent): void {
    if (this.mode === this.MODE_STATIC) {
      return;
    }

    if (this.isTouching) {
      this.isTouching = false;
      return;
    }

    this.style.removeProperty('--sws-ripple-box-animation-count');

    if (this.elRippleBox?.hasAttribute('is-active')) {
      return;
    }

    this.elRippleBox?.setAttribute('is-active', '');
  }

  private _onMouseOut(e: MouseEvent): void {
    if (this.mode === this.MODE_STATIC) {
      return;
    }

    if (!this.elRippleBox?.hasAttribute('is-active')) {
      return;
    }

    this.style.setProperty('--sws-ripple-box-animation-count', '1');
  }

  private _onTouchStart(e: TouchEvent): void {
    if (this.mode === this.MODE_STATIC) {
      return;
    }

    this.isTouching = true;

    if (this.elRippleBox?.hasAttribute('is-active')) {
      return;
    }

    this.style.setProperty('--sws-ripple-box-animation-count', '1');

    this.elRippleBox?.setAttribute('is-active', '');
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sws-ripple-box': SwsRippleBox;
  }
}
