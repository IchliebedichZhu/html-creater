import { Image } from 'antd';
import { useEffect, useState } from 'react';

type IconParam = {
  type: string;
  width?: string;
  height?: string;
};

function Icon({ type, width = '30px', height = '30px' }: IconParam) {
  const [icon, setIcon] = useState('');
  useEffect(() => {
    const result = `/src/assets/icon/${type}.svg`;
    setIcon(result);
  }, [type]);
  return (
    <Image
      className='common_icon'
      src={icon}
      style={{ width, height }}
      preview={false}
      draggable={false}
    />
  );
}

export default Icon;
