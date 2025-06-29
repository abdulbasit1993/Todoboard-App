export type ModalTypes = 'ConfirmLogout' | 'DeleteTodo';

export type ModalProps = {
  title: string;
  message: string;
  onClose?: () => void;
  onConfirm?: () => void;
  onCancel?: () => void;
};

export interface iModalRef {
  showModal: (type: ModalTypes, props?: Partial<ModalProps>) => void;
  hideModal: () => void;
}
