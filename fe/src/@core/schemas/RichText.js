import { useState, useRef } from 'react'
import { Editor } from '@tinymce/tinymce-react'

const RichText = props => {
  const editorRef = useRef(null)
  const [state, setState] = useState({ vavlue: !props.value, schema: props.schema })

  const handleEditorChange = val => {
    setState(prev => ({ ...prev, value: val }))
    if (props.onChange) {
      props.onChange(val)
    }
  }

  return (
    <div>
      <Editor
        apiKey='cckdt047mysl0hut717e97kcjnr4cyynjx7m0i8xwx5osgw3'
        onInit={(_evt, editor) => (editorRef.current = editor)}
        value={props.value}
        onEditorChange={handleEditorChange}
        init={{
          height: 300,
          menubar: false,
          plugins: [
            'advlist',
            'autolink',
            'lists',
            'link',
            'image',
            'charmap',
            'preview',
            'anchor',
            'searchreplace',
            'visualblocks',
            'code',
            'fullscreen',
            'insertdatetime',
            'media',
            'table',
            'code',
            'help',
            'wordcount'
          ],
          toolbar:
            'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
        }}
      />
    </div>
  )
}

export default RichText
