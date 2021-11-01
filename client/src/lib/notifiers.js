import React from 'react'
import { inject, observer } from 'mobx-react'
import { Slide, Snackbar } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'


export const Toast = inject('ui')(observer( ({ ui }) => {
    const transition = tprops => (<Slide {...tprops} direction="up" />)
    const toast = ui.toast

    const handleToastClose = () => {
        ui.setToast(null)
    }

    return (
    <Snackbar open={Boolean(toast.text)}
        autoHideDuration={3000}
        TransitionComponent={transition}
        onClose={handleToastClose}
        anchorOrigin={{ vertical:'bottom', horizontal: 'center'}}
     >
      <Alert onClose={handleToastClose} severity={toast.severity || 'success'}>
      {toast.text}
      </Alert>
    </Snackbar>
    )
}))


