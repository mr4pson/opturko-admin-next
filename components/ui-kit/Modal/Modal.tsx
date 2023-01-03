import styled from 'styled-components';
import { memo, useRef } from 'react';

import ReactPortal from '../ReactPortal';
// import { useOnClickOutside } from '../../common/hooks/useOnClickOutside';

import { ModalContent, ModalFooter, ModalTitle } from './components';
import Button from '../Button';

type Props = {
  title: string;
  open: boolean;
  children: JSX.Element;
  onClose: () => void;
  hasFooter?: boolean;
  confirmBtnName?: string;
  cancelBtnName?: string;
  onConfirm?: () => void;
};

const Modal = ({
  title,
  children,
  open,
  hasFooter = true,
  confirmBtnName,
  cancelBtnName,
  onConfirm,
  onClose,
}: Props) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  // useOnClickOutside(wrapperRef, onClose);

  return (
    <ReactPortal wrapperId="react-portal-modal-container">
      <ShadowBoxWrapper open={open}>
        <Modal.Wrapper ref={wrapperRef}>
          <Modal.Title title={title} onClose={onClose} />
          <Modal.Content>{children}</Modal.Content>
          {hasFooter && (
            <Modal.Footer>
              <>
                {confirmBtnName && (
                  <Button onClick={onConfirm}>{confirmBtnName}</Button>
                )}
                {cancelBtnName && (
                  <Button onClick={onClose}>{cancelBtnName}</Button>
                )}
              </>
            </Modal.Footer>
          )}
        </Modal.Wrapper>
      </ShadowBoxWrapper>
    </ReactPortal>
  );
};

const ShadowBoxWrapper = styled.div<{ open: boolean }>`
  position: fixed;
  inset: 0;
  background-color: rgba(20, 20, 22, 0.9);
  display: 'flex';
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  z-index: 999;
  padding: 40px 20px 20px;
  visibility: ${({ open }) => (open ? 'visible' : 'hidden')};
  opacity: ${({ open }) => (open ? 1 : 0)};
  transition: all linear 0.3s;
`;

const ModalWrapper = styled.div`
  width: fit-content;
  height: fit-content;
  min-height: 150px;
  background: white;
  color: white;
  z-index: 10;
  border-radius: 16px;
  box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.04);
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 32px;
  position: absolute;
  z-index: 101;
  min-width: 450px;
`;

Modal.Wrapper = ModalWrapper;
Modal.Title = ModalTitle;
Modal.Content = ModalContent;
Modal.Footer = ModalFooter;

export default memo(Modal);
