import { ButtonHTMLAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  isPrimary?: boolean;
  iconClass?: string;
  classes?: string;
  color?: 'gray' | 'white';
}

const Button = ({
  text,
  isPrimary = false,
  iconClass,
  color = 'white',
  children,
  onClick,
  type,
  classes,
  ...rest
}: Props) => {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <>
      <button
        className={
          (isPrimary
            ? 'gap-1 justify-center flex-row text-white bg-main hover:bg-main_dark focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm py-1 px-5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 '
            : 'flex gap-1 text-sm justify-center items-center flex-row shrink-0 rounded py-1 px-3 text-gray-600 shadow-sm hover:text-gray-700 ' +
              (color === 'white'
                ? 'bg-white hover:bg-gray-200 border-solid border-main border '
                : 'bg-gray-200 hover:bg-gray-300 ')) + (classes ? classes : '')
        }
        type={type}
        onClick={onClick}
        {...rest}
      >
        {iconClass && <i className={iconClass + ' text-xl ' + (isPrimary ? 'text-white' : 'text-main')}></i>}
        {text}
      </button>
    </>
  );
};

export default Button;
