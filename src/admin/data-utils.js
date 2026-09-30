// 後台表單用的不可變資料操作工具

export function getIn(root, path) {
  return path.reduce((current, key) => (current == null ? current : current[key]), root)
}

export function setIn(root, path, value) {
  if (path.length === 0) return value
  const [head, ...rest] = path
  if (Array.isArray(root)) {
    const copy = root.slice()
    copy[head] = setIn(root[head], rest, value)
    return copy
  }
  const copy = { ...(root ?? {}) }
  copy[head] = setIn(root?.[head], rest, value)
  return copy
}

export function removeAtPath(root, path) {
  const parentPath = path.slice(0, -1)
  const index = path[path.length - 1]
  const parent = getIn(root, parentPath)
  if (!Array.isArray(parent)) return root
  return setIn(
    root,
    parentPath,
    parent.filter((_, itemIndex) => itemIndex !== index),
  )
}

export function moveAtPath(root, path, delta) {
  const parentPath = path.slice(0, -1)
  const index = path[path.length - 1]
  const parent = getIn(root, parentPath)
  const target = index + delta
  if (!Array.isArray(parent) || target < 0 || target >= parent.length) return root
  const copy = parent.slice()
  const [item] = copy.splice(index, 1)
  copy.splice(target, 0, item)
  return setIn(root, parentPath, copy)
}

export function duplicateAtPath(root, path, index) {
  const parent = getIn(root, path)
  if (!Array.isArray(parent)) return root
  const copy = structuredClone(parent[index])
  if (copy && typeof copy === 'object') {
    if ('id' in copy) copy.id = `${copy.id}-copy`
    if ('title' in copy) copy.title = `${copy.title}（複製）`
    else if ('name' in copy) copy.name = `${copy.name}（複製）`
  }
  const next = parent.slice()
  next.splice(index + 1, 0, copy)
  return setIn(root, path, next)
}

function blankObject(fields) {
  const object = {}
  fields.forEach((field) => {
    if (field.type === 'object') object[field.key] = blankObject(field.fields ?? [])
    else object[field.key] = ''
  })
  return object
}

/** 依照欄位定義產生一個新的空物件（給「新增」用） */
export function blankItem(fields) {
  const item = {}
  fields.forEach((field) => {
    if (field.type === 'boolean') item[field.key] = false
    else if (field.type === 'stringList' || field.type === 'objectList') item[field.key] = []
    else if (field.type === 'object') item[field.key] = blankObject(field.fields ?? [])
    else if (field.type === 'select') item[field.key] = field.options?.[0] ?? ''
    else if (field.nullable) item[field.key] = null
    else item[field.key] = ''
  })
  return item
}
