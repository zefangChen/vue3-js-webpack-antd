/**
 * 拼接树结构
 * @param items 数组参数
 * @param id
 * @param link  父节点
 */
export const nest = (items, id = null, link = 'parent_id') =>
  items
    .filter(item => item[link] === id)
    .map(item => ({ ...item, children: nest(items, item.id, link) }));

/**
 * 数组扁平化
 * @param arr  入参：数组
 * @returns {*[]}
 *
 * 用法： deepFlatten([1, [2], [[3], 4], 5]); // [1, 2, 3, 4, 5]
 */
export const deepFlatten = arr =>
  [].concat(...arr.map(v => (Array.isArray(v) ? deepFlatten(v) : v)));


/**
 * 深拷贝
 * @param obj
 * @returns {unknown[]|null|*}
 *
 * 用法： const a = { foo: 'bar', obj: { a: 1, b: 2 } };
 *       const b = deepClone(a); // a !== b, a.obj !== b.obj
 */
export const deepClone = obj => {
  if (obj === null) return null;
  let clone = Object.assign({}, obj);
  Object.keys(clone).forEach(
    key =>
      (clone[key] =
        typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key])
  );
  if (Array.isArray(obj)) {
    clone.length = obj.length;
    return Array.from(clone);
  }
  return clone;
};
