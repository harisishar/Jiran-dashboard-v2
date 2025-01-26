// ** React Imports

// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Types
import { InvoiceType } from 'src/types/apps/invoiceTypes'

// ** Demo Component Imports
import UsersInvoiceListTable from 'src/views/apps/user/view/UsersInvoiceListTable'

interface Props {
  invoiceData: InvoiceType[]
}

const UserViewOverview = ({ invoiceData }: Props) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <UsersInvoiceListTable invoiceData={invoiceData} />
      </Grid>
    </Grid>
  )
}

export default UserViewOverview
