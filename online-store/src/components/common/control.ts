class Control<NodeType extends HTMLElement = HTMLElement> {
  public node: NodeType;

  constructor({
    parentNode,
    tagName = 'div',
    className = '',
    content = '',
  }: {
    parentNode: HTMLElement | null;
    tagName?: string;
    className?: string;
    content?: string;
  }) {
    const element = document.createElement(tagName);

    element.className = className;
    element.innerHTML = content;

    if (parentNode) parentNode.append(element);

    this.node = element as NodeType;
  }

  destroy(): void {
    this.node.remove();
  }
}

export default Control;
