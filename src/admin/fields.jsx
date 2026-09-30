import { useContext, useRef, useState } from 'react'
import Icon from '../components/Icon.jsx'
import { asset } from '../lib/asset.js'
import { AdminContext } from './context.js'
import {
  blankItem,
  duplicateAtPath,
  getIn,
  moveAtPath,
  removeAtPath,
  setIn,
} from './data-utils.js'

export function FieldGroup({ fields, root, path, onChange }) {
  return (
    <div className="af-fields">
      {fields.map((field) => (
        <Field
          key={field.key}
          field={field}
          root={root}
          path={[...path, field.key]}
          onChange={onChange}
        />
      ))}
    </div>
  )
}

function FieldLabel({ label, help }) {
  return (
    <span className="af-label">
      {label}
      {help ? <small>{help}</small> : null}
    </span>
  )
}

function Field({ field, root, path, onChange }) {
  const value = getIn(root, path)
  const setValue = (next) => onChange(setIn(root, path, next))

  if (field.type === 'object') {
    return (
      <fieldset className="af-object">
        <legend className="af-object__legend">
          {field.label}
          {field.help ? <small>{field.help}</small> : null}
        </legend>
        <FieldGroup fields={field.fields ?? []} root={root} path={path} onChange={onChange} />
      </fieldset>
    )
  }

  if (field.type === 'stringList') {
    const items = Array.isArray(value) ? value : []
    return (
      <div className="af-field">
        <FieldLabel label={field.label} help={field.help} />
        <div className="af-list">
          {items.map((text, index) => (
            <div className="af-list__row" key={index}>
              {field.multiline ? (
                <textarea
                  className="af-input"
                  rows={3}
                  value={text ?? ''}
                  onChange={(event) => setValue(setIn(items, [index], event.target.value))}
                />
              ) : (
                <input
                  className="af-input"
                  type="text"
                  value={text ?? ''}
                  onChange={(event) => setValue(setIn(items, [index], event.target.value))}
                />
              )}
              <div className="af-list__actions">
                <button
                  type="button"
                  className="af-icon-btn"
                  title="上移"
                  aria-label="上移"
                  onClick={() => setValue(moveAtPath(items, [index], -1))}
                >
                  <Icon name="arrow-up" size={15} />
                </button>
                <button
                  type="button"
                  className="af-icon-btn"
                  title="下移"
                  aria-label="下移"
                  onClick={() => setValue(moveAtPath(items, [index], 1))}
                >
                  <Icon name="arrow-down" size={15} />
                </button>
                <button
                  type="button"
                  className="af-icon-btn af-icon-btn--danger"
                  title="刪除"
                  aria-label="刪除"
                  onClick={() => setValue(removeAtPath(items, [index]))}
                >
                  <Icon name="trash" size={15} />
                </button>
              </div>
            </div>
          ))}
          <button type="button" className="af-add" onClick={() => setValue([...items, ''])}>
            <Icon name="plus" size={15} />
            新增一項
          </button>
        </div>
      </div>
    )
  }

  if (field.type === 'objectList') {
    const items = Array.isArray(value) ? value : []
    return (
      <div className="af-field">
        <FieldLabel label={field.label} help={field.help} />
        <div className="af-items">
          {items.map((item, index) => (
            <details className="af-item" key={index} open={items.length === 1}>
              <summary className="af-item__head">
                <span className="af-item__title">
                  {item?.[field.titleField] || `${field.itemLabel} ${index + 1}`}
                </span>
                <span className="af-item__tools">
                  <button
                    type="button"
                    className="af-icon-btn"
                    title="上移"
                    aria-label="上移"
                    onClick={(event) => {
                      event.preventDefault()
                      setValue(moveAtPath(items, [index], -1))
                    }}
                  >
                    <Icon name="arrow-up" size={15} />
                  </button>
                  <button
                    type="button"
                    className="af-icon-btn"
                    title="下移"
                    aria-label="下移"
                    onClick={(event) => {
                      event.preventDefault()
                      setValue(moveAtPath(items, [index], 1))
                    }}
                  >
                    <Icon name="arrow-down" size={15} />
                  </button>
                  <button
                    type="button"
                    className="af-icon-btn"
                    title="複製"
                    aria-label="複製"
                    onClick={(event) => {
                      event.preventDefault()
                      onChange(duplicateAtPath(root, path, index))
                    }}
                  >
                    <Icon name="copy" size={15} />
                  </button>
                  <button
                    type="button"
                    className="af-icon-btn af-icon-btn--danger"
                    title="刪除"
                    aria-label="刪除"
                    onClick={(event) => {
                      event.preventDefault()
                      setValue(removeAtPath(items, [index]))
                    }}
                  >
                    <Icon name="trash" size={15} />
                  </button>
                </span>
              </summary>
              <div className="af-item__body">
                <FieldGroup
                  fields={field.fields ?? []}
                  root={root}
                  path={[...path, index]}
                  onChange={onChange}
                />
              </div>
            </details>
          ))}
          <button
            type="button"
            className="af-add"
            onClick={() => setValue([...items, blankItem(field.fields ?? [])])}
          >
            <Icon name="plus" size={15} />
            新增{field.itemLabel}
          </button>
        </div>
      </div>
    )
  }

  if (field.type === 'boolean') {
    return (
      <label className="af-toggle">
        <input type="checkbox" checked={Boolean(value)} onChange={(e) => setValue(e.target.checked)} />
        <span>{field.label}</span>
      </label>
    )
  }

  if (field.type === 'select') {
    return (
      <label className="af-field">
        <FieldLabel label={field.label} help={field.help} />
        <select className="af-input" value={value ?? ''} onChange={(e) => setValue(e.target.value)}>
          {(field.options ?? []).map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
    )
  }

  if (field.type === 'image') {
    return (
      <ImageField field={field} value={value} onChange={setValue} />
    )
  }

  if (field.type === 'textarea') {
    return (
      <label className="af-field">
        <FieldLabel label={field.label} help={field.help} />
        <textarea
          className="af-input"
          rows={4}
          value={value ?? ''}
          onChange={(event) => setValue(event.target.value)}
        />
      </label>
    )
  }

  return (
    <label className="af-field">
      <FieldLabel label={field.label} help={field.help} />
      <input
        className="af-input"
        type="text"
        value={value ?? ''}
        onChange={(event) => {
          const next = event.target.value
          setValue(field.nullable && next.trim() === '' ? null : next)
        }}
      />
    </label>
  )
}

function ImageField({ field, value, onChange }) {
  const { onUpload } = useContext(AdminContext)
  const inputRef = useRef(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [localPreview, setLocalPreview] = useState('')

  const preview = localPreview || (value ? asset(value) : '')

  const handleFile = async (file) => {
    if (!file || !onUpload) return
    setError('')
    setBusy(true)
    try {
      const path = await onUpload(file)
      setLocalPreview(URL.createObjectURL(file))
      onChange(path)
    } catch (uploadError) {
      setError(uploadError.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="af-field">
      <FieldLabel label={field.label} help={field.help} />
      <div className="af-image">
        <div className="af-image__preview">
          {preview ? <img src={preview} alt="" /> : <span>沒有圖片</span>}
        </div>
        <div className="af-image__body">
          <input
            className="af-input"
            type="text"
            value={value ?? ''}
            placeholder="images/…"
            onChange={(event) => onChange(event.target.value)}
          />
          <div className="af-image__buttons">
            <button
              type="button"
              className="af-btn af-btn--small"
              disabled={busy}
              onClick={() => inputRef.current?.click()}
            >
              {busy ? '上傳中…' : '上傳新圖片'}
            </button>
            <input
              ref={inputRef}
              className="af-visually-hidden"
              type="file"
              accept="image/png,image/jpeg,image/webp,image/svg+xml,image/gif"
              onChange={(event) => {
                const file = event.target.files?.[0]
                event.target.value = ''
                handleFile(file)
              }}
            />
          </div>
          {error ? <p className="af-error">{error}</p> : null}
        </div>
      </div>
    </div>
  )
}
