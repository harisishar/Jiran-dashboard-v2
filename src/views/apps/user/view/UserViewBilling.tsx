// ** React Imports

// ** MUI Imports
import Grid from '@mui/material/Grid'

import UsersInvoiceListTable from 'src/views/apps/user/view/UsersInvoiceListTable'

// ** Icon Imports

// ** Third Party Imports

// ** Custom Components

// ** Util Import

// ** Types

// ** Styled Component Imports

// ** Styles Import

interface Props {
  invoiceData: InvoiceType[]
}

const UserViewBilling = ({ invoiceData }: Props) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <UsersInvoiceListTable invoiceData={invoiceData} />
      </Grid>
    </Grid>
  )
}

export default UserViewBilling
