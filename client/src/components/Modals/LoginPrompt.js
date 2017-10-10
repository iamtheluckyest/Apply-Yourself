import React from "react";
import {Modal, ModalHeader, ModalBody} from "reactstrap";

export const LoginPrompt = props => 
    <Modal isOpen={props.modal} toggle={props.toggle}>
        <ModalHeader toggle={props.toggle}>Please Log In</ModalHeader>
        <ModalBody>
            You must log in to perform this action.
        </ModalBody>
    </Modal>
