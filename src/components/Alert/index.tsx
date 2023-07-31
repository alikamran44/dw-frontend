import React from "react";
import { useAppSelector, useAppDispatch } from "app/hooks";
import { removeAlert, onConfirmAlert, selectAlert } from "app/auth/auth";
import { logoutUser } from '../../Actions/AuthAction';
import NcModal from "components/NcModal/NcModal";
import ButtonPrimary from "components/Button/ButtonPrimary";
import ButtonSecondary from "components/Button/ButtonSecondary";

export interface AlertProps {
  containerClassName?: string;
  type?: "default" | "warning" | "info" | "success" | "error";
  showCancel?: boolean;
  showCloseButton?: boolean;
  showConfirmButton?: boolean;
  confirmButtonText?: string;
  cancelButtonText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export const AlertBox: React.FC<AlertProps> = ({
}) => {
  const dispatch = useAppDispatch();
  const alert = useAppSelector(selectAlert);
if(!alert) return <></>
  const handleConfirm = () => {
    if(alert.showConfirmButton){
      dispatch(onConfirmAlert(alert.alertAction))
    } 
    else 
    dispatch(removeAlert())
  }
  const handleCancel = () => {
    dispatch(removeAlert())
  }
  let classes = alert.containerClassName;
  const renderContent = () => {
    return (
      <div>
        <h2 className="flex items-center justify-center mb-5 text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100">
          {!!alert.emoji && (
            <span className="flex items-center mr-4 text-xl md:text-6xl leading-none">{alert.emoji}</span>
          )}
        </h2>
        <h2 className="text-lg flex items-center justify-center font-semibold text-neutral-900 dark:text-neutral-200">
          {alert.title || ''}
        </h2>
        <div className='flex items-center justify-center'>
          <span className="text-sm text-center">
            {alert.children}
          </span>
        </div>
        <div className="mt-4 space-x-3">
          {
            alert.showConfirmButton &&
            <ButtonPrimary onClick={handleConfirm} type="submit">
              {alert.confirmButtonText}
            </ButtonPrimary>
          }
          {
            alert.showCloseButton &&
              <ButtonSecondary type="button" onClick={handleCancel}>
                {alert.cancelButtonText}
              </ButtonSecondary>
          }
        </div>
      </div>
    );
  };

  const renderTrigger = () => {
    return null;
  };
  return (
    <NcModal
      isOpenProp={alert ? true : false}
      onCloseModal={handleCancel}
      contentExtraClass="max-w-screen-sm"
      renderContent={renderContent}
      renderTrigger={renderTrigger}
      modalTitle=""
    />
  );
};
