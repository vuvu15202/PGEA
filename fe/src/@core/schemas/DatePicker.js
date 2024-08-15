import 'react-datepicker/dist/react-datepicker.css'
import DatePickerComponent from 'react-datepicker'
import CustomTextField from '../components/mui/text-field'
import moment from 'moment'

const DatePicker = props => {
  return (
    <div>
      <DatePickerComponent
        showTimeSelect
        timeFormat='HH:mm'
        selected={props.value ? moment(props.value).toDate() : null}
        dateFormat='dd/MM/yyyy HH:mm'
        placeholderText={props.schema.placeholder || 'DD/MM/YYYY HH:mm'}
        disabled={props.disabled}
        onChange={date => {
          if (props.onChange && date) {
            props.onChange(date.valueOf())
          }
        }}
        customInput={<CustomTextField fullWidth />}
      />
    </div>
  )
}

export default DatePicker
