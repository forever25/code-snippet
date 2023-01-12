// 修改文档元数据和文档标题

import { nextTick } from 'vue';

type metaNameType = 'keywords' | 'description';

/**
 * @description: 更改文档关键字
 * @param {string} keywords

 */
const modifyKeyword = (keywords: string) => {
  modifyMeta('description', keywords);
};

/**
 * @description: 修改文档标题
 * @param {string} title
 */
const modifyTitle = (title: string) => {
  let titleDom = document.querySelector('title');
  if (!titleDom) {
    titleDom = document.createElement('title');
    document.head.appendChild(titleDom);
  }
  titleDom.innerText = title;
};

/**
 * @description: 修改文档描述
 * @param {string} description
 */
const modifyDescription = (description: string) => {
  modifyMeta('description', description);
};

/**
 * @description: 修改元标签
 * @param {metaNameType} type
 * @param {string} content
 */
const modifyMeta = (type: metaNameType, content: string) => {
  let metaDom = document.querySelector(`meta[name=${type}]`);
  if (!metaDom) {
    metaDom = document.createElement('meta');
    metaDom.setAttribute('name', type);
    document.head.appendChild(metaDom);
  }
  metaDom.setAttribute('content', content);
};

export default () => {
  return (metaInfo: MetaInfo) => {
    return new Promise<boolean>((resolve, reject) => {
      nextTick(() => {
        if (metaInfo?.title) {
          modifyTitle(metaInfo.title);
        }
        if (metaInfo?.description) {
          modifyDescription(metaInfo.description);
        }
        if (metaInfo?.keywords) {
          modifyKeyword(metaInfo.keywords);
        }
        resolve(true);
      });
    });
  };
};
