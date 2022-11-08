import { useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';

const Payment = () => {
  const { result } = useParams();

  useEffect(() => {
    if (!result) Navigate({ to: '/' }); // Redirect to home page
  }, []);

  const resultMessage = (isSuccess: boolean) => {
    const { color, title, message, icon } = {
      color: isSuccess ? 'text-green-500' : 'text-red-500',
      icon: isSuccess ? 'bx bx-check' : 'bx bx-x',
      title: isSuccess ? 'Payment Succeeded.' : 'Payment Failed.',
      message: isSuccess
        ? 'Your Payment was Successful. You can use our services!'
        : 'Your Payment was Successful. You can use our services!',
    };
    return (
      <div className="relative flex flex-col gap-4 text-2xl py-24 px-4 sm:items-center bg-gray-50 shadow rounded-md pl-6 pr-8 sm:pr-6">
        <div className="flex flex-col items-center border-b sm:border-b-0 w-full sm:w-auto pb-4 sm:pb-0">
          <div className={color}>
            <i className={icon + ' text-5xl'}></i>
          </div>
          <div className="font-medium ml-3">{title}</div>
        </div>
        <div className="tracking-wide text-xl text-gray-500 mt-4 sm:mt-0 sm:ml-4">{message}</div>
      </div>
    );
  };

  return (
    <div className="flex flex-col w-full h-full items-center justify-center">{resultMessage(result === 'success')}</div>
  );
};

export default Payment;
