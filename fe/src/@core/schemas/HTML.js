const HTML = props => {
  return (
    <div
      style={{
        overflow: 'auto',
        border: '1px solid #ccc',
        borderRadius: '0.25rem',
        borderLeft: 'none',
        borderRight: 'none'
      }}
      dangerouslySetInnerHTML={{ __html: props.value }}
    ></div>
  )
}

export default HTML
