import { TagNames } from './types';
import { StringObj } from './sitemap-item-stream';
import { IndexTagNames } from './sitemap-index-stream';

export function text(txt: string): string {
  return txt.replace(/&/g, '&amp;').replace(/</g, '&lt;');
}

export function otag(
  nodeName: TagNames | IndexTagNames,
  attrs?: StringObj,
  selfClose = false
): string {
  let attrstr = '';
  for (const k in attrs) {
    const val = attrs[k]
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/'/g, '&apos;')
      .replace(/"/g, '&quot;');
    attrstr += ` ${k}="${val}"`;
  }
  return `<${nodeName}${attrstr}${selfClose ? '/' : ''}>`;
}

export function ctag(nodeName: TagNames | IndexTagNames): string {
  return `</${nodeName}>`;
}

export function element(
  nodeName: TagNames,
  attrs: StringObj,
  innerText: string
): string;
export function element(
  nodeName: TagNames | IndexTagNames,
  innerText: string
): string;
export function element(nodeName: TagNames, attrs: StringObj): string;
export function element(
  nodeName: TagNames | IndexTagNames,
  attrs: string | StringObj,
  innerText?: string
): string {
  if (typeof attrs === 'string') {
    return otag(nodeName) + text(attrs) + ctag(nodeName);
  } else if (innerText) {
    return otag(nodeName, attrs) + text(innerText) + ctag(nodeName);
  } else {
    return otag(nodeName, attrs, true);
  }
}
