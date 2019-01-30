// @flow
import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import ExitIcon from "@material-ui/icons/ExitToApp";
import Slide from "@material-ui/core/Slide";

import * as S from "./styles";

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class Settings extends React.Component {
  state = {
    open: false
  };

  handleOpenModal = () => {
    this.setState({ open: true });
  };

  handleLeave = () => {
    const { onLeave } = this.props;
    //this.setState({ open: false });
    onLeave();
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <S.SettingsWrap>
        <IconButton
          aria-label="Settings"
          onClick={this.handleOpenModal}
          style={{ color: "white", opacity: 0.8 }}
        >
          <ExitIcon size={5} />
        </IconButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          TransitionComponent={Transition}
          keepMounted
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Leave the game?"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              By leaving you will automatically loose.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} style={{ color: "#8ab618" }}>
              Keep playing
            </Button>
            <Button onClick={this.handleLeave} style={{ color: "#8ab618" }}>
              Leave
            </Button>
          </DialogActions>
        </Dialog>
      </S.SettingsWrap>
    );
  }
}

export default Settings;
