import React, {ReactNode} from 'react';
// @ts-ignore
import detectElementResize from 'frc-detect-element-resize';

interface IChildParams {
  width?: number;
  height?: number;
}

interface IAutoSizeProps {
  className?: string;
  defaultWidth?: number;
  defaultHeight?: number;
  disableWidth?: boolean;
  disableHeight?: boolean;
  style?: object;
  onResize?: Function;
  children?: (params: IChildParams) => ReactNode;
  nonce?: string;
}

interface IAutoSizeState {
  width: number;
  height: number;
}

interface IOuterStyle {
  overflow?: string;
  width?: string | number;
  height?: string | number;
}

type ResizeHandler = (element: HTMLElement, onResize: () => void) => void;

interface IDetectElementResizeProps {
  addResizeListener: ResizeHandler;
  removeResizeListener: ResizeHandler;
}

class AutoSize extends React.Component<IAutoSizeProps, IAutoSizeState> {
  public static defaultProps = {
    disableWidth: false,
    disableHeight: false,
    children: (params: IChildParams) => null
  };

  public _parentNode?: HTMLElement;
  public _autoSizer?: HTMLDivElement;
  public _detectElementResize?: IDetectElementResizeProps;

  constructor(props: IAutoSizeProps) {
    super(props);
    this.state = {
      width: 0,
      height: 0
    };
  }

  componentDidMount() {
    const {nonce} = this.props;
    if (
      this._autoSizer &&
      this._autoSizer.parentNode &&
      this._autoSizer.parentNode.ownerDocument &&
      this._autoSizer.parentNode.ownerDocument.defaultView &&
      this._autoSizer.parentNode instanceof HTMLElement
    ) {
      this._parentNode = this._autoSizer.parentNode;

      this._detectElementResize = detectElementResize(nonce);
      if (this._detectElementResize) {
        this._detectElementResize.addResizeListener(
          this._parentNode,
          this.fResize
        );
      }
      this.fResize();
    }
  }

  componentWillUnmount() {
    if (this._detectElementResize && this._parentNode) {
      this._detectElementResize.removeResizeListener(
        this._parentNode,
        this.fResize
      );
    }
  }

  fResize = () => {
    const {disableHeight, disableWidth, onResize} = this.props;

    if (this._parentNode) {
      const height = this._parentNode.offsetHeight || 0;
      const width = this._parentNode.offsetWidth || 0;
      const style: CSSStyleDeclaration =
        window.getComputedStyle(this._parentNode) || {};
      const paddingLeft = parseInt(style.paddingLeft || '0', 10) || 0;
      const paddingRight = parseInt(style.paddingRight || '0', 10) || 0;
      const paddingTop = parseInt(style.paddingTop || '0', 10) || 0;
      const paddingBottom = parseInt(style.paddingBottom || '0', 10) || 0;
      const borderLeftWidth = parseInt(style.borderLeftWidth || '0', 10) || 0;
      const borderTopWidth = parseInt(style.borderTopWidth || '0', 10) || 0;
      const borderRightWidth = parseInt(style.borderRightWidth || '0', 10) || 0;
      const borderBottomWidth =
        parseInt(style.borderBottomWidth || '0', 10) || 0;

      let newHeight = height - paddingTop - paddingBottom;
      let newWidth = width - paddingLeft - paddingRight;
      if (style.boxSizing === 'border-box') {
        newHeight = newHeight - borderTopWidth - borderBottomWidth;
        newWidth = newWidth - borderLeftWidth - borderRightWidth;
      }

      if (
        (!disableHeight && this.state.height !== newHeight) ||
        (!disableWidth && this.state.width !== newWidth)
      ) {
        const state = {
          height: newHeight,
          width: newWidth
        };
        this.setState(state);

        if (typeof onResize === 'function') {
          onResize(state);
        }
      }
    }
  };

  fSetRef = (autoSizer: HTMLDivElement) => {
    this._autoSizer = autoSizer;
  };

  render() {
    const {
      children,
      className,
      disableHeight,
      disableWidth,
      style
    } = this.props;
    const {height, width} = this.state;

    const outerStyle: IOuterStyle = {overflow: 'visible'};
    const childParams: IChildParams = {};

    if (!disableHeight) {
      outerStyle.height = 0;
      childParams.height = height;
    }

    if (!disableWidth) {
      outerStyle.width = 0;
      childParams.width = width;
    }

    return (
      <div
        className={className}
        ref={this.fSetRef}
        style={{
          ...outerStyle,
          ...style,
          height: '100%'
        }}
      >
        {typeof children === 'function' && children(childParams)}
      </div>
    );
  }
}

export default AutoSize;
