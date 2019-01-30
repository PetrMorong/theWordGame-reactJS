// @flow
import React, { Fragment } from "react";
import _noop from "lodash/noop";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import AutoRenewIcon from "@material-ui/icons/Autorenew";
import Slide from "@material-ui/core/Slide";

import * as S from "./styles";

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class NewLetters extends React.Component {
  state = {
    open: false
  };

  handleOpenModal = () => {
    this.setState({ open: true });
  };

  handleConfirm = () => {
    const { hadleGetNewWords } = this.props;
    this.setState({ open: false });
    hadleGetNewWords();
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { newWords } = this.props;
    return (
      <Fragment>
        <S.Letter
          key={15}
          clicked={false}
          disabled={newWords}
          onClick={newWords ? _noop : this.handleOpenModal}
          newWords
          hasNewWords={newWords}
          style={{ borderColor: newWords ? "#696969" : "#D28B11" }}
        >
          <S.ActualLetter style={{ color: newWords ? "#696969" : "white" }}>
            <AutoRenewIcon style={{ marginTop: 4 }} size={25} />
          </S.ActualLetter>
        </S.Letter>

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          TransitionComponent={Transition}
          keepMounted
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Get new set of letters?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              No more words ? You can get new set of letters,
              <br />
              but only once per game.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} style={{ color: "#8ab618" }}>
              Not yet
            </Button>
            <Button onClick={this.handleConfirm} style={{ color: "#8ab618" }}>
              Get new letters
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

export default NewLetters;
