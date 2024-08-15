import React, { useEffect, useState } from 'react'
import { LoadingButton } from '@mui/lab'
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  Grid,
  MenuItem,
  Paper,
  Select,
  Typography
} from '@mui/material'
import axiosClient from 'src/@core/apis/jwt/jwtService'
import CustomTextField from 'src/@core/components/mui/text-field'
import { API_URL } from 'src/@core/constants/env'

const ProfileEdit = ({ userProfile }) => {
  const [UserIDEdit, setUserIDEdit] = useState('')
  const [nameEdit, setNameEdit] = useState('')
  const [genderEdit, setGenderEdit] = useState('')
  const [phoneNumberEdit, setPhoneNumberEdit] = useState('')
  const [emailEdit, setEmailEdit] = useState('')
  const [descriptionEdit, setDescriptionEdit] = useState('')
  const [loadingEditSubmit, setLoadingForEdit] = useState(false)
  const [notification, setNotification] = useState(null)

  const GENDER = [
    {
      value: 'male',
      label: 'Male'
    },
    {
      value: 'female',
      label: 'Female'
    },
    {
      value: 'other',
      label: 'Other'
    }
  ]

  useEffect(() => {
    if (userProfile) {
      setUserIDEdit(userProfile.id || '')
      setNameEdit(userProfile.name || '')
      setGenderEdit(userProfile.gender || '')
      setPhoneNumberEdit(userProfile.phone || '')
      setEmailEdit(userProfile.email || '')
      setDescriptionEdit(userProfile.description || '')
    }
  }, [userProfile])

  const handleActionEditSubmit = async () => {
    setLoadingForEdit(true)

    const body = {
      id: UserIDEdit,
      name: nameEdit,
      gender: genderEdit,
      phone: phoneNumberEdit,
      email: emailEdit,
      description: descriptionEdit
    }

    try {
      const response = await axiosClient.patch(`${API_URL}/api/user/${userProfile.userType.id}`, body, {
        params: {
          page: 16,
          api: 'update'
        },
        headers: {
          'Api-Version': 'pageid'
        }
      })

      setNotification('Chỉnh sửa thành công.')
      window.location.reload()
    } catch (error) {
      setNotification('Đã xảy ra lỗi khi chỉnh sửa.')
    }

    setLoadingForEdit(false)
  }

  useEffect(() => {
    let timeoutId

    if (notification) {
      timeoutId = setTimeout(() => {
        setNotification(null)
      }, 5000)
    }

    return () => {
      clearTimeout(timeoutId)
    }
  }, [notification])

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Card>
        <CardHeader title='Thông tin người dùng' />
        <Divider sx={{ my: 0.5 }} />
        <CardContent>
          <Grid container>
            <Grid item xs={4}>
              <Typography variant='body1' sx={{ fontWeight: 'bold', mt: 3 }}>
                Mã số tài khoản:
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <CustomTextField
                autoFocus
                margin='dense'
                id='user-id'
                type='text'
                fullWidth
                variant='standard'
                value={UserIDEdit}
                onChange={e => setUserIDEdit(e.target.value)}
                InputLabelProps={{ shrink: true }}
                disabled
              />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={4}>
              <Typography variant='body1' sx={{ fontWeight: 'bold', mt: 3 }}>
                Họ và tên:
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <CustomTextField
                autoFocus
                margin='dense'
                id='user-name'
                type='text'
                fullWidth
                variant='standard'
                value={nameEdit}
                onChange={e => setNameEdit(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={4}>
              <Typography variant='body1' sx={{ fontWeight: 'bold', mt: 3 }}>
                Giới tính:
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <FormControl fullWidth>
                <Select
                  onChange={event => {
                    setGenderEdit(event.target.value)
                  }}
                  value={genderEdit}
                >
                  {GENDER.map(option => (
                    <MenuItem id={option.value} key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={4}>
              <Typography variant='body1' sx={{ fontWeight: 'bold', mt: 3 }}>
                Số điện thoại:
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <CustomTextField
                autoFocus
                margin='dense'
                id='user-phone'
                type='text'
                fullWidth
                variant='standard'
                value={phoneNumberEdit}
                onChange={e => setPhoneNumberEdit(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={4}>
              <Typography variant='body1' sx={{ fontWeight: 'bold', mt: 3 }}>
                Email:
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <CustomTextField
                autoFocus
                margin='dense'
                id='user-email'
                type='text'
                fullWidth
                variant='standard'
                value={emailEdit}
                onChange={e => setEmailEdit(e.target.value)}
                InputLabelProps={{ shrink: true }}
                disabled
              />
            </Grid>
          </Grid>
          <Grid container pt={2}>
            <Grid item xs={4}>
              <Typography variant='body1' sx={{ fontWeight: 'bold', mt: 3 }}>
                Mô tả:
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <CustomTextField
                fullWidth
                multiline
                minRows={3}
                id='user-description'
                variant='standard'
                type='text'
                value={descriptionEdit}
                onChange={e => setDescriptionEdit(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>
        </CardContent>
        <CardActions sx={{ justifyContent: 'center' }}>
          <LoadingButton
            id='button-volume-create'
            size='medium'
            variant='contained'
            type='submit'
            loading={loadingEditSubmit}
            onClick={handleActionEditSubmit}
            sx={{ mt: 2 }}
            disabled={
              userProfile.name === nameEdit &&
              userProfile.gender === genderEdit &&
              userProfile.phone === phoneNumberEdit &&
              userProfile.description === descriptionEdit
            }
          >
            {loadingEditSubmit ? 'Đang lưu...' : 'Lưu thay đổi'}
          </LoadingButton>
        </CardActions>
      </Card>
      {notification && (
        <div
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            backgroundColor: '#4CAF50',
            color: 'white',
            padding: '15px',
            borderRadius: '5px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            zIndex: '9999',
            animation: 'slideIn 0.5s forwards, slideOut 0.5s 4.5s forwards'
          }}
        >
          {notification}
        </div>
      )}
    </Paper>
  )
}

export default ProfileEdit
