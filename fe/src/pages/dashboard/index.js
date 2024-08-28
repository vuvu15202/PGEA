// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { Box, Link } from '@mui/material'

const Dashboard = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Giới thiệu PGEA'></CardHeader>
          <CardContent>
            <Typography sx={{ mb: 4 }}>
              PGEA là một dự án nguồn mở giúp đơn giản hóa việc tạo và quản lý các trang quản trị bằng công cụ tạo trang
              mạnh mẽ và linh hoạt.
            </Typography>
            <Box sx={{ mb: 4 }}>
              <Typography component='span' sx={{ mr: 1 }}>
                Download source code tại:
              </Typography>
              <Link
                href='https://github.com/vuvu15202/PGEA'
                underline='hover'
                target='_blank'
                rel='noopener noreferrer'
              >
                {'PGEA download'}
              </Link>
            </Box>
            <Box>
              <Typography component='span' sx={{ mr: 1 }}>
                Hướng dẫn sử dụng PGEA:
              </Typography>
              <Link
                href='https://quanglinhtas-organization.gitbook.io/pgea-user-guide'
                underline='hover'
                target='_blank'
                rel='noopener noreferrer'
              >
                {'GitBook User Guide'}
              </Link>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default Dashboard
