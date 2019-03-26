import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Axios from 'axios';
export default class FormDialog extends React.Component {
  state = {
    open: false,
    number:0.0,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSell = () => {
      console.log("Selling ", this.state.number, " units of ", this.props.name)
      this.handleClose();
      Axios.post('/action/sellCoin', {
          name: this.props.name,
          quantity: this.state.number,
      }).then(() => {
          //Refresh the page
          document.location.reload()
      })
  }

  render() {
    return (
      <div>
        <Button color="primary" onClick={this.handleClickOpen}>
          Sell {this.props.name}
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">{this.props.name}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              How many would you like to sell?
            </DialogContentText>
            <TextField
              value={this.state.value}
              autoFocus
              margin="dense"
              onChange={(e) => this.setState({number: e.target.value})}
              id="quantity"
              label="Quantity"
              type="number"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSell} color="primary">
              Sell
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}