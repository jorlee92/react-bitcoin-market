import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Axios from 'axios';
export default class FormDialog extends React.Component {
  state = {
    open: false,
    number:0.0,
    snackopen: false,
    snackmsg: "",
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  handlesnackClose= () => {
    this.setState({snackopen: false})
  }

  handleSell = () => {
      console.log("Selling ", this.state.number, " units of ", this.props.name)
      this.handleClose();
      Axios.post('/action/sellCoin', {
          name: this.props.name,
          quantity: this.state.number,
      }).then(() => {
          //Refresh the page
          this.setState({snackmsg: "Item Sold!, Reloading to update", snackopen: true})
          return new Promise(resolve => setTimeout(() => resolve(), 3000));
      }).then(() => document.location.reload()).catch(() => {
        this.setState({snackmsg: "Unable to make sale!", snackopen: true})
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
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.snackopen}
          autoHideDuration={6000}
          onClose={this.handlesnackClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{this.state.snackmsg}</span>}
        />
      </div>
    );
  }
}