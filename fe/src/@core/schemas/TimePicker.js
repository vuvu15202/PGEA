import DatePickerComponent from 'react-datepicker'
import CustomTextField from '../components/mui/text-field'
import moment from 'moment'

const TimePicker = props => {
  return (
    <div>
      <DatePickerComponent
        showTimeSelect
        selected={props.value ? moment(props.value).toDate() : null}
        showTimeSelectOnly
        timeFormat='HH:mm'
        dateFormat='HH:mm'
        timeCaption='Chọn giờ'
        placeholderText={props.schema.placeholder || 'HH:mm'}
        disabled={props.disabled}
        timeIntervals={15}
        onChange={date => {
          if (props.onChange && date) {
            props.onChange(date)
          }
        }}
        customInput={<CustomTextField />}
      />
    </div>
  )
}

export default TimePicker
