import Control from '../common/control';
import IFilterData, { IRangeFilter } from '../model/IFilterData';
import ISettings from '../model/ISettings';
import InputSetting from './inputSetting';
import './rangeSlider.css';

class RangeInputSetting extends InputSetting {
  public oninput!: () => void;
  constructor({
    parentNode,
    tagName = 'input',
    className = 'setting',
    content = '',
    id = '',
    type = 'range',
    min = '',
    max = '',
    step = '1',
    onUpdate,
    reset,
  }: {
    parentNode: HTMLElement | null;
    tagName?: string;
    className?: string;
    content?: string;
    id?: string;
    type?: string;
    min?: string;
    max?: string;
    step?: string;
    onUpdate: (filters: IFilterData) => Promise<IFilterData>;
    reset: (settings: ISettings) => void;
  }) {
    super({ parentNode, tagName, className, content, id, type, onUpdate, reset });

    this.node.min = min;
    this.node.max = max;
    this.node.step = step;
  }
}

class RangeSlider extends Control {
  public from: RangeInputSetting;
  public to: RangeInputSetting;
  constructor({
    parentNode,
    tagName,
    className = 'slider',
    content = '',
    id,
    min,
    max,
  }: {
    parentNode: HTMLElement | null;
    id: keyof IFilterData;
    tagName?: string;
    className?: string;
    content?: string;
    min?: string;
    max?: string;
  }) {
    super({ parentNode, tagName, className, content });
    if (id) this.node.id = id;

    const from = new RangeInputSetting({
      parentNode: this.node,
      className: 'slider__input',
      id: `${id}from`,
      type: 'range',
      min: min,
      max: max,
      step: '1',
      onUpdate: async (filters: IFilterData): Promise<IFilterData> => {
        (<IRangeFilter>filters[id])['from'] = Number(from.node.value);
        from.oninput();
        return filters;
      },
      reset: (settings: ISettings): void => {
        from.node.value = `${(<IRangeFilter>settings.filters[id])['from']}`;
      },
    });

    const to = new RangeInputSetting({
      parentNode: this.node,
      className: 'slider__input',
      id: `${id}to`,
      type: 'range',
      min: min,
      max: max,
      step: '1',
      onUpdate: async (filters: IFilterData): Promise<IFilterData> => {
        (<IRangeFilter>filters[id])['to'] = Number(to.node.value);
        to.oninput();
        return filters;
      },
      reset: (settings: ISettings): void => {
        to.node.value = `${(<IRangeFilter>settings.filters[id])['to']}`;
        from.oninput();
        to.oninput();
      },
    });

    const sliderView = new Control({ parentNode: this.node, className: 'slider__view' }).node;
    const range = new Control({ parentNode: sliderView, className: 'slider__range' });
    const progressLeft = new Control({ parentNode: sliderView, className: 'slider__progress slider__progress_from' });
    const progressRight = new Control({ parentNode: sliderView, className: 'slider__progress slider__progress_to' });
    const thumbLeft = new Control({ parentNode: sliderView, className: 'slider__thumb' });
    const thumbRight = new Control({ parentNode: sliderView, className: 'slider__thumb' });
    const signLeft = new Control({ parentNode: sliderView, className: 'slider__sign' });
    const signRight = new Control({ parentNode: sliderView, className: 'slider__sign' });

    from.oninput = () => {
      from.node.value = Math.min(Number(from.node.value), Number(to.node.value)).toString();
      const value =
        ((Number(from.node.value) - Number(from.node.min)) / (Number(from.node.max) - Number(from.node.min))) * 100;
      progressLeft.node.style.width = `${value}%`;
      range.node.style.left = `${value}%`;
      thumbLeft.node.style.left = `${value}%`;
      signLeft.node.style.left = `${value}%`;
      signLeft.node.innerHTML = `<span class="slider__sign-span slider__sign-span_${id}">${from.node.value}</span>`;
    };

    to.oninput = () => {
      to.node.value = Math.max(Number(from.node.value), Number(to.node.value)).toString();
      const value = ((Number(to.node.value) - Number(to.node.min)) / (Number(to.node.max) - Number(to.node.min))) * 100;
      progressRight.node.style.width = `${100 - value}%`;
      range.node.style.right = `${100 - value}%`;
      thumbRight.node.style.left = `${value}%`;
      signRight.node.style.left = `${value}%`;
      signRight.node.innerHTML = `<span class="slider__sign-span slider__sign-span_${id}">${to.node.value}</span>`;
    };

    this.to = to;
    this.from = from;

    this.from.oninput();
    this.to.oninput();
  }
}

export { RangeInputSetting };
export default RangeSlider;
