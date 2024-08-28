import { useMemo } from 'react'
import Widgets from 'src/@core/schemas/Widgets'

const FormJSONTab = ({ name, desc, read, roles, additionalGrid, apis, buttons, grid, schema }) => {
  const payload = useMemo(() => {
    return {
      name,
      desc,
      apis: apis.map(({ id, ...rest }) => rest),
      read,
      buttons: buttons.map(({ id, ...rest }) => rest),
      grid: grid.map(({ id, ...rest }) => rest),
      schema: schema.map(({ id, ...rest }) => rest),
      roles,
      additionalGrid: {
        highlight: additionalGrid.highlight,
        ...(additionalGrid.highlight
          ? {
              highlightColor: additionalGrid.highlightColor,
              highlightExpression: additionalGrid.highlightExpression
            }
          : {})
      }
    }
  }, [
    additionalGrid.highlight,
    additionalGrid.highlightColor,
    additionalGrid.highlightExpression,
    apis,
    buttons,
    desc,
    grid,
    name,
    read,
    roles,
    schema
  ])

  return (
    <div>
      <Widgets.JSONViewer height={'500px'} value={payload} disabled={true} />
    </div>
  )
}

export default FormJSONTab
