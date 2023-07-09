
// this is function for one element

function el(type, attrs, ...children) {
  const el = document.createElement(type);
  if (attrs) {
    for (let attr in attrs) {
      el.setAttribute(attr,attrs[attr])
    }
  }

  if (children) {
    children.forEach(child => {
      if (typeof child === 'string') {
        const textNode = document.createTextNode(child);
        el.appendChild(textNode);
      } else {
        el.appendChild(child);
      }
    });
  }

  return el;
}

el("div", {"class": "some_classname", "id": "some_id"},el("span", {}, 'hello'));

//****************************************************************************************

const DIV = 'div';
const SPAN = 'span';
const UL = 'ul';
const LI = 'li';
const FORM = 'form';
const LABEL = 'label';
const INPUT = 'input';
const BR = 'br';


class DomElement {
  constructor(type, attrs, children) {
    this.type = type;
    this.attrs = attrs;
    this.children = children;
  }

  draw() {
    const docElem = document.createElement(this.type);

    for (let attr in this.attrs) {
      docElem.setAttribute(attr, this.attrs[attr]);
    }
    if (typeof this.children === 'string') {
      const el = document.createTextNode(this.children);
      docElem.appendChild(el);
    } else if (Array.isArray(this.children)) {
      this.children.forEach(child => {
        docElem.appendChild(child);
      });
    } else {
      docElem.appendChild(this.children);
     }

    return docElem;
  }
}

class DivElement extends DomElement {
  constructor(attrs, children) {
    super(DIV, attrs, children);
  }
}

class SpanElement extends DomElement {
  constructor(attrs, children) {
    super(SPAN, attrs, children);
  }
}

class UlElement extends DomElement {
  constructor(attrs, children) {
    super(UL, attrs, children);
  }
}

class LiElement extends DomElement {
  constructor(attrs, children) {
    super(LI, attrs, children);
  }
}

class FormElement extends DomElement {
  constructor(attrs, children) {
    super(FORM, attrs, children);
  }
}

class LabelElement extends DomElement {
  constructor(attrs, children) {
    super(LABEL, attrs, children);
  }
}

class InputElement extends DomElement {
  constructor(attrs, children) {
    super(INPUT, attrs, children);
  }
}

class BrElement extends DomElement {
  constructor(attrs, children) {
    super(BR, attrs, children);
  }
}

function el(type, attrs, children) {
  switch (type) {
    case DIV:
      return new DivElement(attrs, children);
    case SPAN:
      return new SpanElement(attrs, children);
    case UL:
      return new UlElement(attrs, children);
    case LI:
      return new LiElement(attrs, children);
    case FORM:
      return new FormElement(attrs, children);
    case LABEL:
      return new LabelElement(attrs, children);
    case INPUT:
      return new InputElement(attrs, children);
    case BR:
      return new BrElement(attrs, children);
  }
}

const tree =
el("div", {},
  el("ul", {}, [
    el("li", {}, "Item 1"),
    el("li", {}, "Item 2"),
    el("li", {}, "Item 3")
  ])
);

document.getElementById('root').appendChild(tree.draw());