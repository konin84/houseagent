import React, { forwardRef } from 'react'
import { Box, Button, Dialog, DialogContent, Fade, Grid, IconButton, Typography } from '@material-ui/core'
// import Button from '../controls/Button'

const Transition = forwardRef(function Transition(props, ref) {
   return <Fade ref={ref} {...props} />
})

export default function ConfirmBox({open, closeDialog, title, deleteFunction}) {
  return (
    <Dialog  
    
      fullwidth
      open={open}
      maxWidth='md'
      scroll='body'
      onClose={closeDialog}
      onBackdropClick={closeDialog}
      TransitionComponent={Transition}
    >
      <DialogContent xs={{px:8, py:6, position:'relative'}}>
        <IconButton size='medium' 
        onClick={closeDialog} 
        sx={{position:'absolute', right:'1rem', top:'1rem'}}>
          x
        </IconButton>

        <Grid container spacing={6} >
          <Grid item xs={12} >

            <Box 
            sx={{
              mb:3, 
              display:'flex', 
              justifyContent:' flex-start',
              flexDirection:'column',
              }}>
              
              <Typography variant='h6'>
                Delete {title}
              </Typography>
              <Typography variant='body'>
                Are you sure, you want do delete this {title}?
              </Typography>
            </Box>

          </Grid>
          
          <Grid 
            item 
            xs={12} 
            sx={{ display:'flex', 
              justifyContent:'flex-end', gap:'5px'
            }} > 
         
            <Button size='medium' className='m-5'
            variant='contained' color='primary' onClick={closeDialog}>
              Cancel 
            </Button>  
            <Button size='medium' variant='contained' color='error' onClick={deleteFunction}>
              Delete 
            </Button> 

          </Grid>

        </Grid>

      </DialogContent>

    </Dialog>
  )
}
